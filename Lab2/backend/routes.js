const express = require("express");
const countryController = require("./controllers/countryController");
const router = express.Router();

router.use("/api/country", countryController);
module.exports = router;
