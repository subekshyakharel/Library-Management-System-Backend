import { _ID_REQ, LONG_STR_REQ, SHORT_STR_REQ } from "./joiConst.js";
import { validateData } from "./joiVaidation.js";

export const newBorrowDataValidation = (req, res, next) => {
  const obj = {
    bookId: SHORT_STR_REQ,
    bookTitle: SHORT_STR_REQ,
    thumbnail: SHORT_STR_REQ,
    bookSlug: SHORT_STR_REQ,
  };
  validateData({ req, res, next, obj });
};
