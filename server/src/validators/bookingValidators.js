import { body } from "express-validator";

export const bookingValidator = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("phone").trim().matches(/^[6-9]\d{9}$/).withMessage("Enter a valid 10-digit Indian phone number"),
  body("address").trim().notEmpty().withMessage("Address is required"),
  body("scrapTypes").isArray({ min: 1 }).withMessage("Select at least one scrap category"),
  body("scrapTypes.*").trim().notEmpty().withMessage("Scrap category cannot be blank"),
  body("date").isISO8601().withMessage("Valid pickup date is required"),
  body("timeSlot").trim().notEmpty().withMessage("Time slot is required")
];