var express = require("express");
var router = express.Router();

const {
  categoryDetail,
  categoryCatalog,
} = require("../controllers/categoryController");
const {
  itemDetail,
  itemCreateGet,
  itemCreatePost,
  itemDeleteGet,
  itemDeletePost,
  itemUpdateGet,
  itemUpdatePost,
} = require("../controllers/itemController");
const { validateItem } = require("../middleware/validation");

/* GET home page. */

router.get("/:category/:id/delete", itemDeleteGet);

router.post("/:category/:id/delete", itemDeletePost);

router.get("/:category/:id/update", itemUpdateGet);

router.post("/:category/:id/update", validateItem, itemUpdatePost);

router.get("/:category/:id", itemDetail);

router.get("/create", itemCreateGet);

router.post("/create", validateItem, itemCreatePost);

router.get("/:category/", categoryDetail);

router.get("/", categoryCatalog);

module.exports = router;
