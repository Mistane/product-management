const express = require("express");
const router = express.Router();
const myAccountController = require("../.././controllers/admin/myAccount.controller");

router.get("/", myAccountController.index);

module.exports = router;
