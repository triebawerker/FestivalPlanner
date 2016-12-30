var mongoose = require('mongoose');

var festivalSchema = mongoose.Schema({
  name: String,
  year: Number
});

module.exports = mongoose.model('Festival', festivalSchema);
