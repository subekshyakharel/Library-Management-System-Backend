import Joi from "joi";
import { responseClient } from "../responseClient.js";

export const validateData = ({ req, res, next, obj }) => {
  const schema = Joi.object(obj);
  const { value, error } = schema.validate(req.body);
  console.log(value);
  if (error) {
    return responseClient({
      req,
      res,
      message: error.message,
      statusCode: 400,
    });
  }
  next();
};
