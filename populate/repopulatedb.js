#! /usr/bin/env node

var userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith("mongodb")) {
  console.log(
    "ERROR: You need to specify a valid mongodb URL as the first argument"
  );
  return;
}

var mongoDB = userArgs[0];

const { exec } = require("child_process");
const fs = require("fs");

//MongoDB connection

var mongoose = require("mongoose");
const { createPlaceHolderImage } = require("./createPlaceHolderImage");
var mongoDB = userArgs[0];

mongoose.set("strictQuery", false);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const repopulateDB = async () => {
  // Depopulate

  let folder = "../public/images";
  fs.readdir(folder, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(`${folder}/${file}`, (err) => {
        if (err) throw err;
      });
    }
  });

  await db.dropCollection("categories");
  await db.dropCollection("items");

  // Populate

  exec(`./populatedb.js ${mongoDB}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
};

repopulateDB();
