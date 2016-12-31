var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var performanceSchema = Schema({
  name: String,
  festival: { type: Schema.Types.ObjectId, ref: 'Festival' },
  location: { type: Schema.Types.ObjectId, ref: 'Location' },
  band:     { type: Schema.Types.ObjectId, ref: 'Band' }

});

module.exports = mongoose.model('performance', performanceSchema);
