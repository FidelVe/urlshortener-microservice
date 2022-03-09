// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const lib = require("./services/lib.js");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use("/public", express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/shorturl", (req, res) => {
  // validate the url, if is valid check if the url is already in the database
  // and reply with a json object showing the url and the index position inside
  // the database. If the url doesnt exists in the database add it and reply
  // with a json object showing the url and the index position inside the
  // database.
  //
  const inputData = req.body.url;
  console.log("method: ", req.method);
  console.log("body: ", req.body);
  let result = {
    original_url: null,
    short_url: null
  };
  const isValid = lib.isAddressValid(inputData);

  if (isValid === true) {
    // if the input is a valid url
    let db = lib.readDb();

    if (!db.URLS.includes(inputData)) {
      // if the url is not in the database, include it
      db.URLS.push(inputData);
      lib.writeDb(db);
    }
    result["original_url"] = inputData;
    result["short_url"] = db.URLS.indexOf(inputData);
    res.json(result);
  } else {
    // if the input is not a valid url
    res.json({ error: "Invalid URL" });
  }
});

app.get("/api/shorturl/:index", (req, res) => {
  // search if the ':index' exists in the database, if it exists
  // redirects the user to that webpage if not reply with an error
  //
  const index = Number(req.params.index);
  const db = lib.readDb();

  if (Number.isNaN(index)) {
    res.json({ error: "Wrong format" });
  } else {
    if (db.URLS.length - 1 < index) {
      // reply with error because the index doesnt exists in the database
      res.json({ error: "No short URL found for the given input" });
    }

    // redirect the user to the webpage
    let webpage = db.URLS[index];
    if (webpage.includes("https://") || webpage.includes("http://")) {
      // do nothing
    } else {
      // add 'https://' to the webpage string
      webpage = "https://" + webpage;
    }
    res.redirect(webpage);
  }
});

// Your first API endpoint
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
