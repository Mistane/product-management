module.exports.checkRegister = (req, res, next) => {
  if (!req.body.fullName || !req.body.email || !req.body.password) {
    req.flash("error", "Vui long dien day du thong tin");
    res.redirect(req.get("referrer" || "/"));
  } else {
    next();
  }
};

module.exports.checkLogin = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    req.flash("error", "Vui long dien day du thong tin");
    res.redirect(req.get("referrer" || "/"));
  } else {
    next();
  }
};
