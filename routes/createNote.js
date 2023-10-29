var express = require("express");
var router = express.Router();
var fs = require("fs").promises;
const DB_PATH = "./database/db.json";

async function readFile(filePath) {
  try {
    const data = await fs.readFile(DB_PATH);
    return data;
    //console.log(data.toString());
  } catch (err) {
    console.err(`Got an error trying to read the file: ${err.message}`);
  }
}

function saveDB(data) {
  try {
    console.log(data);
    //fs.writeFile(DB_PATH, JSON.stringify(data));
  } catch (err) {
    console.err(`Got an error trying to save the file: ${err.message}`);
  }
}

router.post("/", function (req, res, next) {
  console.log(readFile(DB_PATH));
  readFile(DB_PATH)
    .then((data) => {
      let db = JSON.parse(data);
      console.log(db);
      db.notes.push(req.body.note);
      console.log(db.notes);
      console.log(db);
      return db;
    })
    .then((db) => {
      console.log(db);
      JSON.stringify(db);
      console.log(db);
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
