const Product = require("../.././models/project.model");

class productsController {
  //[GET] /admin/products
  async index(req, res) {
    const status = req.query.status;
    const find = {};
    if (status) {
      find.status = status;
    }
    console.log(find);
    const products = await Product.find(find);

    res.render("./admin/pages/products/index", {
      pageTitle: "Trang san pham",
      products,
    });
  }
}

module.exports = new productsController();
