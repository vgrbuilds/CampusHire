import db from "../../config/db.js";

const insertApplication = async (appData) => {
    const { job_id, student_id, form_version_id, answers, status } = appData;
    const query = `
        INSERT INTO applications (job_id, student_id, form_version_id, answers, status)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const result = await db.query(query, [job_id, student_id, form_version_id, answers, status]);
    return result.rows[0];
};

const getAllApplications = async () => {
    const query = "SELECT * FROM applications ORDER BY created_at DESC;";
    const result = await db.query(query);
    return result.rows;
};

const getApplicationsByJob = async (job_id) => {
    const query = "SELECT * FROM applications WHERE job_id = $1 ORDER BY created_at DESC;";
    const result = await db.query(query, [job_id]);
    return result.rows;
};

const getApplicationsByStudent = async (student_id) => {
    const query = "SELECT * FROM applications WHERE student_id = $1 ORDER BY created_at DESC;";
    const result = await db.query(query, [student_id]);
    return result.rows;
};

const getApplicationById = async (id) => {
    const query = "SELECT * FROM applications WHERE id = $1;";
    const result = await db.query(query, [id]);
    return result.rows[0];
};

const updateApplicationStatus = async (id, status) => {
    const query = `
        UPDATE applications
        SET status = $1
        WHERE id = $2
        RETURNING *;
    `;
    const result = await db.query(query, [status, id]);
    return result.rows[0];
};

const deleteApplication = async (id) => {
    const query = "DELETE FROM applications WHERE id = $1 RETURNING *;";
    const result = await db.query(query, [id]);
    return result.rows[0];
};

export default {
    insertApplication,
    getAllApplications,
    getApplicationsByJob,
    getApplicationsByStudent,
    getApplicationById,
    updateApplicationStatus,
    deleteApplication
};
