var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var locationSchema = Schema({
  name: String
});

module.exports = mongoose.model('Location', locationSchema);
