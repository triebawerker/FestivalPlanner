var express = require('express');
var router = express.Router();
var get_object_id = require('../../helper');

var Performance = require('../../models/performance');

router.get('/', function(req, res, next) {

	Performance.find({})
	.populate('band')
	.populate('location')
	.exec(function(error, performance) {
	   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

		res.json(performance);
	});

});

module.exports = router;