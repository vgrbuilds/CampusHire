import query from "./drives.query.js";

const createDrive = async (driveData) => {
    return await query.insertDrive(driveData);
};

const getAllDrives = async () => {
    return await query.getAllDrives();
};

const getDrive = async (id) => {
    return await query.getDriveById(id);
};

const updateDrive = async (id, driveData) => {
    return await query.updateDrive(id, driveData);
};

const deleteDrive = async (id) => {
    return await query.deleteDrive(id);
};

export default {
    createDrive,
    getAllDrives,
    getDrive,
    updateDrive,
    deleteDrive
};
