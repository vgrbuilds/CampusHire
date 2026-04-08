import service from "./jobs.service.js";

const createJob = async (req, res) => {
    try {
        const job = await service.createJob(req.body);
        res.status(201).json(job);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllJobs = async (req, res) => {
    try {
        const jobs = await service.getAllJobs();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getJobsByDrive = async (req, res) => {
    try {
        const jobs = await service.getJobsByDrive(req.params.driveId);
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getJob = async (req, res) => {
    try {
        const job = await service.getJob(req.params.id);
        if (!job) return res.status(404).json({ error: "Job not found" });
        res.json(job);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateJob = async (req, res) => {
    try {
        const job = await service.updateJob(req.params.id, req.body);
        if (!job) return res.status(404).json({ error: "Job not found" });
        res.json(job);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteJob = async (req, res) => {
    try {
        const job = await service.deleteJob(req.params.id);
        if (!job) return res.status(404).json({ error: "Job not found" });
        res.json({ message: "Job deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default {
    createJob,
    getAllJobs,
    getJobsByDrive,
    getJob,
    updateJob,
    deleteJob
};
