const mongoose = require("mongoose");
const Category = require("../models/Category");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: String,
  description: String,
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  price: Number,
  weight: { quantity: Number, unit: String },
  imageLocation: String,
});

// Virtual are doubled on middleware getRandomItems

ItemSchema.virtual("url").get(function () {
  return `/item/${this._id}`;
});

ItemSchema.virtual("priceString").get(function () {
  return this.price.toFixed(2);
});

ItemSchema.virtual("relativePrice").get(function () {
  return (Math.round((this.price / this.weight.quantity) * 100) / 100).toFixed(
    2
  );
});

ItemSchema.virtual("relativeUnit").get(function () {
  return `€ / ${this.weight.unit}`;
});

module.exports = mongoose.model("Item", ItemSchema);
