const express = require("express");
const path = require("path");
const router = express.Router();

const fs = require("fs");
const cacheExpiry = 30 * 1000; //30sec - allow updated values to reflect on refresh
const hexValueRegex = /^#([0-9A-F]{6})$/i; //Start = #, 6 values 0-F in Hex / 3 Hex numbers
const colourNameRegex = /^[\w\s-]+$/; //Word characters only
let colours = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "public", "data.json"))
);

const hexToDecimal = (hex) => parseInt(hex, 16);
const hexStringToRgbValues = (hex) => {
  hex = hex.replace(/^#/, "");
  // Split the hex string
  const redHex = hex.substring(0, 2);
  const greenHex = hex.substring(2, 4);
  const blueHex = hex.substring(4, 6);

  return [hexToDecimal(redHex), hexToDecimal(greenHex), hexToDecimal(blueHex)];
};
const rgbToHsl = (red, green, blue) => {
  // r,g,b as decimal val/1
  red /= 255;
  green /= 255;
  blue /= 255;

  const cmax = Math.max(red, green, blue);
  const cmin = Math.min(red, green, blue);

  const delta = cmax - cmin; //cdiff

  // Calculate hue
  let hue = 0;
  if (delta === 0) {
    hue = 0;
  } else if (cmax === red) {
    hue = ((green - blue) / delta) % 6;
  } else if (cmax === green) {
    hue = (blue - red) / delta + 2;
  } else {
    hue = (red - green) / delta + 4;
  }

  hue = Math.round(hue * 60);
  if (hue < 0) {
    hue += 360;
  }

  //Calculate lightness
  const lightness = (cmax + cmin) / 2;

  // Calculate saturation
  const saturation =
    delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

  return {
    h: Math.round(hue),
    s: Math.round(saturation * 100),
    l: Math.round(lightness * 100),
  };
};

router.get("/", (req, res) => {
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.setHeader("Expires", new Date(Date.now() + cacheExpiry).toUTCString());
  res.send(colours);
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    console.error(`Invalid colourId param "${req.params.id}"`);
    res.status(400).send({
      error: `Invalid id "${req.params.id}" entered. Please Enter a number`,
    });
    return;
  }
  //LOG REQ
  console.log(`GET request received for colour with id ${id}`);
  const selectedColour = colours.find((obj) => obj.colorId === id);

  res.setHeader("Cache-Control", "public, max-age=3600");
  res.setHeader("Expires", new Date(Date.now() + cacheExpiry).toUTCString());
  selectedColour
    ? res.send(selectedColour)
    : res.status(404).send({ error: "Colour not found" });
});

router.post("/", (req, res) => {
  const { hexString, name } = req.body; //Take in hex, convert to other formats
  //Validate inputs
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

  //Convert from hex
  console.log("Request Received for new colour");
  const [r, g, b] = hexStringToRgbValues(hexString);
  const hsl = rgbToHsl(r, g, b);
  const newColour = {
    colorId: colours.length,
    hexString,
    rgb: { r, g, b },
    hsl,
    name,
  };

  colours.push(newColour);

  fs.writeFileSync(
    path.join(__dirname, "..", "public", "data.json"),
    JSON.stringify(colours, null, 2)
  );

  res.status(201).send(newColour);
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
    res.status(404).send("Colour could not be found");
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
