import express from "express";
import {
  adminAuthMidlleware,
  userAuthMiddleware,
} from "../middlewares/authMiddlewares.js";
import {
  getAllReviewController,
  insertNewReview,
  updateReviewStatusController,
} from "../controllers/reviewController.js";
import { newReviewDataValidation } from "../middlewares/validations/reviewDataValidation.js";
const router = express.Router();

//insert new review
router.post("/", userAuthMiddleware, newReviewDataValidation, insertNewReview);

//rerurn all reviews for admin or only approved reviews for public
router.get("/", getAllReviewController);
//admin call only
router.get("/admin", userAuthMiddleware, getAllReviewController);

//admin call only
router.patch(
  "/admin",
  userAuthMiddleware,
  adminAuthMidlleware,
  updateReviewStatusController
);

//return user specific borrows list only
// router.get("/user", userAuthMiddleware, getBorrowsController);

//return book
// router.patch("/", userAuthMiddleware, returnBookController);

export default router;
