const express = require('express')
const service = require('../controller/service.controller');
var router = express.Router();

router.get('/discount', service.discount );
router.get('/calendar', service.calendar );

module.exports = router;