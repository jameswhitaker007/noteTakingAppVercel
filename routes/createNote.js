var express = require("express");
var router = express.Router();
var fs = require("fs").promises;
const DB_PATH = "./database/db.json";

async function readFile(filePath) {
  try {
    const data = await fs.readFile(DB_PATH);
    return data;
  } catch (err) {
    console.err(`Got an error trying to read the file: ${err.message}`);
  }
}

router.post("/", function (req, res, next) {
  readFile(DB_PATH)
    .then((data) => {
      let db = JSON.parse(data);
      db.notes.push(req.body.note);
      return db;
    })
    .then((db) => {
      JSON.stringify(db);
      fs.writeFile(
        DB_PATH,
        JSON.stringify(db),
        {
          encoding: "utf-8",
        },
        (err) => {
          if (err) console.error(err);
          else console.log("File written successfully");
        }
      );
    });
});

module.exports = router;
