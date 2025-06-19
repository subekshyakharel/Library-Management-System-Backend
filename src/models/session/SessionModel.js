import SessionSchema from "./SessionSchema.js";

export const createNewSession = (sessionobj) => {
  return SessionSchema(sessionobj).save();
};
export const deleteSession = (filter) => {
  return SessionSchema.findOneAndDelete(filter);
};
export const deleteManySession = (filter) => {
  return SessionSchema.deleteMany(filter);
};
export const getSession = (filter) => {
  return SessionSchema.findOne(filter);
};
