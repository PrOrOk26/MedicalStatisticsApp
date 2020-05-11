const path       = require('path'),
      express    = require("express"),
      app        = express(),
      port       = 2699,
      dataRouter = require("./routers/data.js"),
      cors       = require('cors');

var corsOptions = {
  origin: 'http://localhost:8080/',
  optionsSuccessStatus: 200,
}

const clientBuildPath                  = '../client/dist',
      { uri, dbName, collectionNames } = require("./constants.js");

/* const mongoose = require("mongoose");
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const dbConnection = mongoose.connection;
dbConnection.on("error", console.error.bind(console, "connection error"));
dbConnection.once("open", function () {
  console.log("Mongoose connected to our cloud db");
}); */

app.use(cors());

app.use(express.static(path.join(__dirname, clientBuildPath)));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, clientBuildPath, 'index.html'));
});

app.use("/data", dataRouter);

app.get("*", function (req, res) {
  res.status(400).send("Bad Request");
});

app.listen(port, () =>
  console.log(`MedicalStatisticsApp app listening at http://localhost:${port}`)
);
