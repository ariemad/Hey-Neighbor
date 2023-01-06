const mongoose = require("mongoose");
const Category = require("../models/Category");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: String,
  description: String,
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  price: Number,
  weight: { quantity: Number, unit: String },
});

ItemSchema.virtual("url").get(function () {
  return `/${this.category.name}/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);
