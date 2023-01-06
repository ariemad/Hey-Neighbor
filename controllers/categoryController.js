let express = require("express");

exports.categoryCatalog = (req, res, next) => {
  res.send("Under construction: Catalog");
};

exports.categoryDetail = (req, res, next) => {
  res.send("Under construction: Categories " + req.params.category);
};
