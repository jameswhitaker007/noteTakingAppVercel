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

let noteToDelete;

function checkArray(item) {
    /*
    if (item !== noteToDelete) {
        return item;}*/
    return item !== noteToDelete;
}

router.post("/", function (req, res, next) {
  readFile(DB_PATH)
    .then((data) => {
        console.log(req.body.note);
        noteToDelete = req.body.note;
      let db = JSON.parse(data);
      const newArray = db.notes.filter(checkArray);
      db.notes = newArray;
      return db;
    })
    .then((db) => {
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
