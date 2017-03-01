var express = require('express');
var router = express.Router();
var get_object_id = require('../../helper');

var common = require('../../common');
var config = common.config();

console.log("config in location", common.config());
console.log('env in location', process.env.NODE_ENV);

var Band = require('../../models/band');

router.get('/:id', function(req, res, next) {https://music-festival-planner.herokuapp.com
	Band.findById(get_object_id(req.params.id))
		.populate ('musicians')
		.exec(function(error, band) {

		if (error) {
			console.log("Could net retrieve band for id: ", req.params.id);
		};

	  res.setHeader('Access-Control-Allow-Origin', config);

  	res.json(band);
  	console.log('band and musicians ', band);
	});

});

module.exports = router;
