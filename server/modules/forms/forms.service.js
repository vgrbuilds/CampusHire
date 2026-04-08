import query from "./forms.query.js";

const createForm = async (formData) => {
    const { job_id, schema } = formData;
    
    // Find latest version
    const latestForm = await query.getLatestFormByJob(job_id);
    const version = latestForm ? latestForm.version + 1 : 1;

    return await query.insertForm({ job_id, version, schema });
};

const getFormsByJob = async (jobId) => {
    return await query.getFormsByJob(jobId);
};

const getForm = async (id) => {
    return await query.getFormById(id);
};

const deleteForm = async (id) => {
    return await query.deleteForm(id);
};

export default {
    createForm,
    getFormsByJob,
    getForm,
    deleteForm
};
