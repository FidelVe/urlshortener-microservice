// lib.js
const dns = require("dns");
const customPath = require("./customPath.js");
const fs = require("fs");

const DB_PATH = "data/db.json";

function dbSchema() {
  return {
    URLS: []
  };
}

// Functions
function readDb() {
  if (fs.existsSync(customPath(DB_PATH))) {
    return JSON.parse(fs.readFileSync(customPath(DB_PATH)));
  } else {
    const db = dbSchema();
    writeDb(db);
    return db;
  }
}

function writeDb(db) {
  try {
    fs.writeFileSync(customPath(DB_PATH), JSON.stringify(db));
  } catch (err) {
    console.log("error: ", err);
    throw "FATAL ERROR WHILE WRITING TO DB";
  }
}

function promisifiedLookup(address) {
  return new Promise((resolve, reject) => {
    dns.lookup(address, (err, value) => {
      if (err) {
        reject(false);
      }
      resolve(true);
    });
  });
}

async function isAddressValid(address) {
  let result = null;
  console.log(`\nrunning lookup on ${address}...`);
  try {
    result = await promisifiedLookup(address);
  } catch (err) {
    console.log("error running lookup: ", err);
    result = false;
  }
  return result;
}

module.exports = {
  isAddressValid: isAddressValid,
  readDb: readDb,
  writeDb: writeDb
};
