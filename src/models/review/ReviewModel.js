import ReviewSchema from "./ReviewSchema.js";

//insert new review
export const createReview = (reviewObj) => {
  return ReviewSchema(reviewObj).save();
};

//user filter to get reviewa for specific user
//if filter is undefined it will return entire records
export const getReviews = (filter = {}) => {
  return ReviewSchema.find(filter)
    .populate({
      path: "bookId",
      select: "title slug imgUrl", //{slug: 1}
    })
    .sort({ updatedAt: -1 });
};

//update review table
export const updateReview = ({ _id, ...rest }) => {
  return ReviewSchema.findByIdAndUpdate(_id, rest);
};

//delete review obj
// export const deleteReview = (filter) => {
//   return ReviewSchema.findOneAndDelete(filter);
// };
