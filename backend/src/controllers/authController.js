const User = require("../models/userModal");
const bcrypt = require("bcrypt");
const response = require("../helper/responseHelper");
const jwt = require("jsonwebtoken");
const Schema = require("../validation/Schema");
// @desc Register a new user
// @route POST /api/auth/register
// @access Public
const register = async (req, res) => {
  const { email, password, phone } = req.body;
  // validate
  await Schema.registerSchema.validate(req.body);

  // check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return response.sendConflict(res, "User already exists");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // save
  const newUser = new User({
    email,
    password: hashedPassword,
    phone,
  });
  await newUser.save();

  // All Good process
  return response.sendCreated(res, "User created successfully");
};

// @desc Login a user
// @route POST /api/auth/login
// @access Public
const login = async (req, res) => {
  // first make sure there is no refresh cookie
  if (req.cookies.refresh) {
    res.clearCookie("refresh", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
  }
  const { email, password } = req.body;

  // validate
  await Schema.loginSchema.validate(req.body);
  // check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return response.sendNotFound(res, "User not found");
  }

  // check password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return response.sendUnauthorized(res, "Invalid credentials");
  }

  // jsonWebToken
  const payload = {
    id: user._id,
  };

  const accessTokenExpPeriod = 60 * 3;
  // jwt
  const accessToken = jwt.sign(payload, process.env.JWT, {
    expiresIn: accessTokenExpPeriod,
  });
  // refresh
  const refreshToken = jwt.sign(payload, process.env.REFRESHJWT, {
    expiresIn: 60 * 60 * 24 * 7,
  });

  // save refresh token
  user.refreshToken = [...user.refreshToken, refreshToken];
  await user.save();

  // set cookie
  res.cookie("refresh", refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    secure: true,
    sameSite: "none",
  });
  // All Good process
  return response.sendOk(res, "Login successful", {
    accessToken,
    expPeriod: accessTokenExpPeriod,
  });
};

// @desc logout a user
// @route POST /api/auth/logout
// @access Public
const logout = async (req, res) => {
  const refreshToken = req.cookies.refresh;

  // check if refresh token exists
  if (!refreshToken) {
    res.clearCookie("refresh", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return response.sendNoContent(res);
  }
  // get user by refresh token
  const user = await User.findOne({ refreshToken });

  // handle non existing user
  if (!user) {
    res.clearCookie("refresh", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return response.sendNoContent(res);
  }

  // remove refresh token from Db
  const removeRefreshToken = user.refreshToken.filter(
    (item) => item !== refreshToken
  );
  user.refreshToken = [...removeRefreshToken];
  await user.save();
  res.clearCookie("refresh", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  // All Good process
  return response.sendNoContent(res);
};

// @desc logout from all devices
// @route POST /api/auth/logout/all
// @access Public
const logoutFromAllDevices = async (req, res) => {
  const refreshToken = req.cookies.refresh;

  // check if refresh token exists
  if (!refreshToken) {
    res.clearCookie("refresh");
    return response.sendNoContent(res);
  }

  // get user by refresh token
  const user = await User.findOne({ refreshToken });

  // handle non existing user
  if (!user) {
    res.clearCookie("refresh");
    return response.sendNoContent(res);
  }

  // remove all tokens from database
  user.refreshToken = [];
  await user.save();

  // All Good process
  return response.sendNoContent(res);
};

// @desc get user data
// @route POST /api/auth/me
// @access privet

const getUserData = async (req, res) => {
  const user = await User.findById(req.userId);
  const { password, ...other } = user._doc;
  return response.sendOk(res, "", other);
};
module.exports = {
  login,
  register,
  logout,
  logoutFromAllDevices,
  getUserData,
};
