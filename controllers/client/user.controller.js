const User = require("../.././models/user.model");
const ForgotPassword = require("../.././models/forgotPassword.model.js");
const md5 = require("md5");
const generate = require("../.././helpers/generate.js");
const mailHelper = require("../.././helpers/mailHelper");

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
    } else {
      if (user.status !== "active") {
        req.flash("error", "Tai khoan hien dang bi khoa hoac khong hoat dong!");
        res.redirect(req.get("referrer" || "/"));
      } else {
        res.cookie("tokenUser", user.tokenUser);
        res.redirect("/");
      }
    }
  }

  //[GET] /user/logout
  async logout(req, res) {
    res.clearCookie("tokenUser");
    res.redirect("/");
  }

  //[GET] /user/password/forgot
  async forgotPassword(req, res) {
    res.render("./client/pages/user/password/forgot");
  }

  //[POST] /user/password/forgot
  async forgotPasswordPost(req, res) {
    const emailExist = await User.findOne({ email: req.body.email });
    if (!emailExist) {
      req.flash("error", "Email khong ton tai !");
      res.redirect(req.get("referrer" || "/"));
    } else {
      const otp = generate.generateRandomNumbers(8);
      const email = req.body.email;
      const info = {
        email: email,
        otp: otp,
        expireAt: Date.now(),
      };

      const subject = "Gui ma OTP de reset mat khau";
      const html = `Ma OTP de reset mat khau : <b>${otp}</b>`;
      mailHelper.sendMail(subject, email, html);

      const newPasswordForgot = new ForgotPassword(info);
      await newPasswordForgot.save();
      res.redirect(`/user/password/otp/${req.body.email}`);
    }
  }

  //[GET] /user/password/otp/:email
  async otp(req, res) {
    const email = req.params.email;
    console.log(email);
    res.render("./client/pages/user/password/otp", { email });
  }

  //[POST] /user/password/otp
  async otpPost(req, res) {
    const otp = req.body.otp;
    const email = req.body.email;
    const requestExist = await ForgotPassword.findOne({ email, otp });
    if (!requestExist) {
      req.flash("error", "Ma OTP het han hoac khong dung !");
      res.redirect(req.get("referrer" || "/"));
    } else {
      const user = await User.findOne({ email: email }).select("-password");
      res.cookie("tokenUserTmp", user.tokenUser);
      res.redirect("/user/password/reset");
    }
  }

  //[GET] /user/password/reset
  async reset(req, res) {
    res.render("./client/pages/user/password/reset");
  }

  //[POST] /user/password/reset
  async resetPost(req, res) {
    const confirmPassword = req.body.confirmPassword;
    const password = req.body.password;
    if (password !== confirmPassword) {
      req.flash("error", "Xac nhan mat khau khong dung !");
      res.redirect(req.get("referrer" || "/"));
    } else {
      const tokenUser = req.cookies.tokenUserTmp;
      await User.updateOne(
        { tokenUser: tokenUser },
        { password: md5(password) },
      );
      res.clearCookie("tokenUserTmp");
      res.redirect("/");
    }
  }
}

module.exports = new userControllers();
