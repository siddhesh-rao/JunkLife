import { Router } from "express";
import { getOverviewAnalytics } from "../controllers/analyticsController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/overview", protect, authorize("admin"), getOverviewAnalytics);

export default router;
