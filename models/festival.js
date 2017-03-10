var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var festivalSchema = Schema({
  name: String,
  year: Number,
  performances: [{ type: Schema.Types.ObjectId, ref: 'Performance'}]
});

module.exports = mongoose.model('Festival', festivalSchema);
