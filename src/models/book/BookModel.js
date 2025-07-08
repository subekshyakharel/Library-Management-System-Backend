import BookSchema from "./BookSchema.js";

//insert new book
export const createNewBook = (Bookobj) => {
  return BookSchema(Bookobj).save();
};
//insert many book
export const createManyBook = (booksArg) => {
  return BookSchema.insertMany(booksArg);
};

//empty books
export const emptyBooks = () => {
  return BookSchema.deleteMany({});
};

//get all public books
export const getAllPublicBooks = () => {
  return BookSchema.find({ status: "active" });
};

//get a single public books
export const getABook = (filter) => {
  return BookSchema.findOne(filter);
};

export const getAllBooks = () => {
  return BookSchema.find();
};

export const updateBook = ({ _id, ...rest }) => {
  return BookSchema.findByIdAndUpdate(_id, rest);
};

export const deleteBook = (_id) => {
  return BookSchema.findByIdAndDelete(_id);
};
