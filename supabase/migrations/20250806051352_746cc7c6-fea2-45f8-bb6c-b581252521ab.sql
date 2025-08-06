-- Disable email confirmation requirement for testing
-- Note: This updates auth configuration to allow users to sign in without email confirmation
UPDATE auth.config SET 
  enable_confirmations = false 
WHERE TRUE;