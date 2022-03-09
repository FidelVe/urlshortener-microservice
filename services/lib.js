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
  console.log(`reading database at path: ${customPath(DB_PATH)}`);
  try {
    if (fs.existsSync(customPath(DB_PATH))) {
      return JSON.parse(fs.readFileSync(customPath(DB_PATH)));
    } else {
      const db = dbSchema();
      writeDb(db);
      return db;
    }
  } catch (err) {
    console.log(`error trying to read database at ${customPath(DB_PATH)}`);
    console.log(err);
    throw "FATAL ERROR WHILE READING DB";
  }
}

function writeDb(db) {
  console.log(`writing database at path: ${customPath(DB_PATH)}`);
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

function isAddressValid(address) {
  const protocols = ["http", "https", "ftp", "HTTP", "HTTPS", "FTP"];
  let addressToCheck = address;
  let startsWithValidProtocol = false;
  try {
    for (let protocol of protocols) {
      if (addressToCheck.startsWith(protocol)) {
        startsWithValidProtocol = true;
        break;
      }
    }

    if (!startsWithValidProtocol) {
      addressToCheck = "https://" + addressToCheck;
    }
    console.log(`checking input ${addressToCheck}`);
    let myURL = new URL(addressToCheck);
    if (myURL.protocol === "http:" || myURL.protocol === "http:") {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(`error: ${address} is not a valid address`, err);
    return false;
  }
}
module.exports = {
  isAddressValid: isAddressValid,
  readDb: readDb,
  writeDb: writeDb
};
