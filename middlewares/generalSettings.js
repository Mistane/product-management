const SettingsGeneral = require(".././models/settingsGeneral.model");
module.exports.settings = async (req, res, next) => {
  const settings = await SettingsGeneral.findOne({});
  res.locals.settings = settings;
  next();
};
