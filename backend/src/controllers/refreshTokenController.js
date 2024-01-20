const { verifyJwt } = require("../helper/jwt");
const response = require("../helper/responseHelper");
const User = require("../models/userModal");
const jwt = require("jsonwebtoken");

// @desc Refresh token
// @route POST /api/auth/refresh
// @access Public
const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refresh;
  // check if refresh token exists
  if (!refreshToken) {
    return response.sendUnauthorized(res, "");
  }

  const [decoded, error] = verifyJwt(refreshToken, process.env.REFRESHJWT);

  // check if refresh not valid
  if (error || !decoded) return response.sendUnauthorized(res);

  // get user by refresh token
  const user = await User.findOne({ refreshToken, _id: decoded.id });

  // handle non existing refreshToken with the user
  if (!user) {
    //  detected token reuse
    const reusedTokenUser = await User.findById(decoded.id);
    reusedTokenUser.refreshToken = [];
    await reusedTokenUser.save();
    return response.sendUnauthorized(res, "refresh Fails");
  }

  const payload = {
    id: user._id,
  };
  const accessTokenExpPeriod = 60 * 3;

  const newAccessToken = jwt.sign(payload, process.env.JWT, {
    expiresIn: accessTokenExpPeriod,
  });

  //  todo : send new refresh token and remove the old one from Db
  const RefreshTokenRemainingTime =
    decoded.exp - parseInt(new Date().getTime() / 1000);
  const newRefreshToken = jwt.sign(payload, process.env.REFRESHJWT, {
    expiresIn: RefreshTokenRemainingTime,
  });
  // save the new refresh token
  user.refreshToken = [
    ...user.refreshToken.filter((token) => token !== refreshToken),
    newRefreshToken,
  ];
  await user.save();
  // All Good process
  res.cookie("refresh", newRefreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    secure: true,
    sameSite: "Lax",
  });

  response.sendOk(res, "refresh success", {
    accessToken: newAccessToken,
    expPeriod: accessTokenExpPeriod,
  });
};

module.exports = refreshToken;
