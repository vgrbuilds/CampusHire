-- CampusHire Database Seeding Script
-- RUN THIS IN NEON DB SQL EDITOR

-- 1. Clear existing dataset entirely (Cascade deletes relationships)
TRUNCATE TABLE applications, application_forms, jobs, drives, users RESTART IDENTITY CASCADE;

-- 2. Seed Users
-- The hashed password for all users is: password123
INSERT INTO users (id, name, email, password, role, created_at)
VALUES 
('11111111-1111-1111-1111-111111111111', 'Google Campus Team', 'recruiter@google.com', '$2b$10$tSuUb35H8G11wno38r2phemGjcUF8gpLcIziZZpFT1JJauin312My', 'recruiter', NOW()),
('22222222-2222-2222-2222-222222222222', 'Alice Smith', 'alice@student.test', '$2b$10$tSuUb35H8G11wno38r2phemGjcUF8gpLcIziZZpFT1JJauin312My', 'student', NOW()),
('33333333-3333-3333-3333-333333333333', 'Bob Jones', 'bob@student.test', '$2b$10$tSuUb35H8G11wno38r2phemGjcUF8gpLcIziZZpFT1JJauin312My', 'student', NOW());

-- 3. Seed Drive
INSERT INTO drives (id, recruiter_id, campus_name, start_date, end_date, status, created_at)
VALUES
('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'Stanford University', CURRENT_DATE, CURRENT_DATE + INTERVAL '60 days', 'active', NOW());

-- 4. Seed Jobs attached to that drive
INSERT INTO jobs (id, drive_id, title, description, created_at)
VALUES
('55555555-5555-5555-5555-555555555555', '44444444-4444-4444-4444-444444444444', 'Software Engineering Summer Intern', 'Join Google''s core infrastructure team this upcoming summer. You will be building massive distributed systems using Go, C++, and Python.', NOW()),
('66666666-6666-6666-6666-666666666666', '44444444-4444-4444-4444-444444444444', 'Product Management Associate', 'Help shape the future of our consumer products. Ideal for students with a technical background who want to define product vision.', NOW());

-- 5. Seed an Application Form Schema for the SWE Intern role
INSERT INTO application_forms (id, job_id, version, schema, created_at)
VALUES
('77777777-7777-7777-7777-777777777777', '55555555-5555-5555-5555-555555555555', 1, '{"fields": [{"type": "text", "name": "github_url", "label": "GitHub Profile URL", "required": true}, {"type": "textarea", "name": "why_google", "label": "Why do you want to join us?", "required": true}]}', NOW());


