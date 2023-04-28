const serverPort = 8080;
const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const insertProducts = require("./insertProducts");

const app = express();
app.use(require("sanitize").middleware);

const allowedOrigins = ["http://localhost:3000"];
const mongoDB = "mongodb://127.0.0.1/products";

mongoose.connect(mongoDB);

app.use(cors({ origin: allowedOrigins }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

app.listen(serverPort, () => {
  console.log(`Server listening on port ${serverPort}`);
});

const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");

  //Check if DB has been initalised
  if (connection?.db?.collections?.length <= 0) {
    // Create collection and insert initial data
    connection
      .createCollection("products")
      .then(() => {
        console.log("Created 'products' collection");
      })
      .catch((error) => {
        console.error("Error creating 'products' collection:", error);
      });
  } else {
    console.log("Database has already been initialised");
  }

  //If no documents add the JSON file data
  connection
    ?.collection("products")
    ?.countDocuments()
    .then((numberDocs) => {
      if (numberDocs === 0) {
        insertProducts();
      }
    });
});
//https://kb.objectrocket.com/mongo-db/simple-mongoose-and-node-js-example-1007
