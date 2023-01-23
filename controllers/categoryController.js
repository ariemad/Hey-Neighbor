const async = require("async");

const Category = require("../models/Category");
const Item = require("../models/Item");

exports.categoryCatalog = async (req, res, next) => {
  let data = await Category.find({})
    .sort({ name: 1 })
    .catch((err) => next(err));
  res.render("index", { categories: data });
};

exports.categoryDetail = (req, res, next) => {
  Category.findOne({ name: req.params.category }).exec((err, data) => {
    if (err) {
      next(err);
    }
    if (data == null) {
      next(new Error("Category does not exist"));
    } else {
      Item.find({ category: data._id })
        .populate("category")
        .exec((err, data) => {
          if (err) {
            next(err);
          }
          res.render("category", { title: req.params.category, items: data });
        });
    }
  });
};
