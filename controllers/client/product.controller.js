class productController {
  index(req, res) {
    res.render("client/pages/products/index");
  }
}

module.exports = new productController();
