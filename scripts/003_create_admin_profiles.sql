-- Create admin_profiles table to store admin user data
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin', 'manager')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_admin_profiles_email ON admin_profiles(email);
CREATE INDEX IF NOT EXISTS idx_admin_profiles_role ON admin_profiles(role);
CREATE INDEX IF NOT EXISTS idx_admin_profiles_active ON admin_profiles(is_active);

-- Enable Row Level Security
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin_profiles
-- Only authenticated admins can view admin profiles
CREATE POLICY "Admins can view admin profiles" ON admin_profiles
  FOR SELECT USING (
    auth.uid() = id OR
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = auth.users.id
      AND (raw_user_meta_data->>'is_admin')::boolean = true
    )
  );

-- Only the admin themselves or super admins can update profiles
CREATE POLICY "Admins can update own profile" ON admin_profiles
  FOR UPDATE USING (
    auth.uid() = id OR
    EXISTS (
      SELECT 1 FROM admin_profiles ap
      WHERE auth.uid() = ap.id
      AND ap.role = 'super_admin'
    )
  );

-- Only super admins can insert new admin profiles
CREATE POLICY "Super admins can insert admin profiles" ON admin_profiles
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles ap
      WHERE auth.uid() = ap.id
      AND ap.role = 'super_admin'
    )
  );

-- Only super admins can delete admin profiles
CREATE POLICY "Super admins can delete admin profiles" ON admin_profiles
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM admin_profiles ap
      WHERE auth.uid() = ap.id
      AND ap.role = 'super_admin'
    )
  );

-- Create a function to automatically create admin profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_admin()
RETURNS TRIGGER AS $$
BEGIN
  -- Only create profile if user has is_admin metadata set to true
  IF (NEW.raw_user_meta_data->>'is_admin')::boolean = true THEN
    INSERT INTO public.admin_profiles (id, email, role, created_at, updated_at)
    VALUES (
      NEW.id,
      NEW.email,
      COALESCE(NEW.raw_user_meta_data->>'role', 'admin'),
      NOW(),
      NOW()
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create admin profile
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_admin();

-- Function to update last_login timestamp
CREATE OR REPLACE FUNCTION public.update_admin_last_login(admin_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.admin_profiles
  SET last_login = NOW(),
      updated_at = NOW()
  WHERE id = admin_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
