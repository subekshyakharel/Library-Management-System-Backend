import Joi from "joi";
import { responseClient } from "../responseClient.js";
import { deleteUploadedFiles } from "../../utils/fileutil.js";

export const validateData = ({ req, res, next, obj }) => {
  const schema = Joi.object(obj);
  const { value, error } = schema.validate(req.body);
  console.log(value);
  if (error) {
    // console.log(req.file, req.files);
    if (req.file || Array.isArray(req.files)) {
      //proceed to delete
      deleteUploadedFiles(req);
    }
    return responseClient({
      req,
      res,
      message: error.message,
      statusCode: 400,
    });
  }
  next();
};
