const express = require("express");
const router = express.Router();
const accountsController = require("../.././controllers/admin/accounts.controller");
const multer = require("multer");
const upload = multer();
const cloudUpload = require("../../middlewares/admin/cloudUpload.middleware");
const accountValidate = require("../.././validates/admin/account.validate");

router.get("/", accountsController.index);
router.get("/create", accountsController.create);
router.post(
  "/create",
  upload.single("avatar"),
  cloudUpload,
  accountValidate.createPost,
  accountsController.createPost,
);
router.get("/edit/:id", accountsController.edit);
router.patch(
  "/edit/:id",
  upload.single("avatar"),
  accountsController.editPatch,
);

module.exports = router;
