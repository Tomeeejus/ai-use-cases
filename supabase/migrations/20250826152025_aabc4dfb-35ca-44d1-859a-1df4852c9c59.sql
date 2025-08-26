-- Fix function search path security warnings by updating existing functions

-- Update validate_user_content function to set proper search_path
CREATE OR REPLACE FUNCTION public.validate_user_content(content text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Basic content validation - reject if contains potential script tags or excessive length
  IF content IS NULL OR length(content) > 5000 THEN
    RETURN false;
  END IF;
  
  -- Reject content with potential script injection
  IF content ~* '<script|javascript:|data:|vbscript:' THEN
    RETURN false;
  END IF;
  
  RETURN true;
END;
$$;

-- Update validate_review_content function to set proper search_path
CREATE OR REPLACE FUNCTION public.validate_review_content()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.validate_user_content(NEW.comment) THEN
    RAISE EXCEPTION 'Invalid content detected in review';
  END IF;
  RETURN NEW;
END;
$$;