const express = require('express')
var lists = require('../controller/lists.controller');
var router = express.Router();

router.get('/', lists.findAll );
router.get('/:id', lists.findOne );
router.post('/', lists.create );
router.put('/:id', lists.update );
router.delete('/:id', lists.delete );

module.exports = router;