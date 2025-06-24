import BookSchema from "./BookSchema.js";

export const createNewBook = (Bookobj) => {
  return BookSchema(Bookobj).save();
};
