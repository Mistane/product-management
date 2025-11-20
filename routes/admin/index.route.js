const productsRoute = require("./products.route");
const dashboardRoute = require("./dashboard.route");
const systemVar = require("../.././config/system");

module.exports = (app) => {
  const ADMIN_PATH = systemVar.prefixAdmin;
  app.use(`${ADMIN_PATH}`, dashboardRoute);
  app.use(`${ADMIN_PATH}/products`, productsRoute);
};
