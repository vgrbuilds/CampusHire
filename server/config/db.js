import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,

    // Neon requires SSL
    ssl: {
        rejectUnauthorized: false,
    },

    // optional tuning (safe defaults)
    max: 10, // max connections
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});

// test connection on startup
pool.connect()
    .then(client => {
        console.log("DB connected");
        client.release();
    })
    .catch(err => {
        console.error("DB connection error:", err.message);
    });

export default pool;