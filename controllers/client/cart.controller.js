const Cart = require("../.././models/cart.model");
const Product = require("../.././models/project.model");
const productHelper = require("../.././helpers/productPrice");

class cartControllers {
  //[POST] /cart/add/:product-id
  async addPost(req, res) {
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

  //[GET] /cart
  async index(req, res) {
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({ _id: cartId });
    for (const item of cart.products) {
      const productId = item.product_id;
      const product = await Product.findOne({ _id: productId });
      productHelper.newProductPrice(product);
      item.thumbnail = product.thumbnail;
      item.title = product.title;
      item.price = product.newPrice;
      item.totalPrice = item.price * item.quantity;
      item.slug = product.slug;
    }
    let totalPrice = 0;
    for (const item of cart.products) {
      if (item.isSelected == true) {
        totalPrice += item.totalPrice;
      }
    }
    cart.totalPrice = totalPrice;
    res.render("client/pages/cart/index", { cartDetail: cart });
  }

  //[POST] /cart/update
  async update(req, res) {
    const ids = req.body.ids.split("-");
    console.log(ids);
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({ _id: cartId });
    if (ids[0] == "") {
      for (const order of cart.products) {
        await Cart.updateOne(
          { _id: cartId, "products.product_id": order.product_id },
          {
            $set: {
              "products.$.isSelected": false,
            },
          },
        );
      }
    } else {
      for (const order of cart.products) {
        for (const id of ids) {
          if (order.product_id == id) {
            await Cart.updateOne(
              { _id: cartId, "products.product_id": order.product_id },
              {
                $set: {
                  "products.$.isSelected": true,
                },
              },
            );
            break;
          } else {
            await Cart.updateOne(
              { _id: cartId, "products.product_id": order.product_id },
              {
                $set: {
                  "products.$.isSelected": false,
                },
              },
            );
          }
        }
      }
    }
    res.redirect(req.get("referrer" || "/"));
  }
  //[GET] /cart/update/:productId/:quantity
  async updateQuantity(req, res) {
    const cartId = req.cookies.cartId;
    await Cart.updateOne(
      { _id: cartId, "products.product_id": req.params.productId },
      {
        $set: {
          "products.$.quantity": parseInt(req.params.quantity),
        },
      },
    );
    res.redirect(req.get("referrer" || "/"));
  }

  //[GET] /cart/delete/:productId
  async delete(req, res) {
    const cartId = req.cookies.cartId;
    await Cart.updateOne(
      { _id: cartId },
      {
        $pull: {
          products: { product_id: req.params.productId },
        },
      },
    );
    res.redirect(req.get("referrer" || "/"));
  }
}

module.exports = new cartControllers();
