import { responseClient } from "../middlewares/responseClient.js";
import { createNewBook } from "../models/book/BookModel.js";

export const insertNewBook = async (req, res, next) => {
  try {
    const { fName, _id } = req.userInfo;
    const obj = {
      ...req.body,
      addedby: {
        name: fName,
        adminId: _id,
      },
      lastupdatedBy: {
        name: fName,
        adminId: _id,
      },
    };

    const book = await createNewBook(obj);
    book._id
      ? responseClient({
          req,
          res,
          next,
          message: "Book has been added successfully!",
        })
      : responseClient({
          req,
          res,
          next,
          message: "Unable to add new book",
          statusCode: 401,
        });
    console.log(book);
  } catch (error) {
    if (error.code === 11000) {
      return responseClient({
        req,
        res,
        next,
        statusCode: 400,
        message: "ISBN already exists. Please use a unique ISBN.",
      });
    }

    // For any other error, fallback to this
    return responseClient({
      req,
      res,
      next,
      statusCode: 500,
      message: error.message || "Something went wrong",
    });
  }
};
