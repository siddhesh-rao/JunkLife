import { Router } from "express";
import { createBlog, deleteBlog, getBlogBySlug, getBlogs, updateBlog } from "../controllers/blogController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { blogValidator } from "../validators/commonValidators.js";

const router = Router();

router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);
router.post("/", protect, authorize("admin"), blogValidator, validateRequest, createBlog);
router.put("/:id", protect, authorize("admin"), blogValidator, validateRequest, updateBlog);
router.delete("/:id", protect, authorize("admin"), deleteBlog);

export default router;
