-- Simplify use_cases table to focus on essential information for cheap, easy AI implementations
-- Remove fields that make AI solutions seem complex or expensive

-- Drop unnecessary columns that overcomplicate simple AI use cases
ALTER TABLE public.use_cases DROP COLUMN IF EXISTS tools_required;
ALTER TABLE public.use_cases DROP COLUMN IF EXISTS difficulty_level;
ALTER TABLE public.use_cases DROP COLUMN IF EXISTS demo_url;
ALTER TABLE public.use_cases DROP COLUMN IF EXISTS case_study_url;
ALTER TABLE public.use_cases DROP COLUMN IF EXISTS roi;
ALTER TABLE public.use_cases DROP COLUMN IF EXISTS time_to_implement;
ALTER TABLE public.use_cases DROP COLUMN IF EXISTS featured;
ALTER TABLE public.use_cases DROP COLUMN IF EXISTS tags;

-- Keep essential fields only:
-- id, title, description, price, seller_id, status, category_id, implementation_guide, created_at, updated_at

-- Add a comment to document the simplified approach
COMMENT ON TABLE public.use_cases IS 'Simplified use cases table focusing on essential information for cheap and easy AI implementations';