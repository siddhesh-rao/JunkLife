import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    scrapTypes: {
      type: [String],
      required: true,
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: "At least one scrap category is required"
      }
    },
    scrapType: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    estimatedPayout: { type: Number, default: 0 },
    payoutStatus: { type: String, enum: ["not_initiated", "processing", "paid"], default: "not_initiated" },
    paymentReference: { type: String, default: "" },
    status: { type: String, enum: ["pending", "confirmed", "completed", "cancelled"], default: "pending" }
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);