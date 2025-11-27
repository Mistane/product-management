const systemConfig = require("../.././config/system");

module.exports.createPost = (req, res, next) => {
  if (!req.body.title) {
    req.flash("error", "Vui long dien tieu de san pham !");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
    return;
  }
  console.log("ok");
  next();
};
