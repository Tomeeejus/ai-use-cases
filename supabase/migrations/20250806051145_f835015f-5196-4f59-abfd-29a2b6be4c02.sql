-- Insert a test user manually into auth.users for testing
-- Note: This approach won't work as we can't insert directly into auth.users
-- Instead, we'll need to use the signup flow through the application

-- Let's check if we have any existing test profiles
SELECT * FROM profiles WHERE email LIKE '%test%' LIMIT 5;