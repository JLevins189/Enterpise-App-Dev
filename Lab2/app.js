const serverPort = 3000;
const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const { request } = require("express");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

app.listen(serverPort, () => {
  console.log(`Server listening on port ${serverPort}`);
});
