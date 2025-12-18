const ProductCategory = require("../.././models/project.model-category");
const createTreeHelper = require("../.././helpers/createCategoryTree");
const Product = require("../.././models/project.model");
const Cart = require("../.././models/cart.model");
const Order = require("../.././models/order.model");
const productHelper = require("../.././helpers/productPrice");

class checkoutControllers {
  async index(req, res) {
    //[GET] /checkout
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({ _id: cartId });
    console.log(cart);
    for (const item of cart.products) {
      if (item.isSelected) {
        const productId = item.product_id;
        const product = await Product.findOne({ _id: productId });
        productHelper.newProductPrice(product);
        item.thumbnail = product.thumbnail;
        item.title = product.title;
        item.price = product.newPrice;
        item.totalPrice = item.price * item.quantity;
        item.slug = product.slug;
      }
    }
    let totalPrice = 0;
    for (const item of cart.products) {
      if (item.isSelected) totalPrice += item.totalPrice;
    }
    cart.totalPrice = totalPrice;
    res.render("client/pages/checkout/index", { cartDetail: cart });
  }

  //[POST] /checkout/order
  async orderPost(req, res) {
    const userInfo = req.body;
    const products = [];
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({ _id: cartId });
    const orderSelected = [];
    for (const order of cart.products) {
      if (order.isSelected) {
        orderSelected.push(order.product_id);
        const product = await Product.findOne({ _id: order.product_id });
        const item = {};
        item.product_id = product.id;
        item.price = product.price;
        item.discountPercentage = product.discountPercentage;
        item.quantity = order.quantity;
        products.push(item);
      }
    }
    const orderDetail = {
      cart_id: cartId,
      userInfo: userInfo,
      products: products,
    };

    const order = new Order(orderDetail);
    await order.save();

    await Cart.updateOne(
      { _id: cartId },
      {
        $pull: { products: { product_id: { $in: orderSelected } } },
      },
    );
    res.send(order);
  }
}

module.exports = new checkoutControllers();
