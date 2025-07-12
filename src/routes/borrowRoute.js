import express from "express";
import {
  adminAuthMidlleware,
  userAuthMiddleware,
} from "../middlewares/authMiddlewares.js";
import {
  getBorrowsController,
  insertNewBorrow,
  returnBookController,
} from "../controllers/borrowController.js";
import { newBorrowDataValidation } from "../middlewares/validations/borrowDataValidation.js";
const router = express.Router();

//insert new borrow
router.post("/", userAuthMiddleware, newBorrowDataValidation, insertNewBorrow);

//rerurn all borrows for admin request only
router.get(
  "/admin",
  userAuthMiddleware,
  adminAuthMidlleware,
  getBorrowsController
);

//return user specific borrows list only
router.get("/user", userAuthMiddleware, getBorrowsController);

//return book
router.patch("/", userAuthMiddleware, returnBookController);

export default router;
