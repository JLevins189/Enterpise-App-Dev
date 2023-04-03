const express = require("express");
const path = require("path");
const router = express.Router();

const fs = require("fs");

const colours = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "public", "data.json"))
);

router.get("/", (req, res) => {
  //1 hr
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.setHeader("Expires", new Date(Date.now() + 3600 * 1000).toUTCString());
  res.sendFile(path.join(__dirname, "..", "public", "data.json"));
});
router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log(`Request Received for colour with id ${id}`);
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.setHeader("Expires", new Date(Date.now() + 3600 * 1000).toUTCString());
  res.send(req.params.id); //TODO update to object
});

module.exports = router;
