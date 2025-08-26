-- Fix security warning: Set search_path for function security
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
SET search_path = public
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