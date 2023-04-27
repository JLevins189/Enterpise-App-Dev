const express = require("express");
const colourController = require("./controllers/colourController");
const router = express.Router();

router.use("/colours", colourController);
module.exports = router;
