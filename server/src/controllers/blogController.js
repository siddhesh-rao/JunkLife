import { Blog } from "../models/Blog.js";
import { AppError } from "../utils/AppError.js";
import { slugify } from "../utils/slugify.js";

export const getBlogs = async (_req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json({ success: true, data: blogs });
};

export const getBlogBySlug = async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (!blog) {
    throw new AppError("Blog not found", 404);
  }

  res.json({ success: true, data: blog });
};

export const createBlog = async (req, res) => {
  const blog = await Blog.create({ ...req.body, slug: slugify(req.body.title) });
  res.status(201).json({ success: true, data: blog });
};

export const updateBlog = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { ...req.body, slug: slugify(req.body.title) },
    { new: true, runValidators: true }
  );

  if (!blog) {
    throw new AppError("Blog not found", 404);
  }

  res.json({ success: true, data: blog });
};

export const deleteBlog = async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) {
    throw new AppError("Blog not found", 404);
  }

  res.json({ success: true, message: "Blog deleted" });
};
