const mongoose = require("mongoose");
class db {
  async connect() {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/product-management");
      console.log("Ket noi toi db thanh cong !");
    } catch {
      console.log("Ket noi toi db that bai !");
    }
  }
}
module.exports = new db();
