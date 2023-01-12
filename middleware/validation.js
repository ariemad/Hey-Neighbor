const { body, validationResult, check } = require("express-validator");

exports.validateItem = [
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
];
