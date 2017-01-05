var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var bandSchema = Schema({
  name: String,
  imageUrl: String
});

module.exports = mongoose.model('Band', bandSchema);
