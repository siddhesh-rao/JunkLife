import { Booking } from "../models/Booking.js";
import { AppError } from "../utils/AppError.js";
import { sendEmail } from "../services/emailService.js";

const formatScrapTypes = (scrapTypes = []) => scrapTypes.join(", ");

export const createBooking = async (req, res) => {
  const scrapTypes = req.body.scrapTypes || [];
  const booking = await Booking.create({
    ...req.body,
    scrapTypes,
    scrapType: formatScrapTypes(scrapTypes),
    userId: req.user._id
  });

  await sendEmail({
    to: req.user.email,
    subject: "Pickup scheduled with JunkLife",
    html: `<p>Your pickup for ${booking.scrapType} is scheduled on ${new Date(booking.date).toDateString()}.</p>`
  });

  res.status(201).json({ success: true, data: booking });
};

export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, data: bookings });
};

export const getBookings = async (_req, res) => {
  const bookings = await Booking.find().populate("userId", "name email role").sort({ createdAt: -1 });
  res.json({ success: true, data: bookings });
};

export const updateBookingStatus = async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate("userId", "email name");
  if (!booking) {
    throw new AppError("Booking not found", 404);
  }

  booking.status = req.body.status;
  if (typeof req.body.estimatedPayout === "number") {
    booking.estimatedPayout = req.body.estimatedPayout;
  }
  await booking.save();

  await sendEmail({
    to: booking.userId?.email,
    subject: "JunkLife booking status updated",
    html: `<p>Your booking status is now <strong>${booking.status}</strong>.</p>`
  });

  res.json({ success: true, data: booking });
};