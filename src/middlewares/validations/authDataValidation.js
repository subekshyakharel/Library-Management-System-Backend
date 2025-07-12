import {
  EMAIL_REQ,
  FNAME_REQ,
  LNAME_REQ,
  OTP,
  PASSWORD,
  PASSWORD_REQ,
  PHONE_REQ,
  SESSION_REQ,
  SHORT_STR,
  TOKEN_REQ,
} from "./joiConst.js";
import { validateData } from "./joiVaidation.js";

export const newUserDataValidation = (req, res, next) => {
  const obj = {
    fName: FNAME_REQ,
    lName: LNAME_REQ,
    email: EMAIL_REQ,
    phone: PHONE_REQ,
    password: PASSWORD_REQ,
    role: SHORT_STR,
  };
  validateData({ req, res, next, obj });
};

export const userActivationDataValidation = (req, res, next) => {
  const obj = {
    sessionId: SESSION_REQ,
    t: TOKEN_REQ,
  };
  validateData({ req, res, next, obj });
};

export const loginDataValidation = (req, res, next) => {
  const obj = {
    email: EMAIL_REQ,
    password: PASSWORD_REQ,
  };
  validateData({ req, res, next, obj });
};

export const resetPasswordValidation = (req, res, next) => {
  const obj = {
    email: EMAIL_REQ,
    password: PASSWORD_REQ,
    otp: OTP,
  };
  validateData({ req, res, next, obj });
};
