const mongoose = require("mongoose");
class db {
  async connect() {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Ket noi toi db thanh cong !");
    } catch {
      console.log("Ket noi toi db that bai !");
    }
  }
}
module.exports = new db();
