const ProductCategory = require("../.././models/project.model-category");
const Cart = require("../.././models/cart.model");
const createTreeHelper = require("../.././helpers/createCategoryTree");

module.exports.checkCart = async (req, res, next) => {
  if (!req.cookies.cartId) {
    const newCart = new Cart();
    await newCart.save();
    const maxAge = Date.now() + 365 * 24 * 60 * 60 * 1000;
    res.cookie("cartId", newCart.id, { maxAge });
  } else {
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({ _id: cartId });
    const cartCount = cart.products.reduce((prev, cur) => {
      return prev + cur.quantity;
    }, 0);
    console.log(cartCount);
    res.locals.cartCount = cartCount;
  }
  next();
};
