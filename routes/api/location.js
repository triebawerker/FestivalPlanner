var express = require('express');
var common = require('../../common');
var config = common.config();

var router = express.Router();

var get_object_id = require('../../helper');

var Location = require('../../models/location');

console.log("config in location", common.config());
console.log('env in location', process.env.NODE_ENV);

router.get('/:id', function(req, res, next) {
	Location.findById(get_object_id(req.params.id))
		.exec(function(error, band) {

		if (error) {
			console.log("Could net retrieve location for id: ", req.params.id);
		}

	  res.setHeader('Access-Control-Allow-Origin', config);

  	res.json(band);
  	console.log('location ', band);
	});

});

module.exports = router;
