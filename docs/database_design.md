
# Overview

This database is designed for CampusHire, a platform to manage campus hiring drives, jobs, and student applications.

## Tables Overview

### users

Stores all users in the system.

* id (UUID, primary key)
* name
* email (unique)
* password
* role (student or recruiter)
* created_at

A user can be either a student or a recruiter.

---

### drives

Represents a campus hiring drive created by a recruiter.

* id (UUID, primary key)
* recruiter_id (references users)
* campus_name
* start_date
* end_date
* status (planned, ongoing, completed)
* created_at

Each drive belongs to one recruiter.

---

### jobs

Represents job roles under a specific drive.

* id (UUID, primary key)
* drive_id (references drives)
* title
* description
* created_at

A drive can have multiple jobs.

---

### application_forms

Stores forms for job applications. Supports versioning.

* id (UUID, primary key)
* job_id (references jobs)
* version (integer)
* schema (JSONB)
* created_at

Each job can have multiple versions of its application form.

---

### applications

Stores student applications to jobs.

* id (UUID, primary key)
* job_id (references jobs)
* student_id (references users)
* form_version_id (references application_forms)
* resume_id (references resumes)
* answers (JSONB)
* status
* ai_score (integer, optional)
* ai_analysis (text, optional)
* processed_at (timestamp, optional)
* created_at

Each student can apply to a job only once.

---

### resumes

Stores student resumes.

* id (UUID, primary key)
* student_id (references users)
* title
* file_url
* created_at

---

## Relationships

* A recruiter (user) creates many drives
* A drive has many jobs
* A job has many application forms (versions)
* A job has many applications
* A student (user) can apply to many jobs
* Each application links to a specific form version
* Each application links to a specific resume
* A student has up to 3 resumes

---

## Key Constraints

* users.email is unique
* applications has unique (job_id, student_id) → prevents duplicate applications
* application_forms has unique (job_id, version) → ensures proper versioning

---

## Notes

* UUIDs are auto-generated using pgcrypto (gen_random_uuid())
* JSONB is used for flexible form schemas and answers
* ON DELETE CASCADE ensures related data is cleaned automatically

---


