import query from "./applications.query.js";

const createApplication = async (appData) => {
    return await query.insertApplication(appData);
};

const getAllApplications = async () => {
    return await query.getAllApplications();
};

const getApplicationsByJob = async (jobId) => {
    return await query.getApplicationsByJob(jobId);
};

const getApplicationsByStudent = async (studentId) => {
    return await query.getApplicationsByStudent(studentId);
};

const getApplication = async (id) => {
    return await query.getApplicationById(id);
};

const updateStatus = async (id, status) => {
    return await query.updateApplicationStatus(id, status);
};

const deleteApplication = async (id) => {
    return await query.deleteApplication(id);
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
