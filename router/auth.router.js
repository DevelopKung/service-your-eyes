const express = require('express')
const auth = require('../controller/auth.controller');
var router = express.Router();

router.post('/token', auth.login);
router.get('/user', auth.user);
module.exports = router;