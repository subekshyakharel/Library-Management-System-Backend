import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    reviewMessage: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    borrowId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Borrow",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Review", reviewSchema); //reviews
