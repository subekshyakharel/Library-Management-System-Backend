import Joi from "joi";
import { responseClient } from "../responseClient.js";
import { deleteUploadedFiles } from "../../utils/fileutil.js";

export const validateData = ({ req, res, next, obj }) => {
  const schema = Array.isArray(req.body)
    ? Joi.array().items(Joi.object(obj)).min(1).required()
    : Joi.object(obj);

  const { error } = schema.validate(req.body);

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
