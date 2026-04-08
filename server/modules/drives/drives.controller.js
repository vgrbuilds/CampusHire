import service from "./drives.service.js";

const createDrive = async (req, res) => {
    try {
        const drive = await service.createDrive(req.body);
        res.status(201).json(drive);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllDrives = async (req, res) => {
    try {
        const drives = await service.getAllDrives();
        res.json(drives);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getDrive = async (req, res) => {
    try {
        const drive = await service.getDrive(req.params.id);
        if (!drive) return res.status(404).json({ error: "Drive not found" });
        res.json(drive);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateDrive = async (req, res) => {
    try {
        const drive = await service.updateDrive(req.params.id, req.body);
        if (!drive) return res.status(404).json({ error: "Drive not found" });
        res.json(drive);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteDrive = async (req, res) => {
    try {
        const drive = await service.deleteDrive(req.params.id);
        if (!drive) return res.status(404).json({ error: "Drive not found" });
        res.json({ message: "Drive deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default {
    createDrive,
    getAllDrives,
    getDrive,
    updateDrive,
    deleteDrive
};
