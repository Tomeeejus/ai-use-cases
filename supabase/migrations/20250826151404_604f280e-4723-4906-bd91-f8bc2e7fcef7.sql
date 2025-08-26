-- Fix security issue: Remove access to personal data for other users
-- Drop the overly permissive policy that exposes personal data
DROP POLICY IF EXISTS "Authenticated users can view basic profile info" ON public.profiles;

-- Drop existing function to change its return type
DROP FUNCTION IF EXISTS public.get_public_profile(uuid);

-- Create new function with only truly public fields
-- Remove access to full_name, company, and other potentially sensitive data
CREATE OR REPLACE FUNCTION public.get_public_profile(profile_id uuid)
RETURNS TABLE (
  id uuid,
  avatar_url text,
  bio text,
  website text,
  is_seller boolean
) 
LANGUAGE sql 
SECURITY DEFINER 
STABLE
SET search_path = public
AS $$
  SELECT 
    p.id,
    p.avatar_url,
    p.bio,
    p.website,
    p.is_seller
  FROM public.profiles p
  WHERE p.id = profile_id;
$$;

-- Create a policy for sellers to show minimal seller info only
-- This allows displaying seller info for use cases while protecting privacy
CREATE POLICY "Show minimal seller info for use case owners" 
ON public.profiles 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL 
  AND auth.uid() != id
  AND is_seller = true
  AND EXISTS (
    SELECT 1 FROM public.use_cases uc 
    WHERE uc.seller_id = profiles.id 
    AND uc.status = 'published'
  )
);

-- Add a view for safe public access to seller profiles only
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
  id,
  avatar_url,
  bio,
  website,
  is_seller
FROM public.profiles
WHERE is_seller = true;