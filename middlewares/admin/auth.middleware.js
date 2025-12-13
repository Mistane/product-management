const Account = require("../.././models/account.model");
const Role = require("../.././models/roles.model");
const systemConfig = require("../.././config/system");

const requireAuth = async (req, res, next) => {
  if (!req.cookies.token) {
    req.flash("error", "Ban chua dang nhap");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  } else {
    const token = req.cookies.token;
    const user = await Account.findOne({ deleted: false, token }).select(
      "-password",
    );
    if (!user) {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
      res.locals.user = user;
      const role = await Role.findOne({
        deleted: false,
        _id: user.role_id,
      }).select("title permissions");
      res.locals.role = role.title;
      res.locals.permissions = role.permissions;
      next();
    }
  }
};

module.exports = requireAuth;
