const Product = require("../.././models/project.model");

class productController {
  //[GET] /products
  async index(req, res) {
    const products = await Product.find({});
    const newProducts = products.map((product) => {
      product.newPrice = (
        (product.price * (100 - product.discountPercentage)) /
        100
      ).toFixed(0);
      return product;
    });
    res.render("client/pages/products/index", {
      pageTitle: "Trang sản phẩm",
      title: "Đây là trang sản phẩm",
      products: newProducts,
    });
  }
}

module.exports = new productController();
