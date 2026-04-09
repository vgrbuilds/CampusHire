import express from "express";
import controller from "./resumes.controller.js";
import { authMiddleware, authorize } from "../../middleware/auth.middleware.js";
import { upload } from "../../middleware/upload.middleware.js";

const router = express.Router();

// Only students manage their resumes
router.post("/", authMiddleware, authorize("student"), upload.single("file"), controller.uploadResume);
router.get("/", authMiddleware, authorize("student"), controller.getMyResumes);
router.delete("/:id", authMiddleware, authorize("student"), controller.deleteResume);

export default router;
