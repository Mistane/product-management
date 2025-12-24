const productsRoute = require("./products.route");
const dashboardRoute = require("./dashboard.route");
const productsCategoryRoute = require("./products-category.route");
const accountsRoute = require("./accounts.route");
const myAccountRoute = require("./my-account.route");
const settingsRoute = require("./settings.route");
const rolesRoute = require("./roles.route");
const authRoute = require("./auth.route");
const systemVar = require("../.././config/system");
const authMiddleware = require("../.././middlewares/admin/auth.middleware");
const settingsMiddleware = require("../.././middlewares/generalSettings");

module.exports = (app) => {
  const ADMIN_PATH = systemVar.prefixAdmin;
  app.use(settingsMiddleware.settings);
  app.use(`${ADMIN_PATH}/dashboard`, authMiddleware, dashboardRoute);
  app.use(`${ADMIN_PATH}/products`, authMiddleware, productsRoute);
  app.use(
    `${ADMIN_PATH}/products-category`,
    authMiddleware,
    productsCategoryRoute,
  );
  app.use(`${ADMIN_PATH}/roles`, authMiddleware, rolesRoute);
  app.use(`${ADMIN_PATH}/accounts`, authMiddleware, accountsRoute);
  app.use(`${ADMIN_PATH}/my-account`, authMiddleware, myAccountRoute);
  app.use(`${ADMIN_PATH}/settings`, authMiddleware, settingsRoute);
  app.use(`${ADMIN_PATH}/auth`, authRoute);
};
