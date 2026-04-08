import db from "../../config/db.js";

const insertJob = async (jobData) => {
    const { drive_id, title, description } = jobData;
    const query = `
        INSERT INTO jobs (drive_id, title, description)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const result = await db.query(query, [drive_id, title, description]);
    return result.rows[0];
};

const getAllJobs = async () => {
    const query = "SELECT * FROM jobs ORDER BY created_at DESC;";
    const result = await db.query(query);
    return result.rows;
};

const getJobsByDrive = async (drive_id) => {
    const query = "SELECT * FROM jobs WHERE drive_id = $1 ORDER BY created_at DESC;";
    const result = await db.query(query, [drive_id]);
    return result.rows;
};

const getJobById = async (id) => {
    const query = "SELECT * FROM jobs WHERE id = $1;";
    const result = await db.query(query, [id]);
    return result.rows[0];
};

const updateJob = async (id, jobData) => {
    const { title, description } = jobData;
    const query = `
        UPDATE jobs
        SET title = $1, description = $2
        WHERE id = $3
        RETURNING *;
    `;
    const result = await db.query(query, [title, description, id]);
    return result.rows[0];
};

const deleteJob = async (id) => {
    const query = "DELETE FROM jobs WHERE id = $1 RETURNING *;";
    const result = await db.query(query, [id]);
    return result.rows[0];
};

export default {
    insertJob,
    getAllJobs,
    getJobsByDrive,
    getJobById,
    updateJob,
    deleteJob
};
