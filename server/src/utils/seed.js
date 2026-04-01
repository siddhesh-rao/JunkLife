import bcrypt from "bcryptjs";
import { connectDb } from "../config/db.js";
import { User } from "../models/User.js";
import { ScrapRate } from "../models/ScrapRate.js";
import { Blog } from "../models/Blog.js";
import { slugify } from "./slugify.js";

const rates = [
  ["Paper", "Newspaper", 18, "kg"],
  ["Metal", "Iron", 32, "kg"],
  ["Plastic", "PET Bottles", 14, "kg"],
  ["Glass", "Mixed Glass", 4, "kg"],
  ["E-waste", "Laptop", 450, "unit"],
  ["Appliances", "Washing Machine", 850, "unit"]
];

const blogs = [
  {
    title: "Why source-separated scrap creates a greener city",
    excerpt: "Sorting paper, plastic, and e-waste at home improves recycling recovery.",
    content: "Household segregation is the easiest way to reduce landfill waste and improve recycler efficiency."
  },
  {
    title: "How to prepare old electronics for safe recycling",
    excerpt: "Simple steps to wipe data and sort chargers before pickup day.",
    content: "Always back up your files, remove SIM cards, wipe storage, and hand over electronics in clearly labeled bags."
  }
];

const run = async () => {
  await connectDb();
  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  await User.updateOne(
    { email: "admin@junklife.in" },
    { $set: { name: "JunkLife Admin", email: "admin@junklife.in", password: hashedPassword, role: "admin" } },
    { upsert: true }
  );

  await Promise.all(
    rates.map(([category, item, pricePerKg, unit]) =>
      ScrapRate.updateOne(
        { category, item },
        { $set: { category, item, pricePerKg, unit, lastUpdated: new Date() } },
        { upsert: true }
      )
    )
  );

  await Promise.all(
    blogs.map((blog) =>
      Blog.updateOne(
        { slug: slugify(blog.title) },
        { $set: { ...blog, slug: slugify(blog.title) } },
        { upsert: true }
      )
    )
  );

  console.log("Seed completed");
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
