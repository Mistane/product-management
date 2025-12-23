module.exports.checkEmail = (req, res, next) => {
  if (!req.body.email) {
    req.flash("error", "Vui long dien thong tin");
    res.redirect(req.get("referrer" || "/"));
  } else {
    next();
  }
};
