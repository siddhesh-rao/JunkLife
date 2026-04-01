import { Router } from "express";
import { createScrapRate, deleteScrapRate, getScrapRates, updateScrapRate } from "../controllers/scrapRateController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { scrapRateValidator } from "../validators/commonValidators.js";

const router = Router();

router.get("/", getScrapRates);
router.post("/", protect, authorize("admin"), scrapRateValidator, validateRequest, createScrapRate);
router.put("/:id", protect, authorize("admin"), scrapRateValidator, validateRequest, updateScrapRate);
router.delete("/:id", protect, authorize("admin"), deleteScrapRate);

export default router;
