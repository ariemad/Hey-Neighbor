let express = require("express");

exports.itemDetail = (req, res, next) => {
  res.send(
    "Under construction: Items " + req.params.category + " " + req.params.id
  );
};

exports.itemCreateGet = (req, res, next) => {
  res.send(
    "Under construction: Item Create Get " +
      req.params.category +
      " " +
      req.params.id
  );
};

exports.itemCreatePost = (req, res, next) => {
  res.send(
    "Under construction: Item Create Post " +
      req.params.category +
      " " +
      req.params.id
  );
};

exports.itemDeleteGet = (req, res, next) => {
  res.send(
    "Under construction: Item Delete Get " +
      req.params.category +
      " " +
      req.params.id
  );
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
  res.send(
    "Under construction: Items item Update Get " +
      req.params.category +
      " " +
      req.params.id
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
