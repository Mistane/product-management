const User = require("../.././models/user.model");
const md5 = require("md5");

class userControllers {
  //[GET] /user/register
  async register(req, res) {
    res.render("./client/pages/user/register");
  }

  //[POST] /user/register
  async registerPost(req, res) {
    req.body.password = md5(req.body.password);
    const emailExist = await User.findOne({
      email: req.body.email,
      status: "active",
      deleted: false,
    });

    if (emailExist) {
      req.flash("error", "Email nay da ton tai, vui long chon mot email khac!");
      res.redirect(req.get("referrer" || "/"));
    } else {
      const newUser = new User(req.body);
      await newUser.save();
      res.redirect("/");
    }
  }
  //[GET] /user/login
  async login(req, res) {
    res.render("./client/pages/user/login");
  }

  //[POST] /user/login
  async loginPost(req, res) {
    const email = req.body.email;
    const password = md5(req.body.password);

    const user = await User.findOne({ email, password });

    if (!user) {
      req.flash("error", "Sai email hoac mat khau !");
      res.redirect(req.get("referrer" || "/"));
    }
    if (user.status !== "active") {
      req.flash("error", "tai khoan hien tai dang khong hoat dong !");
      res.redirect(req.get("referrer" || "/"));
    }

    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/");
  }
}

module.exports = new userControllers();
