export const responseClient = ({
  req,
  res,
  message,
  statusCode = 200,
  payload,
}) => {
  req.success = () => {
    res.status(statusCode).json({
      status: "success",
      message,
      payload,
    });
  };
  req.error = () => {
    res.status(statusCode).json({
      status: "error",
      message,
    });
  };

  if (statusCode >= 200 && statusCode < 300) {
    req.success();
  } else {
    req.error();
  }
};
