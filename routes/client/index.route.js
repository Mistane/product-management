const productsRoutes = require("./products.route");
const searchRoutes = require("./search.route");
const homeRoutes = require("./home.route");
const cartRoutes = require("./cart.route");
const categoryMiddleware = require("../.././middlewares/client/categoryMiddleware");
const cartMiddleware = require("../.././middlewares/client/cartMiddleware");

module.exports = (app) => {
  app.use(categoryMiddleware.category);
  app.use(cartMiddleware.checkCart);
  app.use("/", homeRoutes);
  app.use("/products", productsRoutes);
  app.use("/cart", cartRoutes);
  app.use("/search", searchRoutes);
};
