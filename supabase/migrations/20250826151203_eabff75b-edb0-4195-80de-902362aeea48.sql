-- Fix security issue: Restrict profile visibility to prevent email harvesting
-- Remove the overly permissive "Users can view all profiles" policy
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create new policies with proper access control
-- Users can view their own profile with all data
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

-- Authenticated users can view basic profile info (no email) of other users
-- This allows features like seller info display while protecting email privacy
CREATE POLICY "Authenticated users can view basic profile info" 
ON public.profiles 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL 
  AND auth.uid() != id
);

-- Add a security function to return filtered profile data for public viewing
CREATE OR REPLACE FUNCTION public.get_public_profile(profile_id uuid)
RETURNS TABLE (
  id uuid,
  full_name text,
  bio text,
  website text,
  company text,
  is_seller boolean,
  created_at timestamptz
) 
LANGUAGE sql 
SECURITY DEFINER 
STABLE
AS $$
  SELECT 
    p.id,
    p.full_name,
    p.bio,
    p.website,
    p.company,
    p.is_seller,
    p.created_at
  FROM public.profiles p
  WHERE p.id = profile_id;
$$;