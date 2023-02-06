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

let imagePlaceholder = "./populate/assets/item_categories/Placeholder.jpg";
let pathToPublic = "./public/";
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
          "Tender and juicy meatballs made from beef and spices, perfect for pasta dishes or as a snack.",
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
          "Moist and flavorful boneless chicken thighs, perfect for grilling or stir-frying.",
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
          "Juicy and rich beef steaks, ideal for grilling or pan-frying.",
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
          "Crispy and savory pork belly slices, great for roasting or grilling.",
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
          "Tender and succulent pork ribs, ideal for slow cooking or grilling.",
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
          "Juicy and versatile chicken breasts, perfect for baking or grilling.",
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
          "Hearty and spicy German style salami, perfect for snacking or sandwiches.",
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
          "Aromatic prosciutto with herbs, great for antipasti or sandwiches.",
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
          "Bold and smoky Spanish chorizo ring, ideal for cooking or snacking.",
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
          "Delicate and flavorful finest mortadella slices, perfect for sandwiches or charcuterie boards.",
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
          "Salt-cured and slightly spicy Serrano ham, ideal for antipasti or sandwiches.",
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
          "Cheesy and savory Serrano rolls, perfect for snacking or appetizers.",
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
          "Rich and flavorful salmon, perfect for grilling or baking.",
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
          "Mild and delicate cod fish fillets, ideal for pan-frying or baking.",
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
          "Nutty and full-flavored lamprey, great for grilling or broiling.",
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
          "Mild and flaky white fish fillets, perfect for baking or pan-frying.",
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
          "Jumbo-sized and succulent king prawns, ideal for grilling or stir-frying.",
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
          "Lightly dusted and crispy haddock fillets, perfect for baking or pan-frying.",
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
          "Flavorful and meaty tuna, ideal for grilling or baking.",
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
          "Delicate and flaky sole, perfect for pan-frying or baking.",
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
          "Savory and slightly smoky sardines in sunflower oil, great for snacking or on sandwiches.",
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
          "Nutty and flavorful trout fillets, ideal for grilling or pan-frying.",
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
          "Smoky and rich smoked haddock fillets, perfect for baking or poaching.",
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
          "Flavorful and oily Scottish mackerel, great for grilling or baking.",
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
          "Delicious and savory bread with ham, perfect for sandwiches or toasting.",
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
          "Soft and fluffy milk bread, great for toast or sandwiches.",
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
          "Convenient and versatile sliced bread, ideal for sandwiches or toast.",
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
          "Sweet and spicy cinnamon rolls, perfect for breakfast or snacking.",
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
          "Decadent and chocolatey muffins, great for breakfast or snacking.",
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
          "Sweet and fruity blueberry muffins, perfect for breakfast or snacking.",
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
          "Flaky and buttery croissants, ideal for breakfast or snacking.",
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
          "Chewy and chocolatey chocolate chip cookies, great for snacking or dessert.",
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
          "Sweet and flaky apple pie, perfect for dessert or snacking.",
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
          "Sweet and fruity raisin bread, great for toast or sandwiches.",
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
          "Moist and banana-flavored banana bread, perfect for breakfast or snacking.",
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
          "Sweet and fried doughnut, ideal for breakfast or snacking.",
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
          "Convenient and hydrating water, available in 6 x 1.5-liter bottles.",
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
          "Large 5-liter bottle of water.",
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
          "Refreshing 6 pack of 0.3-liter strawberry flavored water.",
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
          "Sweet and tangy orange juice, perfect for breakfast or snacking.",
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
          "Crisp and refreshing apple juice, ideal for breakfast or snacking.",
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
          "Variety pack of 6 cans of soda in 0.3 liters.",
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
          "Refreshing and flavorful iced tea, great for warm weather.",
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
          "Energizing 6 pack of 0.3-liter energy drinks.",
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
          "Tart and slightly sweet cranberry juice, great for cocktails or snacking.",
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
          "Sweet and tropical pineapple juice, perfect for breakfast or cocktails.",
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
          "Sweet and fruity grape juice, great for breakfast or snacking.",
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
          "Sweet and juicy mango juice, perfect for breakfast or snacking",
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
          "A white wine variety known for its crisp and refreshing taste, often with notes of citrus and green apple. Usually served with seafood, salads or light summer fare.",
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
          "A bold and full-bodied red wine that is typically made from a blend of red grape varieties grown in the Marseille region of France. Best paired with meat-based dishes.",
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
          "A light and refreshing wine that is typically made from a blend of red and white grapes. It has a light, crisp and fruity taste, often with notes of strawberry and watermelon. Ideal for summer or lighter fare.",
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
          "A bold and robust red wine that is typically made from Italian grape varieties grown in the Italico region. Ideal for hearty meals and strong flavors.",
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
          "A light and crisp white wine made from grapes grown on islands, known for its bright, citrusy flavor and minerality. Best paired with seafood or salads.",
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
          "A rich and full-bodied wine, often made from a blend of premium red grape varieties. Ideal for special occasions or to impress guests.",
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
          "A classic American lager beer that is known for its smooth and refreshing taste. Budweiser is one of the largest and most widely recognized beer brands in the world.",
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
          "A popular Dutch lager beer that is known for its mild and hoppy taste. Heineken is widely available in many countries and is a popular choice for casual drinkers.",
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
          "A Czech pilsner beer that is known for its crisp and refreshing taste. Pilsner Urquell is considered to be the original pilsner beer and has been brewed in the Czech Republic since the 19th century.",
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
          "A Belgian pilsner beer that is known for its crisp and slightly bitter taste. Stella Artois is widely available in many countries and is a popular choice for casual drinkers.",
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
          "A Mexican lager beer that is known for its light and crisp taste. Corona Extra is often served with a wedge of lime and is a popular choice for warm weather or beach-themed occasions.",
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
          "A dark and creamy Irish stout beer that is known for its rich and smooth taste. Guinness is one of the world's most famous stout beers and is widely recognized for its iconic black and white label.",
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
          "Fresh, crisp and sweet, a staple in many recipes.",
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
          "A versatile, cruciferous vegetable that's low in calories and high in nutrients.",
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
          "A mild-flavored onion that's great for soups, stews and sauces.",
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
          "A staple in many kitchens, good for roasting, mashing and more.",
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
          "Waxy skin and flesh, great for boiling and making salads.",
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
          "A staple ingredient in many recipes, adds depth and flavor to dishes.",
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
          "Perfectly ripe, juicy and sweet, adds a pop of color to any meal.",
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
          "Crisp, refreshing, and low calorie, great for salads or sandwiches.",
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
          "Sweet, juicy, and full of vitamin C, great for grilling or roasting.",
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
          "A nutrient-packed, cruciferous vegetable that's low in calories and high in fiber.",
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
          "A dark, leafy green that's packed with vitamins and minerals, great for salads or smoothies.",
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
          "A starchy root vegetable, great for roasting or mashing, high in fiber and vitamins.",
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
