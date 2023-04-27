const serverPort = 8080;
const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();
const allowedOrigins = ["http://localhost:3000"];

app.use(cors({ origin: allowedOrigins }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

app.listen(serverPort, () => {
  console.log(`Server listening on port ${serverPort}`);
});
