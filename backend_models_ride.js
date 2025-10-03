const mongoose = require('mongoose');
const { Schema } = mongoose;

const rideSchema = new Schema({
  driver: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  departure: { type: String, required: true, trim: true },
  destination: { type: String, required: true, trim: true },
  dateTime: { type: Date, required: true, index: true },
  seatsAvailable: { type: Number, required: true, min: 0 },
  costPerSeat: { type: Number, required: true, min: 0 },
  passengers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

// Useful queries: upcoming rides by departure/destination
rideSchema.index({ departure: 1, destination: 1, dateTime: 1 });

module.exports = mongoose.model('Ride', rideSchema);
