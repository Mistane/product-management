const express = require("express");
const router = express.Router();
const userController = require("../../controllers/client/user.controller");
const userHelpers = require("../../helpers/client/userHelper");

router.get("/register", userController.register);
router.post(
  "/register",
  userHelpers.checkRegister,
  userController.registerPost,
);
router.get("/login", userController.login);
router.post("/login", userHelpers.checkLogin, userController.loginPost);

module.exports = router;
