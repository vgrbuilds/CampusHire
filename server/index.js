import express from "express";
import pool from "./config/db.js";

// Route Imports
import authRoutes from "./modules/auth/auth.routes.js";
import drivesRoutes from "./modules/drives/drives.routes.js";
import jobsRoutes from "./modules/jobs/jobs.routes.js";
import formsRoutes from "./modules/forms/forms.routes.js";
import applicationsRoutes from "./modules/applications/applications.routes.js";
import aiRoutes from "./modules/ai/ai.routes.js";
import resumesRoutes from "./modules/resumes/resumes.routes.js";
import path from "path";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


// Main Routes
app.use("/api/auth", authRoutes);
app.use("/api/drives", drivesRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/forms", formsRoutes);
app.use("/api/applications", applicationsRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/resumes", resumesRoutes);

app.get("/db-test", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({
            message: "Database connected successfully",
            time: result.rows[0].now
        });
    } catch (err) {
        console.error("DB Test Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/test-cache", async (req, res) => {
    try {
        const driveService = (await import("./modules/drives/drives.service.js")).default;
        const drives = await driveService.getAllDrives();
        res.json(drives);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});