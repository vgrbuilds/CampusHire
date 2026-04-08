import service from "./forms.service.js";

const createForm = async (req, res) => {
    try {
        const form = await service.createForm(req.body);
        res.status(201).json(form);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getFormsByJob = async (req, res) => {
    try {
        const forms = await service.getFormsByJob(req.params.jobId);
        res.json(forms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getForm = async (req, res) => {
    try {
        const form = await service.getForm(req.params.id);
        if (!form) return res.status(404).json({ error: "Form not found" });
        res.json(form);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteForm = async (req, res) => {
    try {
        const form = await service.deleteForm(req.params.id);
        if (!form) return res.status(404).json({ error: "Form not found" });
        res.json({ message: "Form deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default {
    createForm,
    getFormsByJob,
    getForm,
    deleteForm
};
