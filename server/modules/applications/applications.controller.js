import service from "./applications.service.js";

const createApplication = async (req, res) => {
    try {
        const application = await service.createApplication(req.body);
        res.status(201).json(application);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllApplications = async (req, res) => {
    try {
        const applications = await service.getAllApplications();
        res.json(applications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getApplicationsByJob = async (req, res) => {
    try {
        const applications = await service.getApplicationsByJob(req.params.jobId);
        res.json(applications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getApplicationsByStudent = async (req, res) => {
    try {
        const applications = await service.getApplicationsByStudent(req.params.studentId);
        res.json(applications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getApplication = async (req, res) => {
    try {
        const application = await service.getApplication(req.params.id);
        if (!application) return res.status(404).json({ error: "Application not found" });
        res.json(application);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateStatus = async (req, res) => {
    try {
        const application = await service.updateStatus(req.params.id, req.body.status);
        if (!application) return res.status(404).json({ error: "Application not found" });
        res.json(application);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteApplication = async (req, res) => {
    try {
        const application = await service.deleteApplication(req.params.id);
        if (!application) return res.status(404).json({ error: "Application not found" });
        res.json({ message: "Application deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default {
    createApplication,
    getAllApplications,
    getApplicationsByJob,
    getApplicationsByStudent,
    getApplication,
    updateStatus,
    deleteApplication
};
