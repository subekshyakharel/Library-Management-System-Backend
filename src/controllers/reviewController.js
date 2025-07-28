import { responseClient } from "../middlewares/responseClient.js";
import { updateBook } from "../models/book/BookModel.js";
import { updateBorrow } from "../models/burrowHistory/BorrowHistoryModel.js";
import {
  createReview,
  getReviews,
  updateReview,
} from "../models/review/ReviewModel.js";

export const insertNewReview = async (req, res, next) => {
  try {
    const { _id, fName, lName } = req.userInfo;
    const obj = {
      userId: _id,
      userName: `${fName} ${lName}`,
      ...req.body,
    };

    const result = await createReview(obj);
    if (result?._id) {
      const reviewId = result._id;

      const updateResult = await updateBorrow(
        { _id: result.borrowId },
        { reviewId }
      );
      if (updateResult?._id) {
        return responseClient({
          req,
          res,
          message: "The review has been recieved successfully!",
        });
      }
    }
    responseClient({
      req,
      res,
      message: "Something went wrong, Please contact administration!",
      statusCode: 401,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllReviewController = async (req, res, next) => {
  try {
    const filter = {};
    //is admin requesting or public
    if (req?.userInfo?.role !== "admin") {
      filter.isApproved = true;
    }
    const payload = await getReviews(filter);
    responseClient({
      req,
      res,
      payload,
      message: "Here are the reviews!",
    });
  } catch (error) {
    next(error);
  }
};

export const updateReviewStatusController = async (req, res, next) => {
  try {
    const { _id, isApproved } = req.body;

    const result = await updateReview({ _id, isApproved });
    result?._id
      ? responseClient({
          req,
          res,
          payload: result,
          message: "The review has been updated",
        })
      : responseClient({
          req,
          res,
          statusCode: 400,
          message: "Not able to update review, contact Admin",
        });
  } catch (error) {
    next(error);
  }
};
