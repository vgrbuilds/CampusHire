import { GoogleGenerativeAI } from "@google/generative-ai";
import applicationsQuery from "../applications/applications.query.js";
import jobsQuery from "../jobs/jobs.query.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeApplication = async (applicationId) => {
    try {
        // Fetch application details
        const application = await applicationsQuery.getApplicationById(applicationId);
        if (!application) {
            throw new Error("Application not found");
        }

        // Fetch job details
        const job = await jobsQuery.getJobById(application.job_id);
        if (!job) {
            throw new Error("Job not found");
        }

        const prompt = `
        You are an expert HR recruiter. Please evaluate the following candidate application for the given job.
        
        Job Title: ${job.title}
        Job Description: ${job.description}
        
        Candidate Answers:
        ${JSON.stringify(application.answers, null, 2)}
        
        Provide a JSON response with only two fields:
        1. "score": An integer from 0 to 100 representing how well the candidate fits the job.
        2. "analysis": A short paragraph (under 100 words) summarizing the candidate's fitment, highlighting key missing or matching skills.
        
        Output strictly in JSON format without markdown blocks.
        `;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        let responseText = result.response.text().trim();
        
        // Remove markdown formatting if present
        if (responseText.startsWith("```json")) {
            responseText = responseText.replace(/^```json/i, "").replace(/```$/i, "").trim();
        }

        const parsedResponse = JSON.parse(responseText);
        const score = parsedResponse.score || 0;
        const analysis = parsedResponse.analysis || "Analysis could not be generated.";

        // Save back to DB
        const updatedApplication = await applicationsQuery.saveAiAnalysis(applicationId, score, analysis);
        return updatedApplication;

    } catch (err) {
        console.error("AI Analysis failed:", err.message);
        throw err;
    }
};

const batchAnalyzeJob = async (jobId) => {
    // Fetch all applications for the job
    const applications = await applicationsQuery.getApplicationsByJob(jobId);
    
    const results = [];
    for (const app of applications) {
        // Skip already processed
        if (app.ai_score !== null) continue;
        
        try {
            const updated = await analyzeApplication(app.id);
            results.push(updated);
        } catch (error) {
            console.error(`Failed to process application ${app.id}: ${error.message}`);
        }
    }
    return { processed: results.length };
};

export default {
    analyzeApplication,
    batchAnalyzeJob
};
