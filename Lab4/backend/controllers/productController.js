const express = require("express");
const path = require("path");
const fs = require("fs");
const Product = require("../models/productSchema");
const router = express.Router();

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

router.post("/", async (req, res) => {
  //TODO generate these fields
  //Images
  //Thumbnail
  const highestIdProduct = await getHighestId().catch((err) =>
    console.error(err)
  );

  const productId = highestIdProduct[0]?.id + 1;

  const sanitizedTitle = req?.bodyString("productTitle");
  const sanitizedDescription = req?.bodyString("productDescription");
  const sanitizedPrice = req.bodyFloat("productPrice");
  const sanitizedDiscountPercentage = req.bodyFloat(
    "productDiscountPercentage"
  );

  const sanitizedRating = req.bodyFloat("productRating");
  const sanitizedStock = req.bodyInt("productStock");
  const sanitizedBrand = req.bodyString("productBrand");
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
  if (sanitizedDescription?.split()?.length < 5) {
    return res.status(400).send({
      error: "Product Description must contain at least 5 words",
      field: "productDescription",
    });
  }
  if (sanitizedDescription?.split()?.length > 200) {
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
      error: "Product Rating must be a number",
      field: "productStock",
    });
  }
  if (sanitizedStock < 0) {
    return res.status(400).send({
      error: "Product Stock must be at least 0",
      field: "productStock",
    });
  }

  if (sanitizedBrand?.trim().length < 4) {
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
  if (!allowedCategories.includes(sanitizedCategory)) {
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
    images: [
      "https://i.dummyjson.com/data/products/1/1.jpg",
      "https://i.dummyjson.com/data/products/1/2.jpg",
      "https://i.dummyjson.com/data/products/1/3.jpg",
      "https://i.dummyjson.com/data/products/1/4.jpg",
      "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    ],
  });

  newProduct
    .save()
    .then(() => {
      res.send(newProduct);
      console.log("Product saved successfully.");
    })
    .catch((error) => {
      res.status(500).send("Error saving new product");
      console.error("Error saving product:", error);
    });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { hexString, name } = req.body; //Take in hex, convert to other formats

  //Path validation
  if (isNaN(id)) {
    console.error(`Invalid colourId param ${req.params.id}`);
    res.status(400).send({
      error: `Invalid id "${req.params.id}" entered. Please Enter a number`,
    });
    return;
  }
  //Body Validation
  if (!hexValueRegex.test(hexString)) {
    res.status(400).send({
      error: `${hexString} is not a valid hex colour string`,
      field: "hexString",
    });
    return;
  }
  if (!colourNameRegex.test(name)) {
    res.status(400).send({
      error: `${name} is not a valid colour name. Do not use special characters`,
      field: "name",
    });
    return;
  }

  console.log(`PUT request received for colour with id ${id}`);
  const selectedColourIndex = colours.findIndex((obj) => obj.colorId === id);

  //Convert from hex
  const [r, g, b] = hexStringToRgbValues(hexString);
  const hsl = rgbToHsl(r, g, b);

  const newColour = {
    colorId: id,
    hexString,
    rgb: { r, g, b },
    hsl,
    name,
  };

  let statusCode = 200; //201 if new obj

  if (selectedColourIndex !== -1) {
    //if exists already
    colours[selectedColourIndex] = newColour;
  } else {
    colours.push(newColour); //add new colour
    statusCode = 201;
  }
  res.status(statusCode).send({ colour: newColour, uri: `/colours/${id}` });

  fs.writeFileSync(
    path.join(__dirname, "..", "public", "data.json"),
    JSON.stringify(colours, null, 2)
  );
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    console.error(`Invalid colourId param "${req.params.id}"`);
    res.status(400).send({
      error: `Invalid id "${req.params.id}" entered. Please Enter a number`,
    });
    return;
  }

  console.log(`DELETE request received for colour with id ${id}`);

  const selectedColourIndex = colours.findIndex((obj) => obj.colorId === id);
  if (selectedColourIndex === -1) {
    //Not Found
    console.log(`Colour with id ${id} not found`);
    res.status(404).send({ error: "Colour could not be found" });
    return;
  }

  colours.splice(selectedColourIndex, 1);
  fs.writeFileSync(
    path.join(__dirname, "..", "public", "data.json"),
    JSON.stringify(colours, null, 2)
  );

  console.log(`Colour with id ${id} deleted`);
  res.send("Colour successfully deleted");
});

router.put("/", (req, res) => {
  console.error("PUT request received for colour without id");
  res.status(400).send({ error: "An id you are working on must be specified" });
});

router.delete("/", (req, res) => {
  console.error("DELETE request received for colour without id");
  res.status(400).send({ error: "An id you are working on must be specified" });
});

//https://sabe.io/blog/javascript-hex-to-decimal#:~:text=The%20best%20way%20to%20convert,(base)%20of%20the%20number.
//https://css-tricks.com/converting-color-spaces-in-javascript/
module.exports = router;