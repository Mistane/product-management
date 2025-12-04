const productsRoute = require("./products.route");
const dashboardRoute = require("./dashboard.route");
const productsCategoryRoute = require("./products-category.route");
const rolesRoute = require("./roles.route");
const systemVar = require("../.././config/system");

module.exports = (app) => {
  const ADMIN_PATH = systemVar.prefixAdmin;
  app.use(`${ADMIN_PATH}`, dashboardRoute);
  app.use(`${ADMIN_PATH}/products`, productsRoute);
  app.use(`${ADMIN_PATH}/products-category`, productsCategoryRoute);
  app.use(`${ADMIN_PATH}/roles`, rolesRoute);
};
