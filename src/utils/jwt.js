import jwt from "jsonwebtoken";
import { createNewSession } from "../models/session/SessionModel.js";
import { updateUserActive } from "../models/user/UserModel.js";

// create accessjWt
export const createAccessJwt = async (email) => {
  //create
  const token = jwt.sign({ email }, process.env.ACCESS_JWT, {
    expiresIn: "1d",
  });
  //   store
  const obj = {
    token,
    association: email,
    expire: new Date(Date.now() + 15 * 60 * 1000),
  };
  const newSessions = await createNewSession(obj);
  return newSessions?._id ? token : null;
};
//decode access jwt
export const verifyAccessJWT = (token) => {
  try {
    console.log(token);
    return jwt.verify(token, process.env.ACCESS_JWT);
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

//create refresh jwt
const createRefreshJwt = async (email) => {
  //create
  const refreshJWT = jwt.sign({ email }, process.env.REFERSH_JWT, {
    expiresIn: "30d",
  });
  //   store
  const user = await updateUserActive({ email }, { refreshJWT });
  return user?._id ? refreshJWT : null;
};
//decode refresh jwt
export const verifyRefreshJWT = (token) => {
  try {
    console.log(token);
    return jwt.verify(token, process.env.REFERSH_JWT);
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

export const getjwts = async (email) => {
  return {
    accessJWT: await createAccessJwt(email),
    refreshJWT: await createRefreshJwt(email),
  };
};
