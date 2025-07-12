import BorrowHistorySchema from "./BorrowHistorySchema.js";

//insert new borrow
export const createBorrows = (BorrowArg) => {
  return BorrowHistorySchema.insertMany(BorrowArg);
};

//user filter to get borrowa for specific user
//if filter is undefined it will return entire records
export const getBorrow = (filter = {}) => {
  return BorrowHistorySchema.find(filter);
};
//update borrow table
export const updateBorrow = (filter, obj) => {
  console.log("UpdateBorrow FILTER:", filter);
  return BorrowHistorySchema.findOneAndUpdate(filter, obj, { new: true });
};
