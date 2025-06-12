import SessionSchema from "./SessionSchema.js";

export const createNewSession = (sessionobj) => {
  return SessionSchema(sessionobj).save();
};
