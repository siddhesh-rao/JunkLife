import { Router } from "express";
import { createBooking, getBookings, getMyBookings, updateBookingStatus } from "../controllers/bookingController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { bookingValidator } from "../validators/bookingValidators.js";

const router = Router();

router.use(protect);
router.post("/", bookingValidator, validateRequest, createBooking);
router.get("/my", getMyBookings);
router.get("/", authorize("admin"), getBookings);
router.patch("/:id/status", authorize("admin"), updateBookingStatus);

export default router;
