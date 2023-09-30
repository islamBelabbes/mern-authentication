const router = require("express").Router();
const authController = require("../controllers/authController");
const isAuth = require("../middleware/authMiddleware");
router.post("/login", authController.login);
router.post("/register", authController.register);
router.delete("/logout", authController.logout);
router.delete("/logout/all", authController.logoutFromAllDevices);
router.get("/refresh", authController.refreshToken);
router.get("/me", isAuth, authController.getUserData);

module.exports = router;
