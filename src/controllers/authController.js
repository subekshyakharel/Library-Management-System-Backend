import { responseClient } from "../middlewares/responseClient.js";
import {
  createNewSession,
  deleteSession,
} from "../models/session/SessionModel.js";
import { createNewUser, updateUserActive } from "../models/user/UserModel.js";
import {
  userActivatedNotificationEmail,
  userActivationUrlEmail,
} from "../services/email/emailService.js";
import { hashPassword } from "../utils/bcrypt.js";
import { v4 as uuidv4 } from "uuid";

export const insertNewUser = async (req, res, next) => {
  try {
    //to do signup process
    //recieve the user data
    //encrypt the password
    //inser user into db
    console.log(req.body);
    const { password } = req.body;
    req.body.password = hashPassword(password);
    const user = await createNewUser(req.body);

    if (user?._id) {
      //create an unique user activaation link and send to their email
      const session = await createNewSession({
        token: uuidv4(),
        association: user.email,
      });
      if (session?._id) {
        const url = `${process.env.ROOT_URL}/activate-user?sessionId=${session._id}&t=${session.token}`;
        console.log(url);

        const emailId = await userActivationUrlEmail({
          email: user.email,
          url,
          name: user.fName,
        });

        if (emailId) {
          const message =
            "We have sent you an email with activation link. Please check tour email and follow the instruction to activate your account.";

          return responseClient({ req, res, message });
        }
      }
    }

    throw new Error("Unable to create an account, try again later!!");
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message =
        "This email is already registered. Please use a different one.";
      error.statusCode = 400;
    }
    next(error);
  }
};

export const activateUser = async (req, res, next) => {
  try {
    const { sessionId, t } = req.body;
    // console.log(sessionId, t);

    const session = await deleteSession({
      _id: sessionId,
      token: t,
    });

    if (session?._id) {
      //update user to active
      const user = await updateUserActive(
        { email: session.association },
        { status: "active" }
      );

      if (user?._id) {
        //respond
        //send email
        userActivatedNotificationEmail({ email: user.email, name: user.fName });
        const message = "Your account has been activated, you may login now!";
        return responseClient({ req, res, message });
      }
    }
    const message = "Invalid link or token expired!";
    const statusCode = 400;
    responseClient({ req, res, message, statusCode });
  } catch (error) {
    next(error);
  }
};
