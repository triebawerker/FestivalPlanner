var mongoose = require('mongoose');

var get_object_id = function(id) {
  return mongoose.Types.ObjectId(id);
};

module.exports = get_object_id;
