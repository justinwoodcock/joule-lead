var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Mongoose schemas
var driverSchema = new Schema({
  name: String,
  dob: Date,
  driversLicense: String,
  state: String,
  gender: String
});

var vehicleSchema = new Schema({
  year: String,
  make: String,
  model: String,
  style: String,
  trim: String
});

var leadSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  postalCode: String,
  acceptTerms: Boolean,
  drivers: [driverSchema],
  vehicles: [vehicleSchema],
  created_at: Date,
  updated_at: Date
});

leadSchema.pre('save', function (next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});

var Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
