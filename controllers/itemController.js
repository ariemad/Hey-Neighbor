let express = require("express");

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
  res.render("itemCreate");
};

exports.itemCreatePost = (req, res, next) => {
  res.send("Under construction: Item Create Post ");
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
