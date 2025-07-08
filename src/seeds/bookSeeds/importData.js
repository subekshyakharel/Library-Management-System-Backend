import { dbConnect } from "../../config/dbConfig.js";
import { createManyBook, emptyBooks } from "../../models/book/BookModel.js";
import bookData from "./book-seed.js";

const importData = async () => {
  try {
    await dbConnect();

    //call empty database
    await emptyBooks();
    //call function bulk import
    await createManyBook(bookData);
    console.log("all the book has been imported successfully");
  } catch (error) {
    console.log(error);
  }
};

importData();
