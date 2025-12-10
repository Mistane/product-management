const systemConfig = require("../.././config/system");

module.exports.login = (req, res, next) => {
  if (!req.body.email) {
    req.flash("error", "Vui long dien day du thong tin");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  }
  if (!req.body.password) {
    req.flash("error", "Vui long dien day du thong tin");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  }
  next();
};
