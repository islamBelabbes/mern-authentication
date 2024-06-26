const router = require("express").Router();
const refreshTokenController = require("../controllers/refreshTokenController");
const slowDown = require("express-slow-down");

const speedLimiter = slowDown({
  windowMs: 1 * 60 * 1000, // 15 minutes
  delayAfter: 2, // allow 100 requests per 15 minutes, then...
  delayMs: 500, // begin adding 500ms of delay per request above 100:
  // request # 101 is delayed by  500ms
  // request # 102 is delayed by 1000ms
  // request # 103 is delayed by 1500ms
  // etc.
});
router.post("/refresh", speedLimiter, refreshTokenController);
module.exports = router;
