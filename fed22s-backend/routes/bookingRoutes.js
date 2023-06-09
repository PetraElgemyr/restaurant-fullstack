const express = require("express");
const router = express.Router();

const {
  getAllBookings,
  createBooking,
  deleteBooking,
  getBookingsByDate,
  getBookingById,
  updateBookingById,
} = require("../controllers/bookingController");

router.get("/", getAllBookings);
router.get("/:bookingDate", getBookingsByDate);
router.get("/:bookingId", getBookingById);
router.post("/", createBooking);
router.delete("/:bookingId", deleteBooking);
router.put("/:bookingId", updateBookingById);

module.exports = router;
