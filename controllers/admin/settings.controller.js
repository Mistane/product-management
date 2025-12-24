const SettingsGeneral = require("../.././models/settingsGeneral.model");

class settingsController {
  //[GET] /admin/settings/general
  async general(req, res) {
    const settings = await SettingsGeneral.findOne({});
    console.log(settings);
    res.render("./admin/pages/settings/general", { settings: settings || {} });
  }

  //[POST] /admin/settings/general
  async generalPost(req, res) {
    const settings = await SettingsGeneral.findOne({});
    if (!settings) {
      const newSettings = new SettingsGeneral(req.body);
      await newSettings.save();
      res.redirect(req.get("referrer" || "/"));
    } else {
      await SettingsGeneral.updateOne({ _id: settings.id }, req.body);
      res.redirect(req.get("referrer"));
    }
  }
}

module.exports = new settingsController();
