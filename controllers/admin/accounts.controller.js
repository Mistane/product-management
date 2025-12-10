const Role = require("../.././models/roles.model");
const Account = require("../.././models/account.model");
const systemConfig = require("../.././config/system");
const md5 = require("md5");

class accountsController {
  //[GET] ./admin/accounts
  async index(req, res) {
    const accounts = await Account.find({ deleted: false });
    const roles = await Role.find({ deleted: false });
    res.render("./admin/pages/accounts/index", { accounts, roles });
  }

  //[GET] ./admin/accounts/create
  async create(req, res) {
    const roles = await Role.find({ deleted: false });
    res.render("./admin/pages/accounts/create", { roles });
  }

  //[POST] ./admin/roles/create
  async createPost(req, res) {
    req.body.password = md5(req.body.password);
    let isExist = await Account.findOne({
      deleted: false,
      email: req.body.email,
    });
    if (isExist) {
      req.flash("error", "Email da ton tai");
      res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    } else {
      const newAccount = new Account(req.body);
      await newAccount.save();
      //res.send(req.body);
      res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
  }
  //[GET] ./admin/accounts/edit/:id
  async edit(req, res) {
    try {
      const roles = await Role.find({ deleted: false });
      const account = await Account.findOne({
        deleted: false,
        _id: req.params.id,
      });
      res.render("./admin/pages/accounts/edit", { roles, account });
    } catch (e) {
      res.redirect(`${systemConfig.prefixAdmin}/roles`);
    }
  }

  //[PATCH] ./admin/accounts/edit/:id
  async editPatch(req, res) {
    const id = req.params.id;
    let isExist = await Account.findOne({
      deleted: false,
      _id: { $ne: id },
      email: req.body.email,
    });
    if (isExist) {
      console.log(isExist);
      console.log("Da ton tai");
      req.flash("error", "email da ton tai");
      res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    } else {
      if (req.body.password) {
        req.body.password = md5(req.body.password);
      } else delete req.body.password;
      await Account.updateOne({ _id: id }, req.body);
      res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
  }

  //[GET] ./admin/roles/permissions
  async permissions(req, res) {
    const find = { deleted: false };
    const records = await Role.find(find);
    res.render("./admin/pages/roles/permissions", { records });
  }

  //[PATCH] ./admin/roles/permissions
  async permissionsPatch(req, res) {
    const datas = JSON.parse(req.body.data);
    datas.forEach(async (data) => {
      await Role.updateOne({ _id: data.id }, { permissions: data.permissions });
    });
    res.redirect(req.get("referrer") || "/");
  }
}

module.exports = new accountsController();
