import service from "./resumes.service.js";

const uploadResume = async (req, res) => {
    try {
        const studentId = req.user.id;
        const { title } = req.body;
        
        if (!title) {
            return res.status(400).json({ error: "Title is required for the resume" });
        }

        const resume = await service.uploadResume(studentId, title, req.file);
        res.status(201).json(resume);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getMyResumes = async (req, res) => {
    try {
        const studentId = req.user.id;
        const resumes = await service.getMyResumes(studentId);
        res.json(resumes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteResume = async (req, res) => {
    try {
        const { id } = req.params;
        const studentId = req.user.id;
        const result = await service.deleteResume(id, studentId);
        res.json({ message: "Resume deleted successfully", data: result });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export default {
    uploadResume,
    getMyResumes,
    deleteResume
};
