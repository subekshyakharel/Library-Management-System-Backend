import BorrowHistoryschema from "./BorrowHistorySchema.js";

//insert new borrow
export const createBorrows = (BorrowArg) => {
  return BorrowHistoryschema.insertMany(BorrowArg);
};

//user filter to get borrowa for specific user
//if filter is undefined it will return entire records
export const getBorrow = (filter = {}) => {
  return BorrowHistoryschema.find(filter);
};
//update borrow table
export const updateBorrow = (filter, obj) => {
  return BorrowHistoryschema.findOneAndUpdate(filter, obj);
};
