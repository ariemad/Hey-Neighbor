let async = require("async");
const { body, validationResult, check } = require("express-validator");

const Category = require("../models/Category");
const Item = require("../models/Item");

exports.itemDetail = (req, res, next) => {
  Item.findOne({ _id: req.params.id })
    .populate("category")
    .exec((err, data) => {
      if (err) {
        return next(err);
      }
      res.render("itemDetail", { item: data });
    });
};

exports.itemCreateGet = (req, res, next) => {
  async.parallel(
    {
      unitsDocuments(cb) {
        Item.aggregate([
          {
            $group: {
              _id: "$weight.unit",
            },
          },
        ]).exec(cb);
      },
      categoriesDocuments(cb) {
        Category.find({}).exec(cb);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      let units = [];
      for (const document of results.unitsDocuments) {
        units.push(document._id);
      }
      units = units.sort();

      let categories = [];
      for (const document of results.categoriesDocuments) {
        categories.push(document.name);
      }
      categories = categories.sort();
      res.render("itemCreateUpdate", {
        units: units,
        categories: categories,
        err: req.body.err,
      });
    }
  );
};

exports.itemCreatePost = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Please insert a name."),
  body("description")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Please insert a description of the item"),
  body("price")
    .isNumeric()
    .withMessage("Price should be a number")
    .trim()
    .escape(),
  body("quantity")
    .isNumeric()
    .withMessage("Quantity should be a number")
    .trim()
    .escape(),
  check("category").exists().withMessage("Please select a category"),
  check("unit").exists().withMessage("Please select a unit"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.body.err = errors.errors;
      console.log(req.body.err);
      return this.itemCreateGet(req, res, next);
    }
    let item = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      weight: {
        unit: req.body.unit,
        quantity: req.body.quantity,
      },
    };
    async.parallel(
      {
        unitsDocuments(cb) {
          Item.aggregate([
            {
              $group: {
                _id: "$weight.unit",
              },
            },
          ]).exec(cb);
        },
        categoriesDocuments(cb) {
          Category.find({}, { name: 1 }).exec(cb);
        },
      },
      async function (err, results) {
        if (err) {
          return next(err);
        }
        let possibleCategories = results.categoriesDocuments.map(
          (document) => document.name
        );
        let possibleUnits = results.unitsDocuments.map(
          (document) => document._id
        );

        if (!possibleCategories.find((document) => document == item.category)) {
          next("Category does't exist");
        }
        if (!possibleUnits.find((document) => document == item.weight.unit)) {
          next("Unit does't exist");
        }
        item.category = results.categoriesDocuments.find(
          (document) => document.name == item.category
        )._id;
        let newItem = new Item(item);
        await newItem.save();
        let foundItem = await Item.findById(newItem._id).populate("category");
        console.log(foundItem);
        res.redirect(foundItem.url);
      }
    );
  },
];

exports.itemDeleteGet = (req, res, next) => {
  Item.findOne({ _id: req.params.id })
    .populate("category")
    .exec((err, data) => {
      if (err) {
        return next(err);
      }
      res.render("itemDelete", { item: data });
    });
};

exports.itemDeletePost = (req, res, next) => {
  Item.findOne({ _id: req.params.id })
    .populate("category")
    .exec((err, data1) => {
      if (err) {
        return next(err);
      }
      Item.findByIdAndRemove({ _id: data1._id }, (err, data2) => {
        if (err) {
          return next(err);
        }
        res.redirect(`/${data1.category.name}`);
      });
    });
};

exports.itemUpdateGet = (req, res, next) => {
  async.parallel(
    {
      unitsDocuments(cb) {
        Item.aggregate([
          {
            $group: {
              _id: "$weight.unit",
            },
          },
        ]).exec(cb);
      },
      categoriesDocuments(cb) {
        Category.find({}).exec(cb);
      },
      item(cb) {
        Item.findOne({ _id: req.params.id }).populate("category").exec(cb);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      let units = [];
      for (const document of results.unitsDocuments) {
        units.push(document._id);
      }
      units = units.sort();

      let categories = [];
      for (const document of results.categoriesDocuments) {
        categories.push(document.name);
      }
      categories = categories.sort();
      console.log(results.item);
      res.render("itemCreateUpdate", {
        units: units,
        categories: categories,
        err: req.body.err,
        item: results.item,
      });
    }
  );
};

exports.itemUpdatePost = (req, res, next) => {
  res.send(
    "Under construction: Items item Update Post " +
      req.params.category +
      " " +
      req.params.id
  );
};
