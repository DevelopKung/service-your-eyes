const authJwt = require("../middleware");
const express = require('express')
var router = express.Router();

/** Router */
router.use('/healthcheck', (req, res) => {  res.status(200).send("ok") });

const menu = require('./menu.router');
router.use('/menu', authJwt, menu);

const auth = require('./auth.router');
router.use('/auth', auth);

const register = require('./register.router');
router.use('/register', register);

const lists = require('./lists.router');
router.use('/lists', authJwt, lists);

const booking = require('./booking.router');
router.use('/booking', authJwt, booking);

const expenses = require('./expenses.router');
router.use('/expenses', authJwt, expenses);

const service = require('./service.router');
router.use('/service', service);

module.exports = router