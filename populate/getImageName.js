const fs = require("fs");
const path = require("path");

let folderPath = "./assets/item_categories";

exports.getImageName = (name) => {
  let files = fs.readdirSync(folderPath);
  for (const file of files) {
    console.log(file);
    let filename = file.split(".")[0];
    if (filename == name) {
      return path.join(folderPath, file);
    }
  }
  return false;
};
