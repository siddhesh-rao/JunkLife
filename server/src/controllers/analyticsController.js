import { Booking } from "../models/Booking.js";
import { User } from "../models/User.js";
import { Contact } from "../models/Contact.js";
import { Blog } from "../models/Blog.js";
import { ScrapRate } from "../models/ScrapRate.js";

export const getOverviewAnalytics = async (_req, res) => {
  const [totalUsers, totalBookings, totalContacts, totalBlogs, totalRates, statusBreakdown, payouts] = await Promise.all([
    User.countDocuments(),
    Booking.countDocuments(),
    Contact.countDocuments(),
    Blog.countDocuments(),
    ScrapRate.countDocuments(),
    Booking.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
    Booking.aggregate([{ $group: { _id: null, totalEstimatedPayout: { $sum: "$estimatedPayout" } } }])
  ]);

  res.json({
    success: true,
    data: {
      cards: {
        totalUsers,
        totalBookings,
        totalContacts,
        totalBlogs,
        totalRates,
        totalEstimatedPayout: payouts[0]?.totalEstimatedPayout || 0
      },
      statusBreakdown
    }
  });
};
