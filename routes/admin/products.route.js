const multer = require("multer");
const storageMulter = require("../../helpers/storageMulter");
const upload = multer();
const cloudUpload = require("../../middlewares/admin/cloudUpload.middleware");

const express = require("express");
const router = express.Router();
const productsController = require("../.././controllers/admin/products.controller");
const validates = require("../.././validates/admin/product.validate");

router.get("/", productsController.index);
router.get("/create", productsController.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  cloudUpload,
  validates.createPost,
  productsController.createPost,
);
router.get("/edit/:id", productsController.edit);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  productsController.editPatch,
);
router.get("/detail/:id", productsController.detail);
router.patch("/change-status/:status/:id", productsController.changeStatus);
router.patch("/change-multi", productsController.changeMulti);
router.delete("/delete/:id", productsController.delete);

module.exports = router;
