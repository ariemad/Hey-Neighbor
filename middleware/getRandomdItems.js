const Item = require("../models/Item");

exports.getRandomItems = async (req, res, next) => {
  let aggregation = [{ $sample: { size: 4 } }];
  let samples = await Item.aggregate(aggregation).catch((err) => next(err));

  // Virtual cant be called after aggregation
  req.body.samples = samples.map((item) => {
    item.url = `/item/${item._id}`;
    item.priceString = item.price.toFixed(2);
    item.relativePrice = (
      Math.round((item.price / item.weight.quantity) * 100) / 100
    ).toFixed(2);
    item.relativeUnit = `€ / ${item.weight.unit}`;
    return item;
  });
  next();
};
