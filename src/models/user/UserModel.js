import UserSchema from "./UserSchema.js";

export const createNewUser = (userobj) => {
  return UserSchema(userobj).save();
};
export const updateUserActive = (filter, update) => {
  return UserSchema.findOneAndUpdate(filter, update, { new: true });
};

export const getUserByMail = (email) => {
  return UserSchema.findOne({ email });
};
export const getOneUser = (filter) => {
  return UserSchema.findOne(filter);
};
