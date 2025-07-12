import { responseClient } from "../middlewares/responseClient.js";
import { updateBook } from "../models/book/BookModel.js";
import {
  createBorrows,
  getBorrow,
  updateBorrow,
} from "../models/burrowHistory/BorrowHistoryModel.js";

const BOOK_DUE_DAYS = 15;
export const insertNewBorrow = async (req, res, next) => {
  try {
    const { _id } = req.userInfo;

    let today = new Date();
    const dueDate = today.setDate(today.getDate() + BOOK_DUE_DAYS);
    console.log(req.body);

    req.body = req.body.map((book) => {
      return {
        ...book,
        userId: _id,
        dueDate,
      };
    });

    const borrow = await createBorrows(req.body);
    if (borrow.length) {
      borrow.map(async ({ bookId }) => {
        await updateBook({ _id: bookId, expectedAvailable: dueDate });
      });
    }
    borrow.length
      ? responseClient({
          req,
          res,
          message: "The borrow has been added successfully!",
          payload: borrow,
        })
      : responseClient({
          req,
          res,
          message: "Unable to add borrow!",
          statusCode: 401,
        });
  } catch (error) {
    next(error);
  }
};

export const getBorrowsController = async (req, res, next) => {
  try {
    const { _id, role } = req.userInfo;
    const path = req.path;
    const isAdmin = path === "/admin";
    const borrows = isAdmin
      ? await getBorrow()
      : await getBorrow({ userId: _id });

    responseClient({
      req,
      res,
      message: "Here is the borrow List",
      payload: borrows,
    });
  } catch (error) {
    next(error);
  }
};

import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export const returnBookController = async (req, res, next) => {
  try {
    const { _id } = req.userInfo;

    const filter = {
      _id: new ObjectId(req.body._id), // ✅ convert string to ObjectId
      userId: new ObjectId("6871d17a0d9894eeba211081"), // ✅ convert to ObjectId
    };

    const obj = {
      isReturned: true,
      returnedDate: Date.now(),
    };

    const result = await updateBorrow(filter, obj); // must return updated doc
    console.log("UPDATE BORROW RESULT:", result);

    if (result?._id) {
      const updateBookResult = await updateBook({
        _id: result.bookId,
        expectedAvailable: null,
      });

      if (updateBookResult?._id) {
        //TODO: send email notification
        return responseClient({
          req,
          res,
          message: "Your book has been returned successfully!",
          payload: result,
        });
      }
    }

    return responseClient({
      req,
      res,
      message: "Unable to return book, Please contact admin!",
      statusCode: 400,
    });
  } catch (error) {
    console.error("RETURN BOOK ERROR:", error);
    next(error);
  }
};
