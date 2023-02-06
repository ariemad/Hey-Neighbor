#! /usr/bin/env node

console.log(
  "\nThis script populates some categories and items. Specify database as argument - e.g.:"
);
console.log(
  "populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith("mongodb")) {
  console.log(
    "ERROR: You need to specify a valid mongodb URL as the first argument"
  );
  return;
}

var async = require("async");
var Category = require("../models/Category");
var Item = require("../models/Item");

var mongoose = require("mongoose");
const { createImage } = require("./createImage");
var mongoDB = userArgs[0];

mongoose.set("strictQuery", false);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

let categories = [];
let items = [];

let imagePlaceholder = "./assets/item_categories/Placeholder.jpg";
let pathToPublic = "../public/";
let pathAfterPublic = "./images/";

function categoryCreate(name, description, cb) {
  let imageLocation = createImage(
    imagePlaceholder,
    pathToPublic,
    pathAfterPublic,
    name
  );

  let categoryDetail = {
    name: name,
    description: description,
    imageLocation: imageLocation,
  };

  let category = new Category(categoryDetail);

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Category: " + category);
    categories.push(category);
    cb(null, category);
  });
}

function itemCreate(
  name,
  description,
  category,
  price,
  weightQuantity,
  weightUnit,
  cb
) {
  let imageLocation = createImage(
    imagePlaceholder,
    pathToPublic,
    pathAfterPublic,
    name
  );

  let itemDetail = {
    name: name,
    description: description,
    category: category,
    price: price,
    weight: { quantity: weightQuantity, unit: weightUnit },
    imageLocation: imageLocation,
  };

  let item = new Item(itemDetail);

  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Item: " + item);
    items.push(item);
    cb(null, item);
  });
}

function createCategories(cb) {
  async.series(
    [
      function (callback) {
        categoryCreate(
          "Meat",
          "Occaecat pariatur est officia exercitation cupidatat ad amet laboris adipisicing ea pariatur ipsum veniam.",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Fish",
          "Occaecat pariatur est officia exercitation cupidatat ad amet laboris adipisicing ea pariatur ipsum veniam.",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Bakery",
          "Occaecat pariatur est officia exercitation cupidatat ad amet laboris adipisicing ea pariatur ipsum veniam.",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Water and Juices",
          "Occaecat pariatur est officia exercitation cupidatat ad amet laboris adipisicing ea pariatur ipsum veniam.",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Beer and Wine",
          "Occaecat pariatur est officia exercitation cupidatat ad amet laboris adipisicing ea pariatur ipsum veniam.",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Vegetables",
          "Occaecat pariatur est officia exercitation cupidatat ad amet laboris adipisicing ea pariatur ipsum veniam.",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createItemsMeat(cb) {
  async.parallel(
    [
      function (callback) {
        itemCreate(
          "MeatBalls",
          "Nisi ipsum aute non laborum consequat.",
          categories[0],
          4,
          0.4,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Boneless chicken Thighs",
          "Nisi ipsum aute non laborum consequat.",
          categories[0],
          2.5,
          0.5,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Beef Steak",
          "Nisi ipsum aute non laborum consequat.",
          categories[0],
          2,
          0.25,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Pork Belly Slices",
          "Nisi ipsum aute non laborum consequat.",
          categories[0],
          5,
          0.5,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Pork Ribs",
          "Nisi ipsum aute non laborum consequat.",
          categories[0],
          5,
          0.7,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Chicken Breasts",
          "Nisi ipsum aute non laborum consequat.",
          categories[0],
          2,
          0.45,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "German Style Salami",
          "Nisi ipsum aute non laborum consequat.",
          categories[0],
          0.92,
          0.1,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Prosciutto with Herbs",
          "Nisi ipsum aute non laborum consequat.",
          categories[0],
          2.35,
          0.1,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Spanish Chorizo Ring",
          "Nisi ipsum aute non laborum consequat.",
          categories[0],
          2.5,
          0.1,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Finest Mortadella Slices",
          "Nisi ipsum aute non laborum consequat.",
          categories[0],
          2.35,
          0.1,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Serrano Ham",
          "Nisi ipsum aute non laborum consequat.",
          categories[0],
          1.27,
          0.08,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Cheese and Serrano Rolls",
          "Nisi ipsum aute non laborum consequat.",
          categories[0],
          2.65,
          0.09,
          "Kg",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}
function createItemsFish(cb) {
  async.parallel(
    [
      function (callback) {
        itemCreate(
          "Salmon",
          "Nisi ipsum aute non laborum consequat.",
          categories[1],
          5,
          0.25,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "5 Cod Fish Fillets",
          "Nisi ipsum aute non laborum consequat.",
          categories[1],
          3.5,
          0.4,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Lamprey",
          "Nisi ipsum aute non laborum consequat.",
          categories[1],
          10,
          0.2,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "5 White Fish Fillets",
          "Nisi ipsum aute non laborum consequat.",
          categories[1],
          3,
          0.5,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Jumbo King Prawns",
          "Nisi ipsum aute non laborum consequat.",
          categories[1],
          7,
          0.15,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Lightly Dusted Haddock Fillets",
          "Nisi ipsum aute non laborum consequat.",
          categories[1],
          3.75,
          0.255,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Tuna",
          "Nisi ipsum aute non laborum consequat.",
          categories[1],
          11.99,
          1,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Sole",
          "Nisi ipsum aute non laborum consequat.",
          categories[1],
          4.8,
          0.265,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Sardines in Sunflower Oil",
          "Nisi ipsum aute non laborum consequat.",
          categories[1],
          0.5,
          0.12,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Trout fillets",
          "Nisi ipsum aute non laborum consequat.",
          categories[1],
          0.51,
          0.24,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Smoked Haddock Fillets",
          "Nisi ipsum aute non laborum consequat.",
          categories[1],
          4,
          0.4,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Scottish Mackerel",
          "Nisi ipsum aute non laborum consequat.",
          categories[1],
          0.85,
          0.1,
          "Kg",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}
function createItemsBakery(cb) {
  async.parallel(
    [
      function (callback) {
        itemCreate(
          "Bread With Ham",
          "Nisi ipsum aute non laborum consequat.",
          categories[2],
          1.1,
          1,
          "Unit",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Milk Bread",
          "Nisi ipsum aute non laborum consequat.",
          categories[2],
          7.5,
          1,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Sliced Bread",
          "Nisi ipsum aute non laborum consequat.",
          categories[2],
          2.4,
          0.8,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Cinnamon Rolls",
          "Nisi ipsum aute non laborum consequat.",
          categories[2],
          2.7,
          1,
          "Unit",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Chocolate Muffins",
          "Nisi ipsum aute non laborum consequat.",
          categories[2],
          0.5,
          1,
          "Unit",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Blueberry Muffins",
          "Nisi ipsum aute non laborum consequat.",
          categories[2],
          0.6,
          1,
          "Unit",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Croissants",
          "Nisi ipsum aute non laborum consequat.",
          categories[2],
          2.1,
          4,
          "Unit",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Chocolate Chip Cookies",
          "Nisi ipsum aute non laborum consequat.",
          categories[2],
          3,
          0.4,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Apple Pie",
          "Nisi ipsum aute non laborum consequat.",
          categories[2],
          3.85,
          0.55,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Raisin Bread",
          "Nisi ipsum aute non laborum consequat.",
          categories[2],
          2.15,
          5,
          "Unit",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Banana Bread",
          "Nisi ipsum aute non laborum consequat.",
          categories[2],
          3,
          0.25,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Doughnut",
          "Nisi ipsum aute non laborum consequat.",
          categories[2],
          1.25,
          1,
          "Unit",
          callback
        );
      },
    ],

    // optional callback
    cb
  );
}
function createItemsWater(cb) {
  async.parallel(
    [
      function (callback) {
        itemCreate(
          "Water 6 x 1,5 Litre",
          "Nisi ipsum aute non laborum consequat.",
          categories[3],
          4,
          9,
          "Litre",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Water 5 Litre",
          "Nisi ipsum aute non laborum consequat.",
          categories[3],
          2,
          5,
          "Litre",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Strawberry Flavoured Water 6 x 0,3 Litre",
          "Nisi ipsum aute non laborum consequat.",
          categories[3],
          3,
          1.8,
          "Litre",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Orange Juice",
          "Nisi ipsum aute non laborum consequat.",
          categories[3],
          2.5,
          1,
          "Litre",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Apple Juice",
          "Nisi ipsum aute non laborum consequat.",
          categories[3],
          3,
          1.35,
          "Litre",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Soda 6 x 0,3",
          "Nisi ipsum aute non laborum consequat.",
          categories[3],
          2.5,
          1.8,
          "Litre",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Iced Tea",
          "Nisi ipsum aute non laborum consequat.",
          categories[3],
          1.25,
          0.1,
          "Litre",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Energy Drink 6 x 0,3",
          "Nisi ipsum aute non laborum consequat.",
          categories[3],
          2.5,
          1.3,
          "Litre",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Cranberry Juice",
          "Nisi ipsum aute non laborum consequat.",
          categories[3],
          1,
          1,
          "Litre",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Pineapple Juice",
          "Nisi ipsum aute non laborum consequat.",
          categories[3],
          1.3,
          1,
          "Litre",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Grape Juice",
          "Nisi ipsum aute non laborum consequat.",
          categories[3],
          1.6,
          1,
          "Litre",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Mango Juice",
          "Nisi ipsum aute non laborum consequat.",
          categories[3],
          1.4,
          1.5,
          "Litre",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}
function createItemsWine(cb) {
  async.parallel(
    [
      function (callback) {
        itemCreate(
          "Sauvignon Blanc",
          "Nisi ipsum aute non laborum consequat.",
          categories[4],
          10,
          0.75,
          "Litre",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Marseile Red Wine",
          "Nisi ipsum aute non laborum consequat.",
          categories[4],
          9,
          0.75,
          "Litre",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Rose Wine",
          "Nisi ipsum aute non laborum consequat.",
          categories[4],
          5,
          0.75,
          "Litre",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Italico Red Wine",
          "Nisi ipsum aute non laborum consequat.",
          categories[4],
          3,
          1,
          "Litre",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Island White Wine",
          "Nisi ipsum aute non laborum consequat.",
          categories[4],
          5,
          0.75,
          "Litre",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Prestige Red Wine",
          "Nisi ipsum aute non laborum consequat.",
          categories[4],
          4,
          0.75,
          "Litre",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Budweiser",
          "Nisi ipsum aute non laborum consequat.",
          categories[4],
          2.2,
          0.66,
          "Litre",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Heineken",
          "Nisi ipsum aute non laborum consequat.",
          categories[4],
          2.4,
          0.65,
          "Litre",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Pilsner Urquell",
          "Nisi ipsum aute non laborum consequat.",
          categories[4],
          1.1,
          0.33,
          "Litre",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Stella Artois",
          "Nisi ipsum aute non laborum consequat.",
          categories[4],
          1.1,
          0.62,
          "Litre",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Corona Extra",
          "Nisi ipsum aute non laborum consequat.",
          categories[4],
          0.9,
          0.33,
          "Litre",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Guinness Stout",
          "Nisi ipsum aute non laborum consequat.",
          categories[4],
          3.35,
          0.6,
          "Litre",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}
function createItemsVegetables(cb) {
  async.parallel(
    [
      function (callback) {
        itemCreate(
          "Carrot",
          "Nisi ipsum aute non laborum consequat.",
          categories[5],
          4,
          1,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Cauliflower",
          "Nisi ipsum aute non laborum consequat.",
          categories[5],
          0.95,
          1,
          "Unit",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Leeks",
          "Nisi ipsum aute non laborum consequat.",
          categories[5],
          1.19,
          0.5,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Large Potatoes",
          "Nisi ipsum aute non laborum consequat.",
          categories[5],
          0.8,
          1,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Red Potatoes",
          "Nisi ipsum aute non laborum consequat.",
          categories[5],
          2.3,
          2,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Brown Onions",
          "Nisi ipsum aute non laborum consequat.",
          categories[5],
          0.15,
          1,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Tomatoes",
          "Nisi ipsum aute non laborum consequat.",
          categories[5],
          1.75,
          1,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Iceberg Lettuce",
          "Nisi ipsum aute non laborum consequat.",
          categories[5],
          0.65,
          1,
          "Unit",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Red Pepper",
          "Nisi ipsum aute non laborum consequat.",
          categories[5],
          0.5,
          1,
          "Unit",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Brocoli",
          "Nisi ipsum aute non laborum consequat.",
          categories[5],
          0.69,
          1,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Spinach",
          "Nisi ipsum aute non laborum consequat.",
          categories[5],
          1,
          1,
          "Kg",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Sweet Potatoes",
          "Nisi ipsum aute non laborum consequat.",
          categories[5],
          1.35,
          1,
          "Kg",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [
    createCategories,
    createItemsMeat,
    createItemsFish,
    createItemsBakery,
    createItemsWater,
    createItemsWine,
    createItemsVegetables,
  ],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Result: " + results);
    }

    mongoose.connection.close(() => {
      console.log("MongoDB connection closed");
    });
  }
);
