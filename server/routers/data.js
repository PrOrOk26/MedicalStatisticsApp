const express = require("express");
const dataRouter = express.Router();

const { uri, collectionNames, dbName } = require("../constants.js");

const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(uri);


let db = {};

client.connect(function (err) {
  console.log("Connected successfully to server");
  db = client.db(dbName);
});

dataRouter.use(express.json({ type: "application/json" }));

dataRouter.get("/aids", function (req, res) {
  const { by = "country" } = req.query;
  let collectionName = "";

  if (by === "region") {
    collectionName = "aids_regions";
  } else if (by === "country") {
    collectionName = "aids_countries";
  } else {
    res.status(400).send('Bad request')
    return
  }

  const aidsCollection = db.collection(collectionName);

  aidsCollection.find({}).toArray(function (err, data) {
    if (err) {
      console.error(err)
      res.status(500).send('Internal server error')
    }
    console.log(data);
    res.json(data);
  });

});

dataRouter.get("/mortality", function (req, res) {
  if (req.query.type || req.query.by) {
    res.send(`/mortality params: ${req.query.type}, ${req.query.by}`);
  } else {
    res.send("/mortality");
  }
});

dataRouter.get("/life_expectancy", function (req, res) {
  if (req.query.basis) {
    res.send(`/life_expectancy params: ${req.query.basis}`);
  } else {
    res.send("/life_expectancy");
  }
});

module.exports = dataRouter;
