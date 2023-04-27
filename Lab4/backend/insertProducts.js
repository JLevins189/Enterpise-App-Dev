const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Product = require("./models/productSchema");

const insertProducts = () => {
  const products = JSON.parse(
    fs.readFileSync(path.join(__dirname, "public", "data.json"))
  )?.products;

  Product.insertMany(products)
    .then((result) => {
      console.log("Products inserted successfully");
    })
    .catch((error) => {
      console.error("Error inserting products:", error);
    });
};
module.exports = insertProducts;
