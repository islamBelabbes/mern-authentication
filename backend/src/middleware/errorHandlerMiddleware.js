const errorHandler = (err, req, res, next) => {
  // handle validationError //
  if (err.name === "ValidationError") {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }

  const statusCode = err.status ? err.status : 500; // server error
  const message = err.message ? err.message : "error occurred";
  res.status(statusCode);
  res.send({
    success: false,
    message,
  });
};

module.exports = errorHandler;
