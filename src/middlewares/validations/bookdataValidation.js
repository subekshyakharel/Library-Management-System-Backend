import { ISBN_REQ, LONG_STR_REQ, SHORT_STR_REQ, YEAR_REQ } from "./joiConst.js";
import { validateData } from "./joiVaidation.js";

export const newBookDataValidation = (req, res, next) => {
  const obj = {
    title: SHORT_STR_REQ,
    year: YEAR_REQ,
    author: SHORT_STR_REQ,
    imgUrl: LONG_STR_REQ,
    isbn: ISBN_REQ,
    genre: SHORT_STR_REQ,
    description: LONG_STR_REQ,
  };
  validateData({ req, res, next, obj });
};
