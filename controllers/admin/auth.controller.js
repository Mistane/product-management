const Role = require("../.././models/roles.model");
const Account = require("../.././models/account.model");
const systemConfig = require("../.././config/system");
const md5 = require("md5");

class accountsController {
  //[GET] ./admin/auth/login
  async login(req, res) {
    const token = req.cookies.token;
    const user = await Account.findOne({ deleted: false, token });
    if (token && user) {
      res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
    } else {
      res.render("./admin/pages/auth/login");
    }
  }

  //[POST] ./admin/roles/login
  async loginPost(req, res) {
    const { email, password } = req.body;
    const user = await Account.findOne({ email, password: md5(password) });
    console.log(user);
    if (!user) {
      req.flash("error", "Sai email hoac mat khau!");
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
      res.cookie("token", user.token);
      res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
    }
  }

  //[GET] ./admin/roles/logout
  async logout(req, res) {
    res.clearCookie("token");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  }
}

module.exports = new accountsController();
