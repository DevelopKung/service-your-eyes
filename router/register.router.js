const express = require('express')
const auth = require('../controller/auth.controller');
var router = express.Router();

router.post('/', auth.register );

module.exports = router;