
/**
 * Mongoose schema for City inspection
 */
const mongoose = require('mongoose');

const { Schema } = mongoose;

/* Schema Definition */
const cityInspectionSchema = new Schema({
  id: String,
  certificate_number: Number,
  business_name: String,
  date: String,
  type: String,
  result: String,
  sector: String,
  address: {
    city: String,
    zip: Number,
    street: String,
    number: Number,
  },
}, {
    collection: 'tblCityInspections',
  });

module.exports.CityInspectionSchema = mongoose.model('CityInspection', cityInspectionSchema);
