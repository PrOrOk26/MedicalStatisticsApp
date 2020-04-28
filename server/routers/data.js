const express = require("express");
const dataRouter = express.Router();

const { uri, dbName } = require("../constants.js");

const MongoClient = require("mongodb").MongoClient;

async function run() {
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
  }).catch((err) => console.error(err));

  console.log("Connected successfully to server");
  const db = client.db(dbName);

  dataRouter.use(express.json({ type: "application/json" }));

  dataRouter.get("/aids", async function (req, res) {
    const { by = "country" } = req.query;
    let collectionName = "";

    if (by === "region") {
      collectionName = "aids_regions";
    } else if (by === "country") {
      collectionName = "aids_countries";
    } else {
      res.status(400).send("Bad request");
      return;
    }

    const aidsCollection = db.collection(collectionName);

    const data = await aidsCollection
      .find({})
      .toArray()
      .catch((err) => {
        console.error(err);
        res.status(500).send("Internal server error");
      });

    console.log('aidsData', data);
    res.json(data);
  });

  dataRouter.get("/mortality/adult", async function (req, res) {
    const collection = db.collection("mortality_adult_countries");

    const data = await collection
      .find({})
      .toArray()
      .catch((err) => {
        console.error(err);
        res.status(500).send("Internal server error");
      });

    console.log('mortalityData', data);
    res.json(data);
  });

  dataRouter.get("/mortality/children", async function (req, res) {
    const { by = "country" } = req.query;
    let collectionName = "";

    if (by === "region") {
      collectionName = "mortality_children_regions";
    } else if (by === "country") {
      collectionName = "mortality_children_countries";
    } else {
      res.status(400).send("Bad request");
      return;
    }

    const collection = db.collection(collectionName);

    const data = await collection
      .find({})
      .toArray()
      .catch((err) => {
        console.error(err);
        res.status(500).send("Internal server error");
      });

    console.log('mortalityData', data);
    res.json(data);

  });

  dataRouter.get("/life_expectancy", async function (req, res) {
    const { by = "region", type } = req.query;
    let collectionName = "";

    if (by === "region" && type === "healthy") {
      collectionName = "life_expectancy_birth_regions";
    } else if (by === "region" && type !== "healthy") {
      collectionName = "life_expectancy_60_regions";
    } else {
      res.status(400).send("Bad request");
      return;
    }
    const collection = db.collection(collectionName);
    
    const data = await collection
      .find({})
      .toArray()
      .catch((err) => {
        console.error(err);
        res.status(500).send("Internal server error");
      });

    console.log('lifeExpectancyData', data);
    res.json(data);

  });
}

run();

module.exports = dataRouter;
