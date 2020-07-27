var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;

var User_Availability = new Schema({
  startTime: Date,
  endTime: Date,
  userId: { type: String, trim: true }
});


module.exports = mongoose.model('UserAvailability', User_Availability);