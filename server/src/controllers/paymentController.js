import { Booking } from "../models/Booking.js";
import { AppError } from "../utils/AppError.js";
import { createRazorpayOrder, verifyPaymentSignature } from "../services/paymentService.js";

export const createPaymentOrder = async (req, res) => {
  const { bookingId, estimatedAmount } = req.body;
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new AppError("Booking not found", 404);
  }

  if (req.user.role !== "admin" && booking.userId.toString() !== req.user._id.toString()) {
    throw new AppError("Forbidden", 403);
  }

  const order = await createRazorpayOrder({ amount: estimatedAmount, receipt: `junklife_${bookingId}` });

  booking.estimatedPayout = estimatedAmount;
  booking.payoutStatus = "processing";
  booking.paymentReference = order.id;
  await booking.save();

  res.json({ success: true, data: { order, booking } });
};

export const confirmPayment = async (req, res) => {
  const { bookingId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new AppError("Booking not found", 404);
  }

  if (req.user.role !== "admin" && booking.userId.toString() !== req.user._id.toString()) {
    throw new AppError("Forbidden", 403);
  }

  const valid = verifyPaymentSignature({ orderId: razorpayOrderId, paymentId: razorpayPaymentId, signature: razorpaySignature });
  if (!valid) {
    throw new AppError("Invalid payment signature", 400);
  }

  booking.payoutStatus = "paid";
  booking.paymentReference = razorpayPaymentId || booking.paymentReference;
  booking.status = booking.status === "confirmed" ? "completed" : booking.status;
  await booking.save();

  res.json({ success: true, data: booking });
};

