import { decode } from "jsonwebtoken";
import { getSession } from "../models/session/SessionModel.js";
import { getOneUser, getUserByMail } from "../models/user/UserModel.js";
import { verifyAccessJWT, verifyRefreshJWT } from "../utils/jwt.js";
import { responseClient } from "./responseClient.js";
import { createAccessJwt } from "../utils/jwt.js";

export const userAuthMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  let message = "Unauthorized";

  if (authorization) {
    const token = authorization.split(" ")[1];
    const decoded = await verifyAccessJWT(token);
    console.log("decoded token", decoded);

    if (decoded?.email) {
      const tokenSession = await getSession({ token });
      console.log("token session", tokenSession);
      if (tokenSession?._id) {
        const user = await getUserByMail(decoded.email); // ✅ fix here
        console.log(user);
        if (user?._id && user.status === "active") {
          req.userInfo = user;
          return next();
        }
      }
    }
    message = decoded === "jwt expired" ? decoded : "Unauthorized";
  }

  responseClient({ req, res, message, statusCode: 401 });
};
export const renewAccessJWTMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  let message = "Unauthorized";

  if (authorization) {
    const token = authorization.split(" ")[1];
    const decoded = await verifyRefreshJWT(token);
    console.log("decoded token", decoded);

    if (decoded?.email) {
      const user = await getOneUser({
        email: decoded.email,
        refreshJWT: token,
      });
      if (user?._id) {
        // create new accessJWT
        const token = await createAccessJwt(decoded.email);
        // return accessJWT
        return responseClient({
          req,
          res,
          message: "Here is the accessJWT",
          payload: token,
        });
      }
    }
  }

  responseClient({ req, res, message, statusCode: 401 });
};
