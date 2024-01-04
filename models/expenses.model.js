const mongoose = require("../config/mongo.config");
const AutoIncrementFactory = require('mongoose-sequence');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const AutoIncrement = AutoIncrementFactory(mongoose.connection);
const Schema = mongoose.Schema;

let expenses = new Schema({
  exp_id: { type: Number, index: true, unique: true, auto: true },
  exp_name: { type: String, default: null },
  exp_price: { type: Number, default: 0 },
  exp_date: { type: Date, default: null, require: true },

  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },

}, { collection: "expenses" });

expenses.plugin(aggregatePaginate);
expenses.plugin(AutoIncrement, { id: 'exp_id_counter', inc_field: 'exp_id' });

module.exports = mongoose.model("expenses", expenses);