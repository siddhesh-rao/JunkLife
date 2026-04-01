import { Router } from "express";
import { confirmPayment, createPaymentOrder } from "../controllers/paymentController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = Router();

router.use(protect);
router.post("/create-order", createPaymentOrder);
router.post("/confirm", authorize("admin", "customer"), confirmPayment);

export default router;
