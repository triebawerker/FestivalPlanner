var express = require('express');
var common = require('../../common');
var config = common.config();

var router = express.Router();

var get_object_id = require('../../helper');

var Location = require('../../models/location');

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
