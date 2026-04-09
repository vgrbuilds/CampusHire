-- db_modification_v2.sql
-- Adds the storage model for multi-version resumes

CREATE TABLE IF NOT EXISTS resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    file_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Adds referential link to applications
ALTER TABLE applications
ADD COLUMN resume_id UUID REFERENCES resumes(id) ON DELETE SET NULL;
