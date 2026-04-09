import express from "express";
import controller from "./ai.controller.js";
import { authMiddleware, authorize } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/analyze/:applicationId", authMiddleware, authorize("recruiter"), controller.analyzeApplication);
router.post("/batch-analyze/:jobId", authMiddleware, authorize("recruiter"), controller.batchAnalyzeJob);

export default router;
