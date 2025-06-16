import SessionSchema from "./SessionSchema.js";

export const createNewSession = (sessionobj) => {
  return SessionSchema(sessionobj).save();
};
export const deleteSession = (sessionobj) => {
  return SessionSchema.findOneAndDelete(sessionobj);
};
