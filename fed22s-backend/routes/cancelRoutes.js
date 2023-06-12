const express = require("express");
const router = express.Router();

const { getBookingById } = require("../controllers/bookingController");

router.get("/:bookingId", getBookingById);

module.exports = router;
