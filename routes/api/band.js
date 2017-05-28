var express = require('express');
var common = require('../../common');
var config = common.config();

var router = express.Router();
var get_object_id = require('../../helper');

var Band = require('../../models/band');

router.get('/:id', function(req, res, next) {
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
