const readJsonFileAsync = require("./utils/readJsonFileAsync.js")
  .readJsonFileAsync;
const MongoClient = require("mongodb").MongoClient;
const uri = `
  mongodb+srv://prorok26:prorok26@clusterbasic-fmzrp.mongodb.net/test
    ?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true
`;

const dbName = "aids";

const client = new MongoClient(uri);

exports.initDatabase = async function () {
  try {
    await client.connect();
    console.log("Connected correctly to server");

    const db = client.db(dbName);

    const colRegions = db.collection("regions");
    const colCountries = db.collection("countries");

    const aidsRegions = await readJsonFileAsync("./data/aids_hiv_regions.json");
    const aidsCountries = await readJsonFileAsync("./data/aids_hiv_countries.json");

    const dataRegions = await colRegions.insertMany(aidsRegions.regions);
    const dataCountries = await colCountries.insertMany(
      aidsCountries.countries
    );
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
};
