const multer = require("multer");
const upload = multer();
const cloudUpload = require("../../middlewares/admin/cloudUpload.middleware");

const express = require("express");
const router = express.Router();
const productsCategoryController = require("../.././controllers/admin/products-category.controller");
const validates = require("../.././validates/admin/product.validate");

router.get("/", productsCategoryController.index);
router.get("/create", productsCategoryController.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  cloudUpload,
  validates.createPost,
  productsCategoryController.createPost,
);
router.get("/edit/:id", productsCategoryController.edit);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  productsCategoryController.editPatch,
);
router.get("/detail/:id", productsCategoryController.detail);
router.patch(
  "/change-status/:status/:id",
  productsCategoryController.changeStatus,
);
router.patch("/change-multi", productsCategoryController.changeMulti);
router.delete("/delete/:id", productsCategoryController.delete);

module.exports = router;
