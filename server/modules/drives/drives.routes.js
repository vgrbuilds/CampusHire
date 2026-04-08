import express from "express";
import controller from "./drives.controller.js";
import { authMiddleware, authorize } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, authorize("recruiter"), controller.createDrive);
router.get("/", authMiddleware, controller.getAllDrives);
router.get("/:id", authMiddleware, controller.getDrive);
router.put("/:id", authMiddleware, authorize("recruiter"), controller.updateDrive);
router.delete("/:id", authMiddleware, authorize("recruiter"), controller.deleteDrive);

export default router;
