const express = require("express");
const app = express();
const port = 2699;
const dataRouter = require("./routers/data.js");

const { uri, dbName, collectionNames } = require("./constants.js");

/* const mongoose = require("mongoose");
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const dbConnection = mongoose.connection;
dbConnection.on("error", console.error.bind(console, "connection error"));
dbConnection.once("open", function () {
  console.log("Mongoose connected to our cloud db");
}); */

app.get("/", function (req, res) {
  res.send("This is a working root path!");
});

app.use("/data", dataRouter);

app.get("*", function (req, res) {
  res.status(400).send('Bad Request')
});

app.listen(port, () =>
  console.log(`MedicalStatisticsApp app listening at http://localhost:${port}`)
);
