-- db_modification_v1.sql
-- Adds AI-related columns to the applications table

ALTER TABLE applications
ADD COLUMN ai_score INT,
ADD COLUMN ai_analysis TEXT,
ADD COLUMN processed_at TIMESTAMP;
