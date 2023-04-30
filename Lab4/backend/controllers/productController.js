const express = require("express");
const path = require("path");
const fs = require("fs");
const Product = require("../models/productSchema");
const router = express.Router();

//Imgs
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "uploads/", // Specify the directory where uploaded files will be stored
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname); // <-- CHANGE HERE
  },
});
const upload = multer({ storage });

const cacheExpiry = 30 * 1000; //30sec - allow updated values to reflect on refresh
const wordCharacterRegex = /^[\w\s-]+$/; //Word characters only
const allowedCategories = [
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration",
];

router.get("/", (req, res) => {
  Product.find()
    .then((products) => {
      res.setHeader("Cache-Control", `public, max-age=${cacheExpiry}`);
      res.setHeader(
        "Expires",
        new Date(Date.now() + cacheExpiry).toUTCString()
      );
      res.send(products);
    })
    .catch((error) => {
      res.status(404).send({ error: "Products not found " });
      console.error("Error fetching products:", error);
    });
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    console.error(`Invalid productId param "${req.params.id}"`);
    res.status(400).send({
      error: `Invalid id "${req.params.id}" entered. Please Enter a number`,
    });
    return;
  }
  //LOG REQ
  console.log(`GET request received for product with id ${id}`);

  Product.findOne({ id })
    .then((product) => {
      if (product) {
        res.setHeader("Cache-Control", `public, max-age=${cacheExpiry}`);
        res.setHeader(
          "Expires",
          new Date(Date.now() + cacheExpiry).toUTCString()
        );

        res.send(product);
      } else {
        res.status(404).send({ error: `Product not found with id ${id}` });
        console.warn(`Product not found with id ${id}`);
      }
    })
    .catch((error) => {
      res
        .status(500)
        .send({ error: "An error occurred while finding the product" });
      console.error(`Error finding product with id: ${id}`, error);
    });
});

const getHighestId = async () => {
  return Product.find().sort({ id: -1 }).limit(1);
};

router.post("/", upload.array("images"), async (req, res) => {
  //TODO generate these fields   //Thumbnail
  const highestIdProduct = await getHighestId().catch((err) => {
    console.error(err);
    return res.status(500).send({
      error: "An unknown error occurred",
    });
  });

  const productId = highestIdProduct[0]?.id + 1;

  //Images
  if (!req?.files?.length) {
    return res
      .status(500)
      .send({ error: "No Images provided", field: "images" });
  }
  const urls = req.files.map((file) => {
    return `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
  });

  const sanitizedTitle = req?.bodyString("productTitle")?.trim();
  const sanitizedDescription = req?.bodyString("productDescription")?.trim();
  const sanitizedPrice = req.bodyFloat("productPrice");
  const sanitizedDiscountPercentage = req.bodyFloat(
    "productDiscountPercentage"
  );

  const sanitizedRating = req.bodyFloat("productRating");
  const sanitizedStock = req.bodyInt("productStock");
  const sanitizedBrand = req.bodyString("productBrand")?.trim();
  const sanitizedCategory = req.bodyOneOf("productCategory", allowedCategories);

  /*
   * Validate inputs
   */
  //Validate Title
  if (!sanitizedTitle || sanitizedTitle.length < 4) {
    return res.status(400).send({
      error: "Product Title must be at least 4 letters",
      field: "productTitle",
    });
  }
  if (sanitizedTitle.length > 25) {
    return res.status(400).send({
      error: "Product Title must be less than 26 letters",
      field: "productTitle",
    });
  }
  if (!wordCharacterRegex.test(sanitizedTitle)) {
    return res.status(400).send({
      error: "Product Title must only contain standard characters",
      field: "productTitle",
    });
  }

  //Validate Description
  if (!sanitizedDescription || sanitizedDescription?.split(" ")?.length < 5) {
    return res.status(400).send({
      error: "Product Description must contain at least 5 words",
      field: "productDescription",
    });
  }
  if (sanitizedDescription?.split(" ")?.length > 200) {
    return res.status(400).send({
      error: "Product Description must contain no more than 200 words",
      field: "productDescription",
    });
  }

  //Validate Price
  if (typeof sanitizedPrice !== "number" || isNaN(sanitizedPrice)) {
    return res.status(400).send({
      error: "Product Price must be a number",
      field: "productPrice",
    });
  }
  if (sanitizedPrice < 0.01) {
    return res.status(400).send({
      error: "Product Price must be at least 0.01",
      field: "productPrice",
    });
  }

  //Validate Discount
  if (
    typeof sanitizedDiscountPercentage !== "number" ||
    isNaN(sanitizedDiscountPercentage)
  ) {
    return res.status(400).send({
      error: "Product Discount must be a number",
      field: "productDiscountPercentage",
    });
  }
  if (sanitizedDiscountPercentage < 0) {
    return res.status(400).send({
      error: "Product Discount must be at least 0",
      field: "productDiscountPercentage",
    });
  }

  //Validate Rating
  if (typeof sanitizedRating !== "number" || isNaN(sanitizedRating)) {
    return res.status(400).send({
      error: "Product Rating must be a number",
      field: "productRating",
    });
  }
  if (sanitizedRating < 0) {
    return res.status(400).send({
      error: "Product Rating must be at least 0",
      field: "productRating",
    });
  }
  if (sanitizedRating > 5) {
    return res.status(400).send({
      error: "Product Rating must not be greater than 5",
      field: "productRating",
    });
  }
  //Validate Stock
  if (typeof sanitizedStock !== "number" || isNaN(sanitizedStock)) {
    return res.status(400).send({
      error: "Product Stock must be a number",
      field: "productStock",
    });
  }
  if (sanitizedStock < 0) {
    return res.status(400).send({
      error: "Product Stock must be at least 0",
      field: "productStock",
    });
  }

  if (!sanitizedBrand || sanitizedBrand?.trim().length < 4) {
    return res.status(400).send({
      error: "Product Brand must be at least 4 letters",
      field: "productBrand",
    });
  }
  if (sanitizedBrand?.trim().length > 25) {
    return res.status(400).send({
      error: "Product Brand must be less than 26 letters",
      field: "productBrand",
    });
  }
  if (!wordCharacterRegex.test(sanitizedBrand)) {
    return res.status(400).send({
      error: "Product Brand must only contain standard characters",
      field: "productBrand",
    });
  }

  // Validate Category
  if (!sanitizedCategory || !allowedCategories.includes(sanitizedCategory)) {
    return res.status(400).send({
      error: "Invalid category",
      field: "productCategory",
    });
  }

  //Save
  const newProduct = new Product({
    id: productId,
    title: sanitizedTitle,
    description: sanitizedDescription,
    price: sanitizedPrice,
    discountPercentage: sanitizedDiscountPercentage,
    rating: sanitizedRating,
    stock: sanitizedStock,
    brand: sanitizedBrand,
    category: sanitizedCategory,
    thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    images: urls,
  });

  newProduct
    .save()
    .then(() => {
      res.status(201).send(newProduct);
      console.log("Product saved successfully.");
    })
    .catch((error) => {
      res.status(500).send("Error saving new product");
      console.error("Error saving product:", error);
    });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.paramInt("id"));
  if (isNaN(id)) {
    console.error(`Invalid productId param "${req.paramInt("id")}"`);
    return res.status(400).send({
      error: `Invalid id "${req.paramInt(
        "id"
      )}" entered. Please Enter a number`,
    });
  }

  console.log(`PUT request received for product with id ${id}`);

  const sanitizedTitle = req?.bodyString("productTitle");
  const sanitizedDescription = req?.bodyString("productDescription");
  const sanitizedPrice = req.bodyFloat("productPrice");
  const sanitizedDiscountPercentage = req.bodyFloat(
    "productDiscountPercentage"
  );

  const sanitizedRating = req.bodyFloat("productRating");
  const sanitizedStock = req.bodyInt("productStock");

  /*
   * Validate inputs
   */
  //Validate Title
  if (sanitizedTitle.length < 4) {
    return res.status(400).send({
      error: "Product Title must be at least 4 letters",
      field: "productTitle",
    });
  }
  if (sanitizedTitle.length > 25) {
    return res.status(400).send({
      error: "Product Title must be less than 26 letters",
      field: "productTitle",
    });
  }
  if (!wordCharacterRegex.test(sanitizedTitle)) {
    return res.status(400).send({
      error: "Product Title must only contain standard characters",
      field: "productTitle",
    });
  }

  //Validate Description
  if (!sanitizedDescription || sanitizedDescription?.split(" ")?.length < 5) {
    return res.status(400).send({
      error: "Product Description must contain at least 5 words",
      field: "productDescription",
    });
  }
  if (sanitizedDescription?.split(" ")?.length > 200) {
    return res.status(400).send({
      error: "Product Description must contain no more than 200 words",
      field: "productDescription",
    });
  }

  //Validate Price
  if (typeof sanitizedPrice !== "number" || isNaN(sanitizedPrice)) {
    return res.status(400).send({
      error: "Product Price must be a number",
      field: "productPrice",
    });
  }
  if (sanitizedPrice < 0.01) {
    return res.status(400).send({
      error: "Product Price must be at least 0.01",
      field: "productPrice",
    });
  }

  //Validate Discount
  if (
    typeof sanitizedDiscountPercentage !== "number" ||
    isNaN(sanitizedDiscountPercentage)
  ) {
    return res.status(400).send({
      error: "Product Discount must be a number",
      field: "productDiscountPercentage",
    });
  }
  if (sanitizedDiscountPercentage < 0) {
    return res.status(400).send({
      error: "Product Discount must be at least 0",
      field: "productDiscountPercentage",
    });
  }

  //Validate Rating
  if (typeof sanitizedRating !== "number" || isNaN(sanitizedRating)) {
    return res.status(400).send({
      error: "Product Rating must be a number",
      field: "productRating",
    });
  }
  if (sanitizedRating < 0) {
    return res.status(400).send({
      error: "Product Rating must be at least 0",
      field: "productRating",
    });
  }
  if (sanitizedRating > 5) {
    return res.status(400).send({
      error: "Product Rating must not be greater than 5",
      field: "productRating",
    });
  }

  //Validate Stock
  if (typeof sanitizedStock !== "number" || isNaN(sanitizedStock)) {
    return res.status(400).send({
      error: "Product Stock must be a number",
      field: "productStock",
    });
  }
  if (sanitizedStock < 0) {
    return res.status(400).send({
      error: "Product Stock must be at least 0",
      field: "productStock",
    });
  }

  //Update Record
  Product.findOne({ id })
    .then(async (product) => {
      if (product) {
        product.title = sanitizedTitle;
        product.description = sanitizedDescription;
        product.price = sanitizedPrice;
        product.discountPercentage = sanitizedDiscountPercentage;
        product.rating = sanitizedRating;
        product.stock = sanitizedStock;

        try {
          const updatedProduct = await product?.save();
          return res.send(updatedProduct);
        } catch (err) {
          console.error(err);
          res
            .status(500)
            .send({ error: "An error occurred while updating the product" });
        }

        res.send(product);
        console.log(`Product with id ${id} updated`);
      } else {
        console.warn(`Product not found with id ${id}`);
        return res
          .status(404)
          .send({ error: `Product not found with id ${id}` });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .send({ error: "An error occurred while finding the product" });
      return console.error(`Error finding product with id: ${id}`, error);
    });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.paramInt("id"));
  if (isNaN(id)) {
    console.error(`Invalid colourId param "${req.params.id}"`);
    return res.status(400).send({
      error: `Invalid id "${req.params.id}" entered. Please Enter a number`,
    });
  }

  console.log(`DELETE request received for product with id ${id}`);

  Product.findOne({ id })
    .then((product) => {
      if (product) {
        product?.deleteOne();
        console.log(`Product with id ${id} deleted`);
        res.send("Product successfully deleted");
      } else {
        res.status(404).send({ error: `Product not found with id ${id}` });
        return console.warn(`Product not found with id ${id}`);
      }
    })
    .catch((error) => {
      res
        .status(500)
        .send({ error: "An error occurred while finding the product" });
      return console.error(`Error finding product with id: ${id}`, error);
    });
});

router.put("/", (req, res) => {
  console.error("PUT request received for product without id");
  res.status(400).send({ error: "An id you are working on must be specified" });
});

router.delete("/", (req, res) => {
  console.error("DELETE request received for product without id");
  res.status(400).send({ error: "An id you are working on must be specified" });
});

module.exports = router;
