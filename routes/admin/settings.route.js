const express = require("express");
const router = express.Router();
const settingsController = require("../.././controllers/admin/settings.controller");
const multer = require("multer");
const upload = multer();
const cloudUpload = require("../../middlewares/admin/cloudUpload.middleware");

router.get("/general", settingsController.general);
router.patch(
  "/general",
  upload.single("logo"),
  cloudUpload,
  settingsController.generalPost,
);

module.exports = router;
