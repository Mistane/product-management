const Role = require("../.././models/roles.model");
const systemConfig = require("../.././config/system");

class rolesController {
  //[GET] ./admin/roles
  async index(req, res) {
    const roles = await Role.find({ deleted: false });
    res.render("./admin/pages/roles/index", { roles });
  }

  //[GET] ./admin/roles/create
  async create(req, res) {
    res.render("./admin/pages/roles/create");
  }

  //[POST] ./admin/roles/create
  async createPost(req, res) {
    const newRole = Role(req.body);
    await newRole.save();
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
  //[GET] ./admin/roles/edit/:id
  async edit(req, res) {
    try {
      const role = await Role.findOne({ deleted: false, _id: req.params.id });
      res.render("./admin/pages/roles/edit", { role });
    } catch (e) {
      res.redirect(`${systemConfig.prefixAdmin}/roles`);
    }
  }

  //[PATCH] ./admin/roles/edit/:id
  async editPatch(req, res) {
    const id = req.params.id;
    await Role.updateOne({ _id: id }, req.body);
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
}

module.exports = new rolesController();
