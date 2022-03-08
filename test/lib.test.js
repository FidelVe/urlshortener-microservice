// lib.test.js
const lib = require("../services/lib.js");

const VALUES = [
  "google.com",
  "youtube.com",
  "www.reddit.com",
  "https://www.google.com",
  "https://google.com",
  "1234",
  "qqq.notASite.NotADomain"
];

async function runTests(values) {
  for (let address of values) {
    const result = await lib.isAddressValid(address);

    console.log(`address ${address}. Is valid: ${result}`);
  }
}

runTests(VALUES);
