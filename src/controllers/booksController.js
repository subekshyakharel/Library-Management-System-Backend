import { responseClient } from "../middlewares/responseClient.js";
import {
  createNewBook,
  deleteBook,
  getABook,
  getAllBooks,
  getAllPublicBooks,
  updateBook,
} from "../models/book/BookModel.js";
import slugify from "slugify";
import { deleteFile } from "../utils/fileutil.js";

export const insertNewBook = async (req, res, next) => {
  try {
    const { fName, _id } = req.userInfo;
    const { path } = req.file;
    const obj = {
      ...req.body,
      slug: slugify(req.body.title, { lower: true }),
      addedby: { name: fName, adminId: _id },
      lastupdatedBy: { name: fName, adminId: _id },
      imgUrl: path,
      imageList: [path],
    };

    const book = await createNewBook(obj);
    book._id
      ? responseClient({
          req,
          res,
          message: "The book has been added Successfully!",
        })
      : responseClient({
          req,
          res,
          message: "Unable to insert new book in the database, try again later",
          statusCode: 401,
        });
  } catch (error) {
    console.log(error);
    if (error.message.includes("E11000 duplicate key")) {
      return responseClient({
        req,
        res,
        message:
          "Duplicate data not allowed: " + JSON.stringify(error.keyValue),
        statusCode: 400,
      });
    }
    next(error);
  }
};

export const getAllPublicBooksController = async (req, res, next) => {
  try {
    let books = await getAllPublicBooks(); // Fetch active books only
    const today = new Date();

    const booksToUpdate = books.filter(
      (book) =>
        book.expectedAvailable &&
        new Date(book.expectedAvailable) <= today &&
        !book.available
    );

    if (booksToUpdate.length) {
      await Promise.all(
        booksToUpdate.map((book) =>
          updateBook({
            _id: book._id,
            available: true,
            expectedAvailable: null,
          })
        )
      );

      // Re-fetch after updating
      books = await getAllPublicBooks();
    }

    responseClient({
      req,
      res,
      next,
      message: "Here are the books which are active",
      payload: books,
    });
  } catch (error) {
    next(error);
  }
};

export const getSinglePublicBooksController = async (req, res, next) => {
  try {
    const { slug } = req.params;
    let book = await getABook({ slug, status: "active" });

    if (
      book &&
      book.expectedAvailable &&
      new Date(book.expectedAvailable) <= new Date() &&
      !book.available
    ) {
      // Update the single book
      await updateBook({
        _id: book._id,
        available: true,
        expectedAvailable: null,
      });

      // Re-fetch updated book
      book = await getABook({ slug, status: "active" });
    }

    responseClient({
      req,
      res,
      next,
      message: "Here are the books which are active",
      payload: book,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBooksController = async (req, res, next) => {
  try {
    let books = await getAllBooks();
    const today = new Date();

    // Filter books that need to be updated
    const booksToUpdate = books.filter(
      (book) =>
        book.expectedAvailable &&
        new Date(book.expectedAvailable) <= today &&
        !book.available
    );

    // Update those books
    if (booksToUpdate.length) {
      await Promise.all(
        booksToUpdate.map((book) =>
          updateBook({
            _id: book._id,
            available: true,
            expectedAvailable: null,
          })
        )
      );

      // Re-fetch updated books
      books = await getAllBooks();
    }

    responseClient({
      req,
      res,
      next,
      message: "Here are all books",
      payload: books,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBookController = async (req, res, next) => {
  try {
    const { fName, _id } = req.userInfo;
    req.body.imageList = req.body.imageList.split(",");

    // remove imgToDelete list from imageList
    if (req.body?.imgToDelete?.length) {
      req.body.imageList = req.body.imageList.filter(
        (img) => !req.body.imgToDelete.includes(img)
      );

      req.body.imgToDelete.map((img) => deleteFile(img));
    }

    if (Array.isArray(req.files)) {
      req.body.imageList = [
        ...req.body.imageList,
        ...req.files.map((obj) => obj.path),
      ];
    }

    const obj = {
      ...req.body,
      lastUpdateBy: { name: fName, adminId: _id },
    };

    const book = await updateBook(obj);
    book._id
      ? responseClient({
          req,
          res,
          message: "The book has been updated Successfully!",
        })
      : responseClient({
          req,
          res,
          message: "Unable to update the book in the database, try again later",
          statusCode: 400,
        });
  } catch (error) {
    next(error);
  }
};

export const deleteBookController = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const book = await deleteBook(_id);

    book.imageList.map((img) => deleteFile(img));
    deleteFile(book.imgUrl);

    book?._id
      ? responseClient({
          req,
          res,
          message: "The book has been Deleted Successfully!",
        })
      : responseClient({
          req,
          res,
          message:
            "Unable to delete the book from the database, try again later",
          statusCode: 400,
        });
  } catch (error) {
    next(error);
  }
};
