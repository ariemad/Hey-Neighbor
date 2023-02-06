const fs = require("fs");
const path = require("path");
const { getImageName } = require("./getImageName");

let counter = 0;
exports.createImage = (
  placeholderFile,
  pathToPublic,
  pathAfterPublic,
  name
) => {
  //Search if there is a image with name, if not use placeholder
  let imageFile = getImageName(name);
  if (!imageFile) {
    imageFile = placeholderFile;
  }
  //File extension
  const extension = path.extname(imageFile);

  // create a timestamp
  const timestamp = new Date().getTime();

  // This path will be used to copy the image
  const newFile = path.join(
    pathToPublic,
    pathAfterPublic,
    `${timestamp}` + counter + extension
  );

  // This path will be saved on the database

  const dbFile = path.join(
    pathAfterPublic,
    `${timestamp}` + counter + extension
  );

  counter++;

  // read the contents of the original file
  fs.readFile(imageFile, (err, data) => {
    if (err) throw err;

    // write the contents to the new file
    fs.writeFile(newFile, data, (err) => {
      if (err) throw err;
    });
  });
  return "/" + dbFile;
};

/* for (let i = 0; i < 10; i++) {
  createPlaceHolderImage(
    "./e66f025d-470c-4aa4-83a9-b557bd7a4115.jpg",
    `../public/images`
  );
}
 */
