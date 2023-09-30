const verifyJwt = require("../helper/jwt").verifyJwt;
const response = require("../helper/responseHelper");
const isAuth = (req, res, next) => {
  let token = req.headers?.authorization || req.headers?.Authorization;
  if (!token) return response.sendUnauthorized(res);
  token = token.split(" ")[1];
  const [decoded, error] = verifyJwt(token, process.env.JWT);

  if (error || !decoded) return response.sendUnauthorized(res);

  req.userId = decoded.id;
  next();
};

module.exports = isAuth;
