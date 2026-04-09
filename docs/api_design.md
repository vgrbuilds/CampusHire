# API Design

This document lists the available API endpoints for the CampusHire platform.

## Authentication

* POST /api/auth/register : Register a new user (student or recruiter)
* POST /api/auth/login : Login and receive a JWT token

## Recruitment Drives

* GET /api/drives : List all drives (Authenticated)
* GET /api/drives/:id : Get details of a single drive (Authenticated)
* POST /api/drives : Create a new drive (Recruiter only)
* PUT /api/drives/:id : Update a drive (Recruiter only)
* DELETE /api/drives/:id : Delete a drive (Recruiter only)

## Jobs

* GET /api/jobs : List all jobs (Authenticated)
* GET /api/jobs/:id : Get details of a single job (Authenticated)
* GET /api/jobs/drive/:driveId : List all jobs for a specific drive (Authenticated)
* POST /api/jobs : Create a new job (Recruiter only)
* PUT /api/jobs/:id : Update a job (Recruiter only)
* DELETE /api/jobs/:id : Delete a job (Recruiter only)

## Application Forms

* GET /api/forms/:id : Get a specific form version (Authenticated)
* GET /api/forms/job/:jobId : List all form versions for a job (Authenticated)
* POST /api/forms : Create a new form version for a job (Recruiter only)

## Applications

* GET /api/applications : List all applications (Authenticated)
* GET /api/applications/:id : Get details of an application (Authenticated)
* GET /api/applications/job/:jobId : List all applications for a job (Authenticated)
* GET /api/applications/student/:studentId : List all applications by a student (Authenticated)
* POST /api/applications : Submit a job application (Student only). Requires { job_id, form_version_id, resume_id, answers }
* PATCH /api/applications/:id/status : Update application status (Recruiter only)
* DELETE /api/applications/:id : Withdraw/Delete an application (Authenticated)

## AI Features

* POST /api/ai/analyze/:applicationId : Trigger AI analysis and scoring for a specific application (Recruiter only)
* POST /api/ai/batch-analyze/:jobId : Trigger batch AI analysis for all unprocessed applications of a specific job (Recruiter only)

## Resumes (Students only)

* GET /api/resumes : List all uploaded resumes for the current student
* POST /api/resumes : Upload a new resume (Multipart form: title, file). Max 3 per student.
* DELETE /api/resumes/:id : Delete a resume and its physical file

## Headers

All protected routes require an Authorization header:
Authorization: Bearer <your_jwt_token>
