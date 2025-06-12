import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      // required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    email: {
      type: String,
      unique: true,
      index: 1,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshJWT: {
      type: String,
    },
    expire: {
      type: Date,
      default: new Date(Date.now() + 30000),
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema); //users
