class myAccountController {
  async index(req, res) {
    //[GET] ./admin/my-account
    const user = res.locals.user;
    user.role = res.locals.role;
    res.render("./admin/pages/my-account/index", { user: res.locals.user });
  }
}

module.exports = new myAccountController();
