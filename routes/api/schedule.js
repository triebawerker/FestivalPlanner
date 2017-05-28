var express = require('express');
var common = require('../../common');
var config = common.config();

var router = express.Router();
var get_object_id = require('../../helper');

var Performance = require('../../models/performance');

router.get('/:id', function(req, res, next) {
	Performance.find({
		festival: get_object_id(req.params.id)
	})
	.sort({from: 'desc'})
	.populate('band')
	.populate('location')
	.exec(function(error, festival) {

  res.setHeader('Access-Control-Allow-Origin', config);
	res.json(festival);
		console.log('performance', festival);
	});

});

module.exports = router;
