import { body } from "express-validator";

export const scrapRateValidator = [
  body("category").trim().notEmpty().withMessage("Category is required"),
  body("item").trim().notEmpty().withMessage("Item is required"),
  body("pricePerKg").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  body("unit").optional().trim().notEmpty().withMessage("Unit cannot be blank")
];

export const blogValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("content").trim().notEmpty().withMessage("Content is required"),
  body("excerpt").optional().trim(),
  body("image").optional().trim()
];

export const contactValidator = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("message").trim().isLength({ min: 10 }).withMessage("Message must be at least 10 characters")
];
