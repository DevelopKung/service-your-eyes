const express = require('express')
var router = express.Router();
var menu = require('../controller/menu.controller');

router.get('/',  menu.findAll);

module.exports = router;