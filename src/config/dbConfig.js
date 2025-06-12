import mongoose from "mongoose";

export const dbConnect = () => {
  if (!process.env.MONGO_URL) {
    throw new Error("Provide Mongo_url to connnection string");
  }
  return mongoose.connect(process.env.MONGO_URL);
};
// export const dbConnect = async () => {
//   try {
//     if (!process.env.MONGO_URL) {
//       throw new Error("Provide Mongo_url to connnection string");
//     }
//     const conn = await mongoose.connect(process.env.MONGO_URL);
//     conn && console.log("Mongodb Connected");
//   } catch (error) {
//     console.log(error);
//   }
// };
