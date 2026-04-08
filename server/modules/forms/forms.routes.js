import express from "express";
import controller from "./forms.controller.js";
import { authMiddleware, authorize } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, authorize("recruiter"), controller.createForm);
router.get("/job/:jobId", authMiddleware, controller.getFormsByJob);
router.get("/:id", authMiddleware, controller.getForm);
router.delete("/:id", authMiddleware, authorize("recruiter"), controller.deleteForm);

export default router;
