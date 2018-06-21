var express = require('express');
var common = require('../../common');
var config = common.config();

var router = express.Router();
var get_object_id = require('../../helper');

var Performance = require('../../models/performance');

router.get('/', function(req, res, next) {
  Performance.find({})
  .exec(function (err, festival) {
    res.json(festival);
  });
});

router.get('/:id', function(req, res, next) {
	Performance.find({
		festival: get_object_id(req.params.id)
	})
	.sort({from: 'ascending'})
	.populate('band')
	.populate('location')
	.exec(function(error, festival) {

		if (error) {
			console.log("Could net retrieve schedule  for id: ", req.params.id);
		}

  res.setHeader('Access-Control-Allow-Origin', config);
	res.json(festival);
		console.log('performance', festival);
	});

});

module.exports = router;
