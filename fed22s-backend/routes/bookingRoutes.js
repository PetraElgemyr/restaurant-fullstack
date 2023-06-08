const express = require("express");
const router = express.Router();

const {
  getAllBookings,
  createBooking,
  deleteBooking,
  getBookingsByDate,
  updateBookingById,
} = require("../controllers/bookingController");

router.get("/", getAllBookings);
router.get("/:bookingDate", getBookingsByDate);
router.post("/", createBooking);
router.delete("/:bookingId", deleteBooking);
router.put("/:bookingId", updateBookingById);

module.exports = router;
