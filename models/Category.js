const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: String,
  description: String,
  imageLocation: String,
});

CategorySchema.virtual("url").get(function () {
  return `/${this.name}`;
});

module.exports = mongoose.model("Category", CategorySchema);
