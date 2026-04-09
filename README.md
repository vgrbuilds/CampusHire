# CampusHire

CampusHire is a backend platform built to manage campus recruitment drives, job openings, and student applications.

## Technical Stack

* Backend: Node.js with Express
* Database: PostgreSQL
* Cache: Redis (ioredis)
* AI: Google Gemini AI
* Authentication: JWT (JSON Web Tokens)
* File Handling: Multer
* Infrastructure: Docker & Kubernetes (K8s)

## Folder Structure

* config: Database connection settings
* middleware: Security and auth filters
* modules: Core business logic (Auth, Drives, Jobs, Forms, Applications, AI)
* scripts: Database schema and helper scripts
* docs: Design and API documentation

## Getting Started

1. Install dependencies:
   npm install

2. Set up environment variables in a .env file:
   DATABASE_URL=your_postgresql_url
   JWT_SECRET=your_secret_key
   PORT=8000

3. Start the server (Development):
   npm run dev

4. Run Health Check:
   npm run test:health

## Features

* User registration and login for students and recruiters.
* Recruiters can create and manage recruitment drives.
* Recruiters can post jobs and versioned application forms.
* Students can browse jobs and apply.
* Recruiters can track and update application statuses.
* AI-assisted candidate evaluation: automatic scoring and fitment summary using Gemini AI.
* Multi-Resume Management: Students can upload/manage up to 3 resumes and select the most relevant one per application.
* Optimized Performance: Redis caching for frequently accessed recruitment drives.
* DevOps Ready: Dockerized with Kubernetes manifests for scalable deployment including persistent storage for resumes.
