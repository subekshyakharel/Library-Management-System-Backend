import mongoose from "mongoose";
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    imageList: [{ type: String, default: [] }],
    isbn: {
      type: String,
      unique: true,
      index: 1,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      index: 1,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: false,
    },
    averageRating: {
      type: Number,
    },
    expectedAvailable: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      required: true,
      default: "inactive",
    },
    addedby: {
      name: {
        type: String,
      },
      adminId: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
    },
    lastupdatedBy: {
      name: {
        type: String,
      },
      adminId: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Book", bookSchema); //books
