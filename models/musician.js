var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var musicianSchema = Schema({
		name: String,
    band: { type: Schema.Types.ObjectId, ref: 'Band' }
	});

module.exports = mongoose.model('Musician', musicianSchema);
