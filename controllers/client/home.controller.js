const ProductCategory = require("../.././models/project.model-category");
const createTreeHelper = require("../.././helpers/createCategoryTree");

class homeControllers {
  async index(req, res) {
    //[GET] /
    res.render("client/pages/home/index", {
      pageTitle: "Trang chu",
      title: "Đây là trang chủ",
    });
  }
}

module.exports = new homeControllers();
