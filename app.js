require("dotenv").config();
const express = require("express");
const MongoDB = require("./MongoDB/db.js");
const app = express();
const path = require("path");
const { mongo } = require("mongoose");
const product = require("./models/product");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  let data = await product.find();
  res.render("index.ejs", { data });
});

app.get("/admin", async (req, res) => {
  //console.log("Products fetched successfully:", data);
  const totalProducts = await product.countDocuments();
  res.render("admin", { totalProducts });
});

app.get("/product", async (req, res) => {
  // Fetch products from the database
  // let data = await product.find();
  const countTotalProducts = await product.countDocuments();
  const data = await product.find().sort({ _id: -1 }).limit(3);
  // Fetch low stock products
  const LowStockProducts = await product.find({ stock: { $lte: 5 } });
  const countLowStockProducts = LowStockProducts.length;

  const outOfStockProducts = await product.find({ stock: { $eq: 0 } });
  const countOutOfStockProducts = outOfStockProducts.length;
  res.render("product", {
    data,
    countTotalProducts,
    countLowStockProducts,
    countOutOfStockProducts,
  });
});

app.get("/order", (req, res) => {
  res.render("order");
});

app.get("/addnew", (req, res) => {
  res.render("addnew");
});

app.post("/addnew", async (req, res) => {
  let { productName, price, category, stock, imageUrl, description } = req.body;

  try {
    let data = new product({
      productName,
      price,
      category,
      stock,
      imageUrl,
      description,
    });
    await data.save();

    // res.redirect("/product");
    res.redirect("/product?success=1");
  } catch (err) {
    console.error("❌ Error adding product:", err);
    res.status(500).send("Internal Server Error");
  }
});

//view order
app.get("/vieworder", (req, res) => {
  res.render("vieworder");
});

app.get("/allproduct", async (req, res) => {
  let data = await product.find();
  res.render("allproduct", { data });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
