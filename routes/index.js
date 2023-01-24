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

router.get("/item/:id/delete", itemDeleteGet);

router.post("/item/:id/delete", itemDeletePost);

router.get("/item/:id/update", itemUpdateGet);

router.post("/item/:id/update", itemUpdatePost);

router.get("/item/:id", itemDetail);

router.get("/create", itemCreateGet);

router.post("/create", itemCreatePost);

router.get("/:category/", categoryDetail);

router.get("/", categoryCatalog);

module.exports = router;
