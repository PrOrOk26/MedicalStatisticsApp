const fs = require("fs");

exports.readJsonFileAsync = function (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      let student = JSON.parse(data);
      resolve(student)
    });
  });
};
