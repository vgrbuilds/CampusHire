import db from "../../config/db.js";

const insertForm = async (formData) => {
    const { job_id, version, schema } = formData;
    const query = `
        INSERT INTO application_forms (job_id, version, schema)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const result = await db.query(query, [job_id, version, schema]);
    return result.rows[0];
};

const getLatestFormByJob = async (job_id) => {
    const query = `
        SELECT * FROM application_forms 
        WHERE job_id = $1 
        ORDER BY version DESC 
        LIMIT 1;
    `;
    const result = await db.query(query, [job_id]);
    return result.rows[0];
};

const getFormsByJob = async (job_id) => {
    const query = "SELECT * FROM application_forms WHERE job_id = $1 ORDER BY version DESC;";
    const result = await db.query(query, [job_id]);
    return result.rows;
};

const getFormById = async (id) => {
    const query = "SELECT * FROM application_forms WHERE id = $1;";
    const result = await db.query(query, [id]);
    return result.rows[0];
};

const deleteForm = async (id) => {
    const query = "DELETE FROM application_forms WHERE id = $1 RETURNING *;";
    const result = await db.query(query, [id]);
    return result.rows[0];
};

export default {
    insertForm,
    getLatestFormByJob,
    getFormsByJob,
    getFormById,
    deleteForm
};
