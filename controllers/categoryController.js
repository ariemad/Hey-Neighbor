const async = require("async");

const Category = require("../models/Category");
const Item = require("../models/Item");

exports.categoryCatalog = async (req, res, next) => {
  let data = await Category.find({})
    .sort({ name: 1 })
    .catch((err) => next(err));
  res.render("index", { categories: data });
};

exports.categoryDetail = async (req, res, next) => {
  let category = await Category.findOne({ name: req.params.category }).catch(
    (err) => next(err)
  );
  if (category == null) return next(new Error("Category does not exist"));
  let listItems = await Item.find({ category: category._id }).catch((err) =>
    next(err)
  );
  res.render("category", { title: req.params.category, items: listItems });
};
