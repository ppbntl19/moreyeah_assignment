var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  userName: { type: String, index: { unique: true } },
  firstName: String,
  lastName: String,
  timezone: String
});


module.exports = mongoose.model('User', UserSchema);