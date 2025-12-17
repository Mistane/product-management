const ProductCategory = require("../.././models/project.model-category");
const createTreeHelper = require("../.././helpers/createCategoryTree");
const Product = require("../.././models/project.model");
const productHelper = require("../.././helpers/productPrice");

class searchControllers {
  async index(req, res) {
    //[GET] /search
    const keyword = req.query.keyword;
    const find = { deleted: false, status: "active" };
    if (keyword) {
      console.log("ok");
      find.title = new RegExp(keyword, "i");
    }
    const products = await Product.find(find);
    const newProducts = productHelper.newProductsPrice(products);
    res.render("./client/pages/search/index", {
      keyword,
      products: newProducts,
    });
  }
}

module.exports = new searchControllers();
