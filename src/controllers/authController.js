import { compare } from "bcryptjs";
import { responseClient } from "../middlewares/responseClient.js";
import {
  createNewSession,
  deleteManySession,
  deleteSession,
} from "../models/session/SessionModel.js";
import {
  createNewUser,
  getUserByMail,
  updateUserActive,
} from "../models/user/UserModel.js";
import {
  userActivatedNotificationEmail,
  userActivationUrlEmail,
} from "../services/email/emailService.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { v4 as uuidv4 } from "uuid";
import { getjwts } from "../utils/jwt.js";

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

export const loginUser = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    console.log(password, email);

    //get user by email
    const user = await getUserByMail(email);

    if (user?._id) {
      console.log(user);
      // compare password
      const isMatched = comparePassword(password, user.password);
      if (isMatched) {
        console.log("User Authenticated");
        //create jwts
        const jwts = await getjwts(email);
        //responsejwts
        return responseClient({
          req,
          res,
          message: "Logged in successfully!",
          payload: jwts,
        });
      }
    }

    //
    const message = "Invalid login details";
    const statusCode = 401;
    responseClient({ req, res, next, message, statusCode });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    //get the token
    const { email } = req.userInfo;
    //update refreshJWT to ""
    await updateUserActive({ email }, { refreshJWT: "" });
    //remove the accessJWT from session table
    await deleteManySession({ association: email });
    responseClient({ req, res, message: "loged out successfully!" });
  } catch (error) {
    next(error);
  }
};
