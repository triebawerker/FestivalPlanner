var express = require('express');
var common = require('../../common');
var config = common.config();

var router = express.Router();
var get_object_id = require('../../helper');

console.log("config in band", common.config());
console.log('env in band', process.env.NODE_ENV);

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
