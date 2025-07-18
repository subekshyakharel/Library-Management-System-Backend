import express from "express";
import { responseClient } from "../middlewares/responseClient.js";

import { userAuthMiddleware } from "../middlewares/authMiddlewares.js";
const router = express.Router();

router.get("/profile", userAuthMiddleware, (req, res) => {
  const user = req.userInfo;
  user.passsword = undefined;
  user.__v = undefined;
  user.refreshJWT = undefined;
  return responseClient({
    req,
    res,
    message: "User Profile",
    payload: user,
  });
});

export default router;
