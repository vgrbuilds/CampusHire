import query from "./drives.query.js";
import redis from "../../config/redis.js";

const CACHE_KEY = "all_drives";
const CACHE_TTL = 600; // 10 minutes

const createDrive = async (driveData) => {
    const drive = await query.insertDrive(driveData);
    if (redis) await redis.del(CACHE_KEY);
    return drive;
};

const getAllDrives = async () => {
    if (redis) {
        const cached = await redis.get(CACHE_KEY);
        if (cached) {
            console.log("Redis Cache Hit: all_drives");
            return JSON.parse(cached);
        }
    }

    console.log("Redis Cache Miss: fetching from DB");
    const drives = await query.getAllDrives();
    
    if (redis) {
        await redis.set(CACHE_KEY, JSON.stringify(drives), "EX", CACHE_TTL);
    }
    
    return drives;
};

const getDrive = async (id) => {
    return await query.getDriveById(id);
};

const updateDrive = async (id, driveData) => {
    const drive = await query.updateDrive(id, driveData);
    if (redis) await redis.del(CACHE_KEY);
    return drive;
};

const deleteDrive = async (id) => {
    const drive = await query.deleteDrive(id);
    if (redis) await redis.del(CACHE_KEY);
    return drive;
};

export default {
    createDrive,
    getAllDrives,
    getDrive,
    updateDrive,
    deleteDrive
};
