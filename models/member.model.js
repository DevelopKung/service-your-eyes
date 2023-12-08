const mongoose = require("../config/mongo.config");
const AutoIncrementFactory = require('mongoose-sequence');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const AutoIncrement = AutoIncrementFactory(mongoose.connection);
const Schema = mongoose.Schema;

let members = new Schema({
  member_id: { type: Number, index: true, unique: true, auto: true },
  username: { type: String, default: null},
  password: { type: String, default: null },
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  role: { type: String, default: "user" },
  status: { type: Boolean, default: true },
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },

}, { collection: "members" });

members.plugin(aggregatePaginate);
members.plugin(AutoIncrement, { id: 'member_id_counter', inc_field: 'member_id' });

module.exports = mongoose.model("members", members);