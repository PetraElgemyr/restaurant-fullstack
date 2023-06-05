const express = require("express");
const router = express.Router();

const {
    getAllBookings,
    createBooking,
    deleteBooking,
    getBookingsByDate
} = require("../controllers/bookingController");

router.get("/", getAllBookings);
router.get("/:bookingDate", getBookingsByDate);
router.post("/", createBooking);
router.delete("/:bookingId", deleteBooking);

module.exports = router;