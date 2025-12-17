const productsRoutes = require("./products.route");
const searchRoutes = require("./search.route");
const homeRoutes = require("./home.route");
const categoryMiddleware = require("../.././middlewares/client/categoryMiddleware");

module.exports = (app) => {
  app.use(categoryMiddleware.category);
  app.use("/", homeRoutes);
  app.use("/products", productsRoutes);
  app.use("/search", searchRoutes);
};
