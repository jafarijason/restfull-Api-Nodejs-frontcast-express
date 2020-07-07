const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Order',orderSchema)
