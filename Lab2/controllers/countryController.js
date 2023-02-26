const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/capital-city", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "..",
      "public",
      "country-objects",
      "country-by-capital-city.json"
    )
  );
});

router.get("/coastline", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "..",
      "public",
      "country-objects",
      "country-by-continent.json"
    )
  );
});

router.get("/continent", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "..",
      "public",
      "country-objects",
      "country-by-continent.json"
    )
  );
});

router.get("/currency-name", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "..",
      "public",
      "country-objects",
      "country-by-currency-name.json"
    )
  );
});

router.get("/domain-tld", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "..",
      "public",
      "country-objects",
      "country-by-domain-tld.json"
    )
  );
});

router.get("/flag", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "..",
      "public",
      "country-objects",
      "country-by-flag.json"
    )
  );
});

module.exports = router;
