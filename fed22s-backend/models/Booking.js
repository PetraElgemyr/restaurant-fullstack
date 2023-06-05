const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
    },
    sitting: {
        type: Number,
        required: true,
    },
    bookedTables: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    user: {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phonenumber: {
            type: String,
            required: true,
        },
        numberOfGuests: {
            type: Number,
            required: true,
        }
    }
})

module.exports = mongoose.model("Booking", BookingSchema, "bookings");