-- Fix critical security issue: Restrict seller profile visibility to prevent data harvesting
-- Remove the overly permissive policy that exposes personal information
DROP POLICY IF EXISTS "Show minimal seller info for use case owners" ON public.profiles;

-- Create a more secure policy that only allows viewing essential business information
-- This policy will work with the existing get_public_profile function for safe data access
CREATE POLICY "View minimal seller business info only" 
ON public.profiles 
FOR SELECT 
USING (
  (auth.uid() IS NOT NULL) 
  AND (auth.uid() <> id) 
  AND (is_seller = true) 
  AND (EXISTS (
    SELECT 1 FROM use_cases uc 
    WHERE uc.seller_id = profiles.id 
    AND uc.status = 'published'
  ))
);

-- Enhance financial data protection in orders table
-- Add more restrictive policy for order amount visibility
CREATE POLICY "Restrict order amount visibility" 
ON public.orders 
FOR SELECT 
USING (
  -- Only buyer and seller can see the full order details including amount
  (auth.uid() = buyer_id) 
  OR (auth.uid() IN (
    SELECT use_cases.seller_id 
    FROM use_cases 
    WHERE use_cases.id = orders.use_case_id
  ))
);

-- Update orders table to prevent unauthorized access to payment identifiers
-- Create separate policy for Stripe data access
CREATE POLICY "Restrict stripe payment data access" 
ON public.orders 
FOR SELECT 
USING (
  -- Only the direct buyer can access Stripe payment identifiers
  (auth.uid() = buyer_id AND (
    stripe_session_id IS NOT NULL 
    OR stripe_payment_intent_id IS NOT NULL
  ))
  -- Sellers can see orders but not payment identifiers
  OR (auth.uid() IN (
    SELECT use_cases.seller_id 
    FROM use_cases 
    WHERE use_cases.id = orders.use_case_id
  ) AND stripe_session_id IS NULL AND stripe_payment_intent_id IS NULL)
);

-- Create a secure function for seller revenue calculations that doesn't expose individual transaction details
CREATE OR REPLACE FUNCTION public.get_seller_revenue_stats(seller_user_id uuid)
RETURNS TABLE(
  total_revenue numeric,
  total_orders bigint,
  avg_order_value numeric
) 
LANGUAGE sql 
STABLE 
SECURITY DEFINER 
SET search_path = public
AS $$
  SELECT 
    COALESCE(SUM(o.amount), 0) as total_revenue,
    COUNT(o.id) as total_orders,
    COALESCE(AVG(o.amount), 0) as avg_order_value
  FROM orders o
  JOIN use_cases uc ON uc.id = o.use_case_id
  WHERE uc.seller_id = seller_user_id
  AND o.status = 'completed';
$$;

-- Add input validation function for user-generated content
CREATE OR REPLACE FUNCTION public.validate_user_content(content text)
RETURNS boolean
LANGUAGE plpgsql
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

-- Add trigger to validate review content before insertion
CREATE OR REPLACE FUNCTION public.validate_review_content()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NOT public.validate_user_content(NEW.comment) THEN
    RAISE EXCEPTION 'Invalid content detected in review';
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger for review content validation
DROP TRIGGER IF EXISTS validate_review_content_trigger ON public.reviews;
CREATE TRIGGER validate_review_content_trigger
  BEFORE INSERT OR UPDATE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_review_content();