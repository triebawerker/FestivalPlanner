var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var bandSchema = Schema({
  name: String,
  imageUrl: String,
  description: String,
  musicians: [{ type: Schema.Types.ObjectId, ref: 'Musician' }]
});

module.exports = mongoose.model('Band', bandSchema);
