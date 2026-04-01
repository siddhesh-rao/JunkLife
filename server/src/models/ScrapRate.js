import mongoose from "mongoose";

const scrapRateSchema = new mongoose.Schema(
  {
    category: { type: String, required: true, trim: true },
    item: { type: String, required: true, trim: true },
    pricePerKg: { type: Number, required: true, min: 0 },
    unit: { type: String, default: "kg", trim: true },
    lastUpdated: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const ScrapRate = mongoose.model("ScrapRate", scrapRateSchema);
