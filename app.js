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

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/admin", (req, res) => {
  res.render("admin");
});

app.get("/product", (req, res) => {
  res.render("product");
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
    let data = await product.create({
      productName,
      price,
      category,
      stock,
      imageUrl,
      description,
    });

    console.log("✅ Product added:", data);
    res.redirect("/admin");
  } catch (err) {
    console.error("❌ Error adding product:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/vieworder", (req, res) => {
  res.render("vieworder");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
