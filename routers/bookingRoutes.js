const express = require("express");
const {getAllBookings, createBooking, updateBooking, deleteBooking} = require("../controllers/bookingController");

const router = express.Router();

router.get("/", getAllBookings);
router.post("/", createBooking);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

module.exports = router;
