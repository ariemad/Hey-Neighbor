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

/* GET home page. */

router.get("/:category/:id/create", itemCreateGet);

router.post("/:category/:id/create", itemCreatePost);

router.get("/:category/:id/delete", itemDeleteGet);

router.post("/:category/:id/delete", itemDeletePost);

router.get("/:category/:id/update", itemUpdateGet);

router.post("/:category/:id/update", itemUpdatePost);

router.get("/:category/:id", itemDetail);

router.get("/:category/", categoryDetail);

router.get("/", categoryCatalog);

module.exports = router;
