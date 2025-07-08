import express from "express";
import {
  deleteBookController,
  getAllBooksController,
  getAllPublicBooksController,
  getSinglePublicBooksController,
  insertNewBook,
  updateBookController,
} from "../controllers/booksController.js";
import {
  adminAuthMidlleware,
  userAuthMiddleware,
} from "../middlewares/authMiddlewares.js";
import {
  newBookDataValidation,
  updateBookDataValidation,
} from "../middlewares/validations/bookdataValidation.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

// router.get("/", (req, res) => {
//   res.json({
//     message: "TODO BOOks",
//   });
// });

router.post(
  "/",
  userAuthMiddleware,
  adminAuthMidlleware,
  upload.single("image"),
  // upload.array("image", 2),
  newBookDataValidation,
  insertNewBook
);

//public api access
router.get("/", getAllPublicBooksController);

//public api access for single book
router.get("/public/:slug", getSinglePublicBooksController);

//admin only access
router.get(
  "/admin",
  userAuthMiddleware,
  adminAuthMidlleware,
  getAllBooksController
);

//update the books
router.put(
  "/",
  userAuthMiddleware,
  adminAuthMidlleware,
  upload.array("images", 2),
  updateBookDataValidation,
  updateBookController
);

//delete the books
router.delete(
  "/:_id",
  userAuthMiddleware,
  adminAuthMidlleware,
  deleteBookController
);

export default router;
