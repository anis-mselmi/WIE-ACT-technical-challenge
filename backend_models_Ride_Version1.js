const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  departure: { type: String, required: true, trim: true },
  destination: { type: String, required: true, trim: true },
  dateTime: { type: Date, required: true, index: true },
  seatsAvailable: { type: Number, required: true, min: 1 },
  costPerSeat: { type: Number, required: true, min: 0 },
  passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Ride', rideSchema);