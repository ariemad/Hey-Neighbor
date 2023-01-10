let express = require("express");
let async = require("async");

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
      res.render("itemCreate", {
        units: units,
        categories: categories,
      });
    }
  );
};

exports.itemCreatePost = (req, res, next) => {
  res.send(req.params + "itemCreatePost");
};

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
  res.render("itemUpdate", {
    title: `Update: ${req.params.category} ${req.params.id}`,
  });
};

exports.itemUpdatePost = (req, res, next) => {
  res.send(
    "Under construction: Items item Update Post " +
      req.params.category +
      " " +
      req.params.id
  );
};
