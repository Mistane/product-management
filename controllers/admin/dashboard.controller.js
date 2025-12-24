const CategoryProduct = require("../.././models/project.model-category");
const Product = require("../.././models/project.model");
const Account = require("../.././models/account.model");
const User = require("../.././models/user.model");

class dashboardController {
  async dashboard(req, res) {
    //[GET] ./admin/
    const statistic = {
      categoryProduct: {
        title: "Danh muc san pham",
        total: 0,
        active: 0,
        inactive: 0,
      },
      product: {
        title: "San pham",
        total: 0,
        active: 0,
        inactive: 0,
      },
      account: {
        title: "Tai khoan admin",
        total: 0,
        active: 0,
        inactive: 0,
      },
      user: {
        title: "Tai khoan client",
        total: 0,
        active: 0,
        inactive: 0,
      },
    };
    //product category
    let total = await CategoryProduct.countDocuments({});
    let active = await CategoryProduct.countDocuments({ status: "active" });
    let inactive = await CategoryProduct.countDocuments({ status: "inactive" });
    statistic.categoryProduct.total = total;
    statistic.categoryProduct.active = active;
    statistic.categoryProduct.inactive = inactive;
    //product
    total = await Product.countDocuments({});
    active = await Product.countDocuments({ status: "active" });
    inactive = await Product.countDocuments({ status: "inactive" });
    statistic.product.total = total;
    statistic.product.active = active;
    statistic.product.inactive = inactive;
    //account
    total = await Account.countDocuments({});
    active = await Account.countDocuments({ status: "active" });
    inactive = await Account.countDocuments({ status: "inactive" });
    statistic.account.total = total;
    statistic.account.active = active;
    statistic.account.inactive = inactive;
    //user
    total = await User.countDocuments({});
    active = await User.countDocuments({ status: "active" });
    inactive = await User.countDocuments({ status: "inactive" });
    statistic.user.total = total;
    statistic.user.active = active;
    statistic.user.inactive = inactive;
    console.log(statistic);
    const user = res.locals.user;
    res.render("./admin/pages/dashboard/index", { user, statistic });
  }
}

module.exports = new dashboardController();
