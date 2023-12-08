const mongoose = require("../config/mongo.config");
const AutoIncrementFactory = require('mongoose-sequence');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const AutoIncrement = AutoIncrementFactory(mongoose.connection);
const Schema = mongoose.Schema;

let lists = new Schema({
  lists_id: { type: Number, index: true, unique: true, auto: true },
  lists_name: { type: String, default: null },
  lists_name_en: { type: String, default: null },
  lists_price: { type: Number, default: null },
  status: { type: Boolean, default: true },

  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },

}, { collection: "lists" });

lists.plugin(aggregatePaginate);
lists.plugin(AutoIncrement, { id: 'lists_id_counter', inc_field: 'lists_id' });

module.exports = mongoose.model("lists", lists);