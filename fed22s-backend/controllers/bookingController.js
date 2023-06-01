const Booking = require("./Booking");

exports.getAllBookings = async(req, res, next) => {
    const bookings = await Booking.find();
    return res.json(bookings);
}

exports.createBooking = async(req, res, next) => {
    try {
        const newBooking = await Booking.create(req.body);
        return res.json(newBooking);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: err.message,
        });
    }
}

exports.deleteBooking = async(req, res, next) => {
    try {
        const bookingId = req.params.bookingId;
        const bookingToDelete = await Booking.findById(bookingId);
        if(!bookingToDelete) return res.status(404).json();
        await bookingToDelete.deleteOne();
        return res.sendStatus(204);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: err.message,
        });
    }
}

exports.getBookingsByDate = async(req, res, next) => {
    try {
        const bookingDate = req.params.bookingDate;
        const bookingsOnSelectedDate = await Booking.find({date: bookingDate});
        return res.json(bookingsOnSelectedDate);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: error.message,
        });
    }
}