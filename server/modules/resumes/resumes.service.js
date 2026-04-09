import query from "./resumes.query.js";
import fs from "fs";
import path from "path";

const uploadResume = async (studentId, title, file) => {
    if (!file) throw new Error("File is required");

    // Enforce 3 resume max policy
    const existingResumes = await query.getResumesByStudent(studentId);
    if (existingResumes.length >= 3) {
        // Optionally delete the physical file just uploaded since it's rejected
        fs.unlinkSync(file.path);
        throw new Error("Maximum of 3 resumes allowed. Delete one before uploading another.");
    }

    const fileUrl = `/uploads/${file.filename}`;
    
    return await query.insertResume(studentId, title, fileUrl);
};

const getMyResumes = async (studentId) => {
    return await query.getResumesByStudent(studentId);
};

const deleteResume = async (id, studentId) => {
    // Need to find it first to delete the physical file
    const resume = await query.getResumeById(id);
    if (!resume || resume.student_id !== studentId) {
        throw new Error("Resume not found or unauthorized");
    }

    // Delete record
    const deleted = await query.deleteResume(id, studentId);
    
    // Delete physical file
    try {
        const filePath = path.join(process.cwd(), resume.file_url);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    } catch (e) {
        console.error("Failed to delete physical file:", e.message);
    }

    return deleted;
};

export default {
    uploadResume,
    getMyResumes,
    deleteResume
};
