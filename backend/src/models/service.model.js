const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: String,
  location: String,
  contact: String,
  details: String,
  city: { type: mongoose.Schema.Types.ObjectId, ref: 'City' }
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
