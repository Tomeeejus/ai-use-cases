-- Since we can't insert directly into auth.users, let's verify our signup process will work
-- by checking the profiles table structure and triggers
SELECT * FROM information_schema.triggers WHERE trigger_name = 'on_auth_user_created';