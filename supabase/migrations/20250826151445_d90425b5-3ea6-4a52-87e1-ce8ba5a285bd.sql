-- Fix security definer view issue
-- Drop the problematic view
DROP VIEW IF EXISTS public.public_profiles;

-- Instead, applications should use the get_public_profile function
-- or the restricted RLS policy for accessing seller info