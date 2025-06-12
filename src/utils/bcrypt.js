import bcrypt from "bcryptjs";
const saltRound = 15;

export const hashPassword = (plainpassword) => {
  return bcrypt.hashSync(plainpassword, saltRound);
};
