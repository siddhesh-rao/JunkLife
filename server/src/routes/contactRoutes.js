import { Router } from "express";
import { createContact, getContacts } from "../controllers/contactController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { contactValidator } from "../validators/commonValidators.js";

const router = Router();

router.post("/", contactValidator, validateRequest, createContact);
router.get("/", protect, authorize("admin"), getContacts);

export default router;
