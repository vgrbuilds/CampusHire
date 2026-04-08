import query from "./jobs.query.js";

const createJob = async (jobData) => {
    return await query.insertJob(jobData);
};

const getAllJobs = async () => {
    return await query.getAllJobs();
};

const getJobsByDrive = async (driveId) => {
    return await query.getJobsByDrive(driveId);
};

const getJob = async (id) => {
    return await query.getJobById(id);
};

const updateJob = async (id, jobData) => {
    return await query.updateJob(id, jobData);
};

const deleteJob = async (id) => {
    return await query.deleteJob(id);
};

export default {
    createJob,
    getAllJobs,
    getJobsByDrive,
    getJob,
    updateJob,
    deleteJob
};
