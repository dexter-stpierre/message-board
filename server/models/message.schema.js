var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  name: String,
  message: String
})

var message = mongoose.model('message', messageSchema);

module.exports = message;
