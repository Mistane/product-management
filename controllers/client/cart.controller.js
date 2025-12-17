const Cart = require("../.././models/cart.model");

class cartControllers {
  //[POST] /cart/add/:product-id
  async addPost(req, res) {
    console.log(req.params.productId);
    console.log(req.body);
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({ _id: cartId });
    let productExist = false;
    let prevQuantity = 0;
    cart.products.forEach((order) => {
      if (order.product_id == productId) {
        productExist = true;
        prevQuantity = order.quantity;
        return;
      }
    });
    if (!productExist) {
      await Cart.updateOne(
        { _id: cartId },
        { $push: { products: { product_id: productId, quantity } } },
      );
    } else {
      await Cart.updateOne(
        { _id: cartId, "products.product_id": productId },
        {
          $set: {
            "products.$.quantity": quantity + prevQuantity,
          },
        },
      );
    }
    res.redirect(req.get("referrer" || "/"));
  }
}

module.exports = new cartControllers();
