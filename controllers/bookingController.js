const Booking = require("../models/bookingModel");

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.status(200).json(bookings);
  } catch {
    res
      .status(500)
      .json({ message: "Internal server error while fetching bookings" });
  }
};

const createBooking = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBooking = await Booking.create({ name, email, phone });

    res.status(201).json(newBooking);
  } catch {
    res
      .status(500)
      .json({ message: "Internal server error while creating booking" });
  }
};

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await booking.update({ name, email, phone });
    res.status(200).json({ message: "Booking updated successfully", booking });
  } catch {
    res
      .status(500)
      .json({ message: "Internal server error while updating booking" });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Booking.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch {
    res.status(500).json({ message: "Internal server error while deleting booking" });
  }
};


module.exports = {
  getAllBookings,
  createBooking,
  updateBooking,
  deleteBooking,
};
