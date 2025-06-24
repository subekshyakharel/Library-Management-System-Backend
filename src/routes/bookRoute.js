import express from "express";
import { insertNewBook } from "../controllers/booksController.js";
import {
  adminAuthMidlleware,
  userAuthMiddleware,
} from "../middlewares/authMiddlewares.js";
import { newBookDataValidation } from "../middlewares/validations/bookdataValidation.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "TODO BOOks",
  });
});

router.post(
  "/",
  userAuthMiddleware,
  adminAuthMidlleware,
  newBookDataValidation,
  insertNewBook
);

export default router;
