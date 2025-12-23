const productsRoutes = require("./products.route");
const searchRoutes = require("./search.route");
const homeRoutes = require("./home.route");
const cartRoutes = require("./cart.route");
const checkoutRoutes = require("./checkout.route");
const userRoutes = require("./user.route");
const categoryMiddleware = require("../.././middlewares/client/categoryMiddleware");
const cartMiddleware = require("../.././middlewares/client/cartMiddleware");
const userMiddleware = require("../.././middlewares/client/userMiddleware");

module.exports = (app) => {
  app.use(categoryMiddleware.category);
  app.use(cartMiddleware.checkCart);
  app.use(userMiddleware.checkLogin);
  app.use("/", homeRoutes);
  app.use("/products", productsRoutes);
  app.use("/cart", cartRoutes);
  app.use("/search", searchRoutes);
  app.use("/checkout", checkoutRoutes);
  app.use("/user", userRoutes);
};
