import {
  _ID_REQ,
  LONG_STR_REQ,
  RATING_REQ,
  SHORT_STR_REQ,
} from "./joiConst.js";
import { validateData } from "./joiVaidation.js";

export const newReviewDataValidation = (req, res, next) => {
  const obj = {
    bookId: SHORT_STR_REQ,
    borrowId: SHORT_STR_REQ,
    title: SHORT_STR_REQ,
    reviewMessage: LONG_STR_REQ,
    rating: RATING_REQ,
  };
  validateData({ req, res, next, obj });
};

//  "bookId":"686a699be8bd98d37c6d035c",
//   "borrowId":"6872489a162360ad89cc6d9b",
//   "title":"review book",
//   "reviewMessage":"i have review this vook, and very good",
//   "rating":3.4
