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
var Category = require("./models/Category");
var Item = require("./models/Item");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];

mongoose.set("strictQuery", false);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

let categories = [];
let items = [];

function categoryCreate(name, description, cb) {
  let categoryDetail = { name: name, description: description };

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
  let itemDetail = {
    name: name,
    description: description,
    category: category,
    price: price,
    weight: { quantity: weightQuantity, unit: weightUnit },
  };

  let item = new Item(itemDetail);

  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Item: " + item);
    items.push(item);
    // cb(null, item);
  });
}

function createCategories(cb) {
  async.parallel(
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
          "Wine",
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
          "Kg"
        );
      },
      function (callback) {
        itemCreate(
          "Boneless chicken Thighs",
          "Nisi ipsum aute non laborum consequat.",
          categories[0],
          2.5,
          0.5,
          "Kg"
        );
      },
      function (callback) {
        itemCreate(
          "Beef Steak",
          "Nisi ipsum aute non laborum consequat.",
          categories[0],
          2,
          0.25,
          "Kg"
        );
      },
      function (callback) {
        itemCreate(
          "Pork Belly Slices",
          "Nisi ipsum aute non laborum consequat.",
          categories[0],
          5,
          0.5,
          "Kg"
        );
      },
      function (callback) {
        itemCreate(
          "Pork Ribs",
          "Nisi ipsum aute non laborum consequat.",
          categories[0],
          5,
          0.7,
          "Kg"
        );
      },
      function (callback) {
        itemCreate(
          "Chicken Breasts",
          "Nisi ipsum aute non laborum consequat.",
          categories[0],
          2,
          0.45,
          "Kg"
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
          "Kg"
        );
      },
      function (callback) {
        itemCreate(
          "5 Cod Fish Fillets",
          "Nisi ipsum aute non laborum consequat.",
          categories[1],
          3.5,
          0.4,
          "Kg"
        );
      },
      function (callback) {
        itemCreate(
          "Lamprey",
          "Nisi ipsum aute non laborum consequat.",
          categories[1],
          10,
          0.2,
          "Kg"
        );
      },
      function (callback) {
        itemCreate(
          "5 White Fish Fillets",
          "Nisi ipsum aute non laborum consequat.",
          categories[1],
          3,
          0.5,
          "Kg"
        );
      },
      function (callback) {
        itemCreate(
          "Jumbo King Prawns",
          "Nisi ipsum aute non laborum consequat.",
          categories[1],
          7,
          0.15,
          "Kg"
        );
      },
      function (callback) {
        itemCreate(
          "Lightly Dusted Haddock Fillets",
          "Nisi ipsum aute non laborum consequat.",
          categories[1],
          3.75,
          0.255,
          "Kg"
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
          "Unit"
        );
      },
      function (callback) {
        itemCreate(
          "Milk Bread",
          "Nisi ipsum aute non laborum consequat.",
          categories[2],
          7.5,
          1,
          "Kg"
        );
      },
      function (callback) {
        itemCreate(
          "Sliced Bread",
          "Nisi ipsum aute non laborum consequat.",
          categories[2],
          2.4,
          0.8,
          "Kg"
        );
      },
      function (callback) {
        itemCreate(
          "Cinnamon Rolls",
          "Nisi ipsum aute non laborum consequat.",
          categories[2],
          2.7,
          1,
          "Unit"
        );
      },
      function (callback) {
        itemCreate(
          "Chocolate Muffins",
          "Nisi ipsum aute non laborum consequat.",
          categories[2],
          0.5,
          1,
          "Unit"
        );
      },
      function (callback) {
        itemCreate(
          "Blueberry Muffins",
          "Nisi ipsum aute non laborum consequat.",
          categories[2],
          0.6,
          1,
          "Unit"
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
          "Water 6 x 1.5 Litre",
          "Nisi ipsum aute non laborum consequat.",
          categories[3],
          4,
          9,
          "Litre"
        );
      },
      function (callback) {
        itemCreate(
          "Water 5 Litre",
          "Nisi ipsum aute non laborum consequat.",
          categories[3],
          2,
          5,
          "Litre"
        );
      },
      function (callback) {
        itemCreate(
          "Strawberry Flavoured Water 6 x 0.3 Litre",
          "Nisi ipsum aute non laborum consequat.",
          categories[3],
          3,
          1.8,
          "Litre"
        );
      },
      function (callback) {
        itemCreate(
          "Orange Juice",
          "Nisi ipsum aute non laborum consequat.",
          categories[3],
          2.5,
          1,
          "Litre"
        );
      },
      function (callback) {
        itemCreate(
          "Apple Juice",
          "Nisi ipsum aute non laborum consequat.",
          categories[3],
          3,
          1.35,
          "Litre"
        );
      },
      function (callback) {
        itemCreate(
          "Soda 6 x 0.3",
          "Nisi ipsum aute non laborum consequat.",
          categories[3],
          2.5,
          1.8,
          "Litre"
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
          "Litre"
        );
      },
      function (callback) {
        itemCreate(
          "Marseile Red Wine",
          "Nisi ipsum aute non laborum consequat.",
          categories[4],
          9,
          0.75,
          "Litre"
        );
      },
      function (callback) {
        itemCreate(
          "Rose Wine",
          "Nisi ipsum aute non laborum consequat.",
          categories[4],
          5,
          0.75,
          "Litre"
        );
      },
      function (callback) {
        itemCreate(
          "Italico Red Wine",
          "Nisi ipsum aute non laborum consequat.",
          categories[4],
          3,
          1,
          "Litre"
        );
      },
      function (callback) {
        itemCreate(
          "Island White Wine",
          "Nisi ipsum aute non laborum consequat.",
          categories[4],
          5,
          0.75,
          "Litre"
        );
      },
      function (callback) {
        itemCreate(
          "Prestige Red Wine",
          "Nisi ipsum aute non laborum consequat.",
          categories[4],
          4,
          0.75,
          "Litre"
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
          "Kg"
        );
      },
      function (callback) {
        itemCreate(
          "Cauliflower",
          "Nisi ipsum aute non laborum consequat.",
          categories[5],
          0.95,
          1,
          "Unit"
        );
      },
      function (callback) {
        itemCreate(
          "Leeks",
          "Nisi ipsum aute non laborum consequat.",
          categories[5],
          1.19,
          0.5,
          "Kg"
        );
      },
      function (callback) {
        itemCreate(
          "Large Potatoes",
          "Nisi ipsum aute non laborum consequat.",
          categories[5],
          0.8,
          1,
          "Kg"
        );
      },
      function (callback) {
        itemCreate(
          "Red Potatoes",
          "Nisi ipsum aute non laborum consequat.",
          categories[5],
          2.3,
          2,
          "Kg"
        );
      },
      function (callback) {
        itemCreate(
          "Brown Onions",
          "Nisi ipsum aute non laborum consequat.",
          categories[5],
          0.15,
          1,
          "Kg"
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
      console.log("Result: " + error);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
