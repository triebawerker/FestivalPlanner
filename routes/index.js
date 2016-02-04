var express = require('express');
var router = express.Router();
var get_object_id = require('../helper');

var Band = require('../models/band');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
