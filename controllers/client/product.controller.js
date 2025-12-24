const Product = require("../.././models/project.model");
const ProductCategory = require("../.././models/project.model-category");
const productHelper = require("../.././helpers/productPrice");
const getSubCategoryIds = require("../.././helpers/getSubCategoryIds");

class productController {
  //[GET] /products
  async index(req, res) {
    const products = await Product.find({}).sort({ position: "desc" });
    const newProducts = productHelper.newProductsPrice(products);
    res.render("client/pages/products/index", {
      pageTitle: "Trang sản phẩm",
      products: newProducts,
    });
  }

  //[GET] /products/detail/:slug
  async detail(req, res) {
    try {
      const find = {
        deleted: false,
        status: "active",
        slug: req.params.productSlug,
      };
      const product = await Product.findOne(find);
      productHelper.newProductPrice(product);
      res.render("client/pages/products/detail", {
        pageTitle: product.slug,
        product: product,
      });
    } catch {
      res.redirect("/products");
    }
  }

  //[GET] /products/:product-category-slug
  async category(req, res) {
    //Moi doan code duoi day la trong truong hop khong co thang nao pha
    const slug = req.params.productCategorySlug;
    const productCategory = await ProductCategory.findOne({
      deleted: false,
      slug,
    });
    const categoryId = productCategory.id;

    //Lay ra tat ca san pham thuoc danh muc con cua danh muc hien tai
    const ids = await getSubCategoryIds.get(categoryId);
    console.log(ids);
    const products = await Product.find({
      deleted: false,
      status: "active",
      product_category_id: { $in: ids },
    });
    const newProducts = productHelper.newProductsPrice(products);
    res.render("client/pages/products/category", {
      pageTitle: "Trang sản phẩm",
      boxhead: productCategory.title,
      products: newProducts,
    });
  }
}

module.exports = new productController();
