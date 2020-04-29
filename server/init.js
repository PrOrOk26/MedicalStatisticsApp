const readJsonFileAsync = require("./utils/readJsonFileAsync.js")
  .readJsonFileAsync;

const { dbName, collectionNames, uri } = require("./constants.js");
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(uri);

module.exports.initDatabase = async function () {
  try {
    await client.connect();
    console.log("Connected correctly to server");

    const db = client.db(dbName);

    for (const [name, { path, attribute = "data" }] of collectionNames) {
      const collection = db.collection(name);
      const data = await readJsonFileAsync(path);
      const insertedData = await collection.insertMany(data[attribute]);
    }
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
};
