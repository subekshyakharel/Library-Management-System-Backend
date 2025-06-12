import { responseClient } from "../middlewares/responseClient.js";
import { createNewSession } from "../models/session/SessionModel.js";
import { createNewUser } from "../models/user/UserModel.js";
import { userActivationUrlEmail } from "../services/email/emailService.js";
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
    console.log(sessionId, t);

    const message = "TODO activate user";
    return responseClient({ req, res, message });
  } catch (error) {
    next(error);
  }
};
