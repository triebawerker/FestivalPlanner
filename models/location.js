var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var locationSchema = Schema({
  name: String,
  street: String,
  city: String,
  zip: String,
  phone: String,
  fax: String,
  web: String,
  email: String,
  imageUrl: String
});

module.exports = mongoose.model('Location', locationSchema);
