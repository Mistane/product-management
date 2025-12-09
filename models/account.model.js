const mongoose = require("mongoose");
const generate = require(".././helpers/generate");

const accountSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    status: String,
    avatar: String,
    phone: String,
    token: {
      type: String,
      default: generate.generateRandomString(20),
    },

    role_id: String,
    deleted: { type: Boolean, default: false },
    deletedAt: Date,
  },
  { timestamps: true },
);

const Account = mongoose.model("Account", accountSchema, "accounts");

module.exports = Account;
