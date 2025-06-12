import UserSchema from "./UserSchema.js";

export const createNewUser = (userobj) => {
  return UserSchema(userobj).save();
};
