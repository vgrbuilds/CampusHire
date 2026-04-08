import express from "express";
import controller from "./applications.controller.js";
import { authMiddleware, authorize } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, authorize("student"), controller.createApplication);
router.get("/", authMiddleware, controller.getAllApplications);
router.get("/job/:jobId", authMiddleware, controller.getApplicationsByJob);
router.get("/student/:studentId", authMiddleware, controller.getApplicationsByStudent);
router.get("/:id", authMiddleware, controller.getApplication);
router.patch("/:id/status", authMiddleware, authorize("recruiter"), controller.updateStatus);
router.delete("/:id", authMiddleware, controller.deleteApplication);

export default router;
