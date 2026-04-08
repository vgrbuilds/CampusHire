# CampusHire

CampusHire is a backend platform built to manage campus recruitment drives, job openings, and student applications.

## Technical Stack

* Backend: Node.js with Express
* Database: PostgreSQL
* Authentication: JWT (JSON Web Tokens)
* Password Security: Bcrypt

## Folder Structure

* config: Database connection settings
* middleware: Security and auth filters
* modules: Core business logic (Auth, Drives, Jobs, Forms, Applications)
* scripts: Database schema and helper scripts
* docs: Design and API documentation

## Getting Started

1. Install dependencies:
   npm install

2. Set up environment variables in a .env file:
   DATABASE_URL=your_postgresql_url
   JWT_SECRET=your_secret_key
   PORT=8000

3. Start the server:
   npm start

## Features

* User registration and login for students and recruiters.
* Recruiters can create and manage recruitment drives.
* Recruiters can post jobs and versioned application forms.
* Students can browse jobs and apply.
* Recruiters can track and update application statuses.
