import { ScrapRate } from "../models/ScrapRate.js";
import { AppError } from "../utils/AppError.js";

export const getScrapRates = async (_req, res) => {
  const rates = await ScrapRate.find().sort({ category: 1, item: 1 });
  res.json({ success: true, data: rates });
};

export const createScrapRate = async (req, res) => {
  const rate = await ScrapRate.create({ ...req.body, lastUpdated: new Date() });
  res.status(201).json({ success: true, data: rate });
};

export const updateScrapRate = async (req, res) => {
  const rate = await ScrapRate.findByIdAndUpdate(
    req.params.id,
    { ...req.body, lastUpdated: new Date() },
    { new: true, runValidators: true }
  );

  if (!rate) {
    throw new AppError("Scrap rate not found", 404);
  }

  res.json({ success: true, data: rate });
};

export const deleteScrapRate = async (req, res) => {
  const rate = await ScrapRate.findByIdAndDelete(req.params.id);
  if (!rate) {
    throw new AppError("Scrap rate not found", 404);
  }

  res.json({ success: true, message: "Scrap rate deleted" });
};
