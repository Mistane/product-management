const Product = require("../.././models/project.model");
const ProductCategory = require("../.././models/project.model-category");

class productController {
  //[GET] /products
  async index(req, res) {
    const products = await Product.find({}).sort({ position: "desc" });
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

  //[GET] /products/detail/:slug
  async detail(req, res) {
    try {
      const find = {
        deleted: false,
        status: "active",
        slug: req.params.slug,
      };
      const product = await Product.findOne(find);
      res.render("client/pages/products/detail", {
        pageTitle: product.slug,
        product: product,
      });
    } catch {
      res.redirect("/products");
    }
  }
}

module.exports = new productController();
