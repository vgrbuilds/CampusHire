-- Run this script in Neon DB console or any other platform as needed--


-- enable uuid generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

--------------------------------------------------
-- users
--------------------------------------------------
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT CHECK (role IN ('student', 'recruiter')) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--------------------------------------------------
-- drives
--------------------------------------------------
CREATE TABLE drives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recruiter_id UUID REFERENCES users(id) ON DELETE CASCADE,
  campus_name TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  status TEXT CHECK (status IN ('planned', 'ongoing', 'completed')) DEFAULT 'planned',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--------------------------------------------------
-- jobs
--------------------------------------------------
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  drive_id UUID REFERENCES drives(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--------------------------------------------------
-- application forms (versioned)
--------------------------------------------------
CREATE TABLE application_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  version INT NOT NULL,
  schema JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(job_id, version)
);

--------------------------------------------------
-- applications
--------------------------------------------------
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  student_id UUID REFERENCES users(id) ON DELETE CASCADE,
  form_version_id UUID REFERENCES application_forms(id),
  answers JSONB NOT NULL,
  status TEXT DEFAULT 'submitted',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(job_id, student_id)
);

--------------------------------------------------
-- indexes
--------------------------------------------------
CREATE INDEX idx_drives_recruiter ON drives(recruiter_id);
CREATE INDEX idx_jobs_drive ON jobs(drive_id);
CREATE INDEX idx_forms_job ON application_forms(job_id);
CREATE INDEX idx_applications_job ON applications(job_id);
CREATE INDEX idx_applications_student ON applications(student_id);