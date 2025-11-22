const Product = require("../.././models/project.model");

class productsController {
  //[GET] /admin/products
  async index(req, res) {
    const products = await Product.find({});
    res.render("./admin/pages/products/index", {
      pageTitle: "Trang san pham",
      products,
    });
  }
}

module.exports = new productsController();
