const Account = require("../.././models/account.model");
const systemConfig = require("../.././config/system");

const requireAuth = async (req, res, next) => {
  if (!req.cookies.token) {
    req.flash("error", "Ban chua dang nhap");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  } else {
    const token = req.cookies.token;
    const user = await Account.findOne({ deleted: false, token });
    if (!user) {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
      next();
    }
  }
};

module.exports = requireAuth;
