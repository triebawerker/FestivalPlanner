var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var musicianSchema = Schema({
		name: String
	});

module.exports = mongoose.model('Musician', musicianSchema);
