const jwt = require("jsonwebtoken");

const verifyJwt = (token, secure) => {
  let jwtdecoded, error;

  return jwt.verify(token, secure, (err, decoded) => {
    if (err) {
      jwtdecoded = null;
      error = err;
      return [decoded, error];
    }
    jwtdecoded = decoded;
    error = null;
    return [decoded, error];
  });
};

module.exports = {
  verifyJwt,
};
