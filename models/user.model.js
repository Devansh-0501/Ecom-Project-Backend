const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },
  cart: [
    {
      quantity: {
        type: Number,
        default: 1,
      },

      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    },
  ]
});
module.exports = mongoose.model("user", userSchema);
