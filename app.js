const express = require("express");
const app = express();

const path = require("path");

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

app.get("/vieworder", (req, res) => {
  res.render("vieworder");
});

app.listen(3000, () => {
  console.log("Server is running.....");
});
