import db from "../../config/db.js";

const insertResume = async (studentId, title, fileUrl) => {
    const query = `
        INSERT INTO resumes (student_id, title, file_url)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const result = await db.query(query, [studentId, title, fileUrl]);
    return result.rows[0];
};

const getResumesByStudent = async (studentId) => {
    const query = "SELECT * FROM resumes WHERE student_id = $1 ORDER BY created_at DESC;";
    const result = await db.query(query, [studentId]);
    return result.rows;
};

const getResumeById = async (id) => {
    const query = "SELECT * FROM resumes WHERE id = $1;";
    const result = await db.query(query, [id]);
    return result.rows[0];
};

const deleteResume = async (id, studentId) => {
    const query = "DELETE FROM resumes WHERE id = $1 AND student_id = $2 RETURNING *;";
    const result = await db.query(query, [id, studentId]);
    return result.rows[0];
};

export default {
    insertResume,
    getResumesByStudent,
    getResumeById,
    deleteResume
};
