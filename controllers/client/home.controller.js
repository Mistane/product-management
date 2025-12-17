const ProductCategory = require("../.././models/project.model-category");
const createTreeHelper = require("../.././helpers/createCategoryTree");
const Product = require("../.././models/project.model");
const productHelper = require("../.././helpers/productPrice");

class homeControllers {
  async index(req, res) {
    //[GET] /
    const productsFeatured = await Product.find({
      deleted: false,
      status: "active",
      featured: "1",
    });
    const newProductsFeatured =
      productHelper.newProductsPrice(productsFeatured);

    const latestReleasedProducts = await Product.find({
      deleted: false,
      status: "active",
    })
      .sort({ position: "desc" })
      .limit(6);
    res.render("client/pages/home/index", {
      pageTitle: "Trang chu",
      productsFeatured: newProductsFeatured,
      latestReleasedProducts,
    });
  }
}

module.exports = new homeControllers();
