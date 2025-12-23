const express = require("express");
const router = express.Router();
const userController = require("../../controllers/client/user.controller");
const userHelpers = require("../../helpers/client/userHelper");
const forgotPasswordHelper = require("../../helpers/client/forgotPassword.helper");

router.get("/register", userController.register);
router.post(
  "/register",
  userHelpers.checkRegister,
  userController.registerPost,
);
router.get("/login", userController.login);
router.post("/login", userHelpers.checkLogin, userController.loginPost);
router.get("/logout", userController.logout);
router.get("/password/forgot", userController.forgotPassword);
router.post(
  "/password/forgot",
  forgotPasswordHelper.checkEmail,
  userController.forgotPasswordPost,
);
router.get("/password/otp/:email", userController.otp);
router.post("/password/otp", userController.otpPost);
router.get("/password/reset", userController.reset);
router.post("/password/reset", userController.resetPost);

module.exports = router;
