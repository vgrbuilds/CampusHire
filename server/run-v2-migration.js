import pool from "./config/db.js";
import fs from "fs";

async function runMigration() {
    try {
        const sql = fs.readFileSync("./scripts/db_modification_v2.sql", "utf8");
        await pool.query(sql);
        console.log("Migration successful");
        process.exit(0);
    } catch (err) {
        console.error("Migration failed:", err.message);
        process.exit(1);
    }
}

runMigration();
