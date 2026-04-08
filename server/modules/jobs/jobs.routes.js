import express from "express";
import controller from "./jobs.controller.js";
import { authMiddleware, authorize } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, authorize("recruiter"), controller.createJob);
router.get("/", authMiddleware, controller.getAllJobs);
router.get("/drive/:driveId", authMiddleware, controller.getJobsByDrive);
router.get("/:id", authMiddleware, controller.getJob);
router.put("/:id", authMiddleware, authorize("recruiter"), controller.updateJob);
router.delete("/:id", authMiddleware, authorize("recruiter"), controller.deleteJob);

export default router;
