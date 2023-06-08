const Booking = require("../models/Booking");

exports.getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    return res.json(bookings);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.createBooking = async (req, res, next) => {
  try {
    const newBooking = await Booking.create(req.body);
    return res.json(newBooking);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.deleteBooking = async (req, res, next) => {
  try {
    const bookingId = req.params.bookingId;
    const bookingToDelete = await Booking.findOne({ bookingId: bookingId });
    if (!bookingToDelete) return res.status(404).json();
    await bookingToDelete.deleteOne();
    return res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.getBookingsByDate = async (req, res, next) => {
  try {
    const bookingDate = req.params.bookingDate;
    const bookingsOnSelectedDate = await Booking.find({ date: bookingDate });
    return res.json(bookingsOnSelectedDate);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateBookingById = async (req, res, next) => {
  try {
    const givenId = req.params.bookingId;
    const bookingToUpdate = await Booking.find({ bookingId: givenId }); //behövs ej egentligen?
    const updatedBooking = req.body;

    const newUpdatedBooking = await Booking.findOneAndReplace(
      { bookingId: { $eq: givenId } },
      updatedBooking,
      { returnNewDocument: true }
    );
    return res.json(newUpdatedBooking);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: error.message,
    });
  }
};
