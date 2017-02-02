var express = require('express');
var router = express.Router();
var get_object_id = require('../../helper');

var Band = require('../../models/band');

router.get('/:id', function(req, res, next) {
	Band.findById(get_object_id(req.params.id))
		.populate ('musicians')
		.exec(function(error, band) {

		if (error) {
			console.log("Could net retrieve band for id: ", req.params.id);
		}
		res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  	res.json(band);
  	console.log('band and musicians ', band);
	});

});

module.exports = router;
