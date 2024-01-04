const express = require('express')
var expenses = require('../controller/expenses.controlle');
var router = express.Router();

router.get('/', expenses.findAll );
router.get('/:id', expenses.findOne );
router.post('/', expenses.create );
router.post('/:id', expenses.update );
router.get('/d/:id', expenses.delete );

module.exports = router;