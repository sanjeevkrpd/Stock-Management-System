const mongoose = require("mongoose");

const stockSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is Required"],
    },
    company: {
      type: String,
      required: [true, "Company is Required"],
    },
    // category: {
    //   type: String,
    //   required: [true, "Category is Required"],
    // },
    description: {
      type: String,
    },
    currentPrice: {
      type: Number,
      required: [true, "Current Price is Required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is Required"],
    },
  },
  { timestamps: true }
);

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
