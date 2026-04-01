import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    excerpt: { type: String, trim: true, default: "" },
    content: { type: String, required: true },
    image: { type: String, default: "" }
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", blogSchema);
