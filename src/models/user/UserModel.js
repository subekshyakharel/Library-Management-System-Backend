import UserSchema from "./UserSchema.js";

export const createNewUser = (userobj) => {
  return UserSchema(userobj).save();
};
export const updateUserActive = (filter, update) => {
  return UserSchema.findOneAndUpdate(filter, update, { new: true });
};
