const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");
const Product = require("../models/productSchema");

const cacheExpiry = 30 * 1000; //30sec - allow updated values to reflect on refresh
const productTitleRegex = /^[\w\s-]+$/; //Word characters only

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

router.post("/", (req, res) => {
  //TODO generate these fields
  //ID
  //Images
  //Thumbnail

  const sanitizedTitle = sanitize(req.body.productTitle);
  const sanitizedDescription = sanitize(req.body.productDescription);
  const sanitizedPrice = sanitize(req.body.productPrice);
  const sanitizedDiscountPercentage = sanitize(
    req.body.productDiscountPercentage
  );
  const sanitizedRating = sanitize(req.body.productRating);
  const sanitizedStock = sanitize(req.body.productStock);
  const sanitizedBrand = sanitize(req.body.productBrand);
  const sanitizedCategory = sanitize(req.body.productCategory);

  /*
   * Validate inputs
   */
  //Validate Title
  if (sanitizedTitle?.trim().length < 4) {
    return res.status(400).send({
      error: "Product Title must be at least 4 letters",
      field: "productTitle",
    });
  }
  if (sanitizedTitle?.trim().length > 25) {
    return res.status(400).send({
      error: "Product Title must be less than 26 letters",
      field: "productTitle",
    });
  }
  if (!sanitizedTitle.test(productTitleRegex)) {
    return res.status(400).send({
      error: "Product Title must only contain standard characters",
      field: "productTitle",
    });
  }

  //Validate Description
  if (sanitizedDescription?.split().length < 5) {
    return res.status(400).send({
      error: "Product Description must contain at least 5 words",
      field: "productDescription",
    });
  }
  if (sanitizedDescription?.split().length > 200) {
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
      error: "Product Price must be at least 0.0.1",
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
