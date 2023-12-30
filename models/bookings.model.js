const mongoose = require("../config/mongo.config");
const AutoIncrementFactory = require('mongoose-sequence');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const AutoIncrement = AutoIncrementFactory(mongoose.connection);
const Schema = mongoose.Schema;

let bookings = new Schema({
  booking_id: { type: Number, index: true, unique: true, auto: true },
  booking_name: { type: String, default: null, require: true },
  booking_lists_id: { type: Number, default: null, require: true },
  booking_phone: { type: String, default: null },
  booking_social: { type: String, default: null },
  booking_color: { type: String, default: null },
  booking_remark: { type: String, default: null },
  booking_discount: {
    // id: { type: Number, default: null, require: true },
    value: { type: Number, default: null },
    // text: { type: String, default: null },
    type: { type: String, default: null },
  },
  booking_total: { type: Number, default: null, require: true },
  booking_status: { type: String, default: null },
  booking_mascara: { type: Boolean, default: false },
  booking_date: {
    start: { type: Date, default: null, require: true },
    end: { type: Date, default: null, require: true },
  },

  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },

}, { collection: "bookings" });

bookings.plugin(aggregatePaginate);
bookings.plugin(AutoIncrement, { id: 'booking_id_counter', inc_field: 'booking_id' });

module.exports = mongoose.model("bookings", bookings);