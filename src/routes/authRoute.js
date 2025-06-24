import express from "express";
const router = express.Router();
import {
  activateUser,
  generateOTP,
  insertNewUser,
  loginUser,
  logoutUser,
  resetPassword,
} from "../controllers/authController.js";
import {
  loginDataValidation,
  newUserDataValidation,
  resetPasswordValidation,
  userActivationDataValidation,
} from "../middlewares/validations/authDataValidation.js";
import {
  renewAccessJWTMiddleware,
  userAuthMiddleware,
} from "../middlewares/authMiddlewares.js";

router.post("/register", newUserDataValidation, insertNewUser);
router.post("/activate-user", userActivationDataValidation, activateUser);
router.post("/login", loginDataValidation, loginUser);
router.get("/renew-jwt", renewAccessJWTMiddleware);
router.get("/logout", userAuthMiddleware, logoutUser);
router.post("/otp", generateOTP);
router.post("/reset-password", resetPasswordValidation, resetPassword);

export default router;
