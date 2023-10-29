var express = require("express");
var router = express.Router();
var fs = require("fs").promises;
const DB_PATH = "./database/db.json";

async function getFile(filePath) {
  try {
    const data = await fs.readFile(DB_PATH);
    //console.log(data);
    return data;
  } catch (err) {
    console.err(`Got an error trying to read the file: ${err.message}`);
  }
}

router.get("/", function (req, res, next) {
  getFile(DB_PATH).then(function (data) {
    res.json(JSON.parse(data));
  });
});

module.exports = router;
