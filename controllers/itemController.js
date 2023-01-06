let express = require("express");

const Item = require("../models/Item");

exports.itemDetail = (req, res, next) => {
  Item.findOne({ _id: req.params.id })
    .populate("category")
    .exec((err, data) => {
      if (err) {
        return next(err);
      }
      res.render("item", { item: data });
    });
};

exports.itemCreateGet = (req, res, next) => {
  res.render("itemCreate");
};

exports.itemCreatePost = (req, res, next) => {
  res.send("Under construction: Item Create Post ");
};

exports.itemDeleteGet = (req, res, next) => {
  res.render("itemDelete", {
    title: `Delete: ${req.params.category} ${req.params.id}`,
  });
};

exports.itemDeletePost = (req, res, next) => {
  res.send(
    "Under construction: Delete Post " +
      req.params.category +
      " " +
      req.params.id
  );
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
