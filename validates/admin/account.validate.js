const systemConfig = require("../.././config/system");

module.exports.createPost = (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", "Vui long dien ho va ten !");
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    return;
  }
  if (!req.body.email) {
    req.flash("error", "Vui long dien email !");
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    return;
  }
  next();
};
