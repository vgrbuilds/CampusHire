import db from "../../config/db.js";

const insertUser = async (userData) => {
    const { name, email, password, role } = userData;
    const query = `
        INSERT INTO users (name, email, password, role)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, email, role, created_at;
    `;
    const result = await db.query(query, [name, email, password, role]);
    return result.rows[0];
};

const findUserByEmail = async (email) => {
    const query = "SELECT * FROM users WHERE email = $1;";
    const result = await db.query(query, [email]);
    return result.rows[0];
};

const findUserById = async (id) => {
    const query = "SELECT id, name, email, role, created_at FROM users WHERE id = $1;";
    const result = await db.query(query, [id]);
    return result.rows[0];
};

export default {
    insertUser,
    findUserByEmail,
    findUserById
};
