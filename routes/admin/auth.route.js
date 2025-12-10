const express = require("express");
const router = express.Router();
const authController = require("../.././controllers/admin/auth.controller");
const validates = require("../.././validates/admin/login.validate.js");

router.get("/login", authController.login);
router.post("/login", validates.login, authController.loginPost);
router.get("/logout", authController.logout);

module.exports = router;
