const db = {};

db.Members = require("./member.model.js")
db.Bookings = require("./bookings.model.js")
db.Lists = require("./lists.model.js")
db.Expenses = require("./expenses.model.js")
module.exports = db;