let express = require("express");

exports.categoryCatalog = (req, res, next) => {
  res.render("index");
};

exports.categoryDetail = (req, res, next) => {
  res.render("category", { title: req.params.category });
};
