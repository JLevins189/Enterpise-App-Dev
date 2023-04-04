const express = require("express");
const path = require("path");
const router = express.Router();

const fs = require("fs");
const cacheExpiry = 24 * 60 * 60 * 1000; //24hrs
const colours = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "public", "data.json"))
);

router.get("/", (req, res) => {
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.setHeader("Expires", new Date(Date.now() + cacheExpiry).toUTCString());
  res.send(colours);
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    console.error(`Invalid colourId param ${req.params.id}`);
    res.status(400).send({
      error: `Invalid id ${req.params.id} entered. Please Enter a number`,
    });
    return;
  }
  //LOG REQ
  console.log(`GET request received for colour with id ${id}`);
  const myObject = colours.find((obj) => obj.colorId === parseInt(id));

  res.setHeader("Cache-Control", "public, max-age=3600");
  res.setHeader("Expires", new Date(Date.now() + cacheExpiry).toUTCString());
  myObject
    ? res.send(myObject)
    : res.status(404).send({ error: "Colour not found" });
});

router.post("/", (req, res) => {
  console.log("Request Received for new colour");
  res.send("1"); //TODO update to object
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  console.log(`PUT request received for colour with id ${id}`);
  const myObject = myArray.find((obj) => obj.id === 2);
  myObject
    ? res.send(myObject)
    : res.status(404).send({ error: "Object not found" });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  console.log(`DELETE request received for colour with id ${id}`);
  res.send("1"); //TODO update to object
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  console.log(`DELETE request received for colour with id ${id}`);
  res.send("1"); //TODO update to object
});

router.delete("/", (req, res) => {
  const id = req.params.id;
  console.log(`DELETE request received for colour with id ${id}`);
  res.send("1"); //TODO update to object
});

module.exports = router;
