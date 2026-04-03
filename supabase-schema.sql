-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    CASE WHEN new.email = 'f250039@cfd.nu.edu.pk' THEN 'admin' ELSE 'user' END
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create boq_requests table
CREATE TABLE boq_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  full_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  address TEXT NOT NULL,
  notes TEXT,
  is_urgent BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'delivered', 'approved')),
  final_doc_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create boq_files table
CREATE TABLE boq_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id UUID REFERENCES boq_requests ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  mime_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create site_content table
CREATE TABLE site_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE boq_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE boq_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

-- BOQ Requests Policies
CREATE POLICY "Users can view own requests." ON boq_requests FOR SELECT USING (auth.uid() = user_id OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Users can insert own requests." ON boq_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can update all requests." ON boq_requests FOR UPDATE USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin' OR (auth.uid() = user_id AND status = 'delivered'));

-- BOQ Files Policies
CREATE POLICY "Users can view files of own requests." ON boq_files FOR SELECT USING (EXISTS (SELECT 1 FROM boq_requests WHERE id = request_id AND (user_id = auth.uid() OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin')));
CREATE POLICY "Users can insert files for own requests." ON boq_files FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM boq_requests WHERE id = request_id AND user_id = auth.uid()));

-- Site Content Policies
CREATE POLICY "Site content is viewable by everyone." ON site_content FOR SELECT USING (true);
CREATE POLICY "Only admins can modify site content." ON site_content FOR ALL USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Storage Buckets (Run these in Supabase Dashboard)
-- 1. Create 'boq-files' bucket (Private)
-- 2. Create 'final-documents' bucket (Private)
