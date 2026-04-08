import db from "../../config/db.js";

const insertDrive = async (driveData) => {
    const { recruiter_id, campus_name, start_date, end_date, status } = driveData;
    const query = `
        INSERT INTO drives (recruiter_id, campus_name, start_date, end_date, status)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const result = await db.query(query, [recruiter_id, campus_name, start_date, end_date, status]);
    return result.rows[0];
};

const getAllDrives = async () => {
    const query = "SELECT * FROM drives ORDER BY created_at DESC;";
    const result = await db.query(query);
    return result.rows;
};

const getDriveById = async (id) => {
    const query = "SELECT * FROM drives WHERE id = $1;";
    const result = await db.query(query, [id]);
    return result.rows[0];
};

const updateDrive = async (id, driveData) => {
    const { campus_name, start_date, end_date, status } = driveData;
    const query = `
        UPDATE drives
        SET campus_name = $1, start_date = $2, end_date = $3, status = $4
        WHERE id = $5
        RETURNING *;
    `;
    const result = await db.query(query, [campus_name, start_date, end_date, status, id]);
    return result.rows[0];
};

const deleteDrive = async (id) => {
    const query = "DELETE FROM drives WHERE id = $1 RETURNING *;";
    const result = await db.query(query, [id]);
    return result.rows[0];
};

export default {
    insertDrive,
    getAllDrives,
    getDriveById,
    updateDrive,
    deleteDrive
};
