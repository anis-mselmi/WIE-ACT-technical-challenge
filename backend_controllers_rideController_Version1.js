const Ride = require('../models/Ride');

exports.createRide = async (req, res) => {
  try {
    const ride = new Ride({ ...req.body, driver: req.user._id });
    await ride.save();
    res.success(ride, 201);
  } catch (err) {
    res.fail(err, 400);
  }
};

exports.listRides = async (req, res) => {
  try {
    const rides = await Ride.find().populate('driver', 'name profile').sort('-dateTime');
    res.success(rides);
  } catch (err) {
    res.fail(err, 400);
  }
};

exports.joinRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.fail('Ride not found.', 404);
    if (ride.driver.toString() === req.user._id.toString()) {
      return res.fail('Driver cannot join as passenger.', 400);
    }
    if (ride.passengers.includes(req.user._id)) {
      return res.fail('Already joined.', 400);
    }
    if (ride.passengers.length >= ride.seatsAvailable) {
      return res.fail('No seats available.', 400);
    }
    ride.passengers.push(req.user._id);
    await ride.save();
    res.success(ride);
  } catch (err) {
    res.fail(err, 400);
  }
};

exports.leaveRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.fail('Ride not found.', 404);
    ride.passengers = ride.passengers.filter(p => p.toString() !== req.user._id.toString());
    await ride.save();
    res.success(ride);
  } catch (err) {
    res.fail(err, 400);
  }
};