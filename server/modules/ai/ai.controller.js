import service from "./ai.service.js";

const analyzeApplication = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const result = await service.analyzeApplication(applicationId);
        res.json({ message: "Application analyzed successfully", data: result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const batchAnalyzeJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const result = await service.batchAnalyzeJob(jobId);
        res.json({ message: "Batch analysis triggered", processed: result.processed });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default {
    analyzeApplication,
    batchAnalyzeJob
};
