const express = require('express')
var booking = require('../controller/booking.controller');
var router = express.Router();

router.get('/', booking.findAll );
router.get('/:id', booking.findOne );
router.post('/', booking.create );
router.post('/:id', booking.update );
router.get('/d/:id', booking.delete );
module.exports = router;