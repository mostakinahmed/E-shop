const mongoose = require("mongoose");
const Counter = require("./counter"); // Assuming you have a counter model for auto-incrementing IDs
const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

productSchema.pre("validate", async function (next) {
  if (!this.productId) {
    try {
      // Find the last inserted product
      const lastProduct = await this.constructor.findOne(
        {},
        {},
        { sort: { _id: -1 } }
      );

      let newId = "P0001";

      if (lastProduct && lastProduct.productId) {
        const match = lastProduct.productId.match(/^P(\d{4})$/); // match "P0001" format
        if (match) {
          const lastIdNum = parseInt(match[1], 10); // extract number safely
          newId = "P" + String(lastIdNum + 1).padStart(4, "0");
        }
      }

      this.productId = newId;
      next();
    } catch (err) {
      next(err); // pass error to Mongoose
    }
  } else {
    next(); // skip if productId is already set
  }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
