export const generateRandomOtp = (length = 4) => {
  let str = "";
  for (let i = 0; i < length; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
};
