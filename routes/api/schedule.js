var express = require('express');
var common = require('../../common');
var config = common.config();

console.log("config", common.config());
console.log('env', process.env.NODE_ENV);

var router = express.Router();
var get_object_id = require('../../helper');

var Performance = require('../../models/performance');

router.get('/', function(req, res, next) {

	Performance.find({})
	.populate('band')
	.populate('location')
	.exec(function(error, performance) {

  res.setHeader('Access-Control-Allow-Origin', config);


		res.json(performance);
	});

});

module.exports = router;
