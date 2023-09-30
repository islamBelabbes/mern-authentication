exports.sendCreated = function (res, message, data) {
  return res.status(201).send({
    success: true,
    message,
    data,
  });
};
exports.sendOk = function (res, message, data) {
  return res.status(200).send({
    success: true,
    message,
    data,
  });
};

exports.sendBadRequest = function (res, message, data) {
  return res.status(400).send({
    success: false,
    message,
    data,
  });
};
exports.sendConflict = function (res, message) {
  return res.status(409).send({
    success: false,
    message: message,
  });
};

exports.sendUnauthorized = function (res, message) {
  return res.status(401).send({
    success: false,
    message: message
      ? message
      : "sorry you are not Allowed to access this resource",
  });
};

exports.sendForbidden = function (res) {
  return res.status(403).send({
    success: false,
    message: "You do not have rights to access this resource.",
  });
};

exports.sendNotFound = function (res, message) {
  return res.status(404).send({
    success: false,
    message: message ? message : "Resource not found",
  });
};
exports.sendServerError = function (res) {
  return res.status(500).send({
    success: false,
    message: "Something went wrong.",
  });
};
exports.sendNoContent = function (res) {
  return res.status(204).send("no content");
};

exports.setHeadersForCORS = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, X-Access-Token, Content-Type, Accept"
  );
  next();
};
