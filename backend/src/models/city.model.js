const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  population: Number,
  area: String,
  description: String,
  publicServices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }]
}, { timestamps: true });

module.exports = mongoose.model('City', CitySchema);
