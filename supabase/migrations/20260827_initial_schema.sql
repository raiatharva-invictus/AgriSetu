-- AgriSetu Production Supabase Database Schema Migration
-- Migration ID: 20260827_initial_schema.sql
-- Description: Creates 10 core tables, triggers, indexes, RLS policies, and storage bucket configuration.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. PROFILES TABLE (Farmers & Agricultural Experts)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY, -- Corresponds to auth.users.id
  role TEXT NOT NULL CHECK (role IN ('farmer', 'expert')),
  full_name TEXT NOT NULL,
  phone TEXT,
  preferred_language TEXT DEFAULT 'hi' CHECK (preferred_language IN ('en', 'hi', 'bn', 'as')),
  state TEXT,
  district TEXT,
  village TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 2. EXPERT PROFILES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.expert_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  headline TEXT NOT NULL, -- e.g., "Senior Plant Pathologist at ICAR-CICR"
  institution TEXT, -- e.g., "ICAR-CICR", "Syngenta India", "Independent"
  organization_type TEXT DEFAULT 'icar_kvk' CHECK (organization_type IN ('icar_kvk', 'private_company', 'independent_agronomist', 'krishi_officer')),
  bio TEXT,
  experience_years INTEGER NOT NULL DEFAULT 0,
  consultation_price NUMERIC(10,2) NOT NULL DEFAULT 0.00,
  consultation_duration_minutes INTEGER NOT NULL DEFAULT 20,
  verification_status TEXT NOT NULL DEFAULT 'verified' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  rating NUMERIC(3,2) NOT NULL DEFAULT 4.90,
  total_consultations INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 3. SPECIALIZATIONS & JUNCTION TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.specializations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.expert_specializations (
  expert_id UUID NOT NULL REFERENCES public.expert_profiles(id) ON DELETE CASCADE,
  specialization_id UUID NOT NULL REFERENCES public.specializations(id) ON DELETE CASCADE,
  PRIMARY KEY (expert_id, specialization_id)
);

-- ============================================================================
-- 4. CASES TABLE (Agricultural Crop Issues)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  expert_id UUID REFERENCES public.expert_profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  crop TEXT NOT NULL,
  problem_category TEXT DEFAULT 'pest_disease',
  location TEXT,
  urgency TEXT NOT NULL DEFAULT 'Normal' CHECK (urgency IN ('Normal', 'Urgent')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN (
    'new', 'matched', 'consultation_pending', 'scheduled',
    'in_consultation', 'follow_up', 'resolved', 'partially_resolved',
    'unresolved', 'cancelled'
  )),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 5. CASE IMAGES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.case_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 6. CONSULTATIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  farmer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  expert_id UUID NOT NULL REFERENCES public.expert_profiles(id) ON DELETE CASCADE,
  scheduled_at TIMESTAMPTZ,
  duration_minutes INTEGER NOT NULL DEFAULT 20,
  price NUMERIC(10,2) NOT NULL DEFAULT 0.00,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
    'pending', 'accepted', 'scheduled', 'completed', 'cancelled'
  )),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 7. REVIEWS & OUTCOMES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultation_id UUID NOT NULL REFERENCES public.consultations(id) ON DELETE CASCADE,
  farmer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  expert_id UUID NOT NULL REFERENCES public.expert_profiles(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  resolved_status TEXT NOT NULL CHECK (resolved_status IN ('solved', 'partially_solved', 'unresolved')),
  feedback TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 8. TIP CATEGORIES & FREE TIPS TABLES
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.tip_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.free_tips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.tip_categories(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  language TEXT NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'hi', 'bn', 'as')),
  checkpoints JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR HIGH PERFORMANCE QUERYING
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_cases_farmer_id ON public.cases(farmer_id);
CREATE INDEX IF NOT EXISTS idx_cases_expert_id ON public.cases(expert_id);
CREATE INDEX IF NOT EXISTS idx_cases_status ON public.cases(status);
CREATE INDEX IF NOT EXISTS idx_cases_crop ON public.cases(crop);
CREATE INDEX IF NOT EXISTS idx_consultations_case_id ON public.consultations(case_id);
CREATE INDEX IF NOT EXISTS idx_consultations_expert_id ON public.consultations(expert_id);
CREATE INDEX IF NOT EXISTS idx_reviews_expert_id ON public.reviews(expert_id);

-- ============================================================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================================================
CREATE OR REPLACE FUNCTION public.update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_modtime BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();
CREATE TRIGGER update_expert_profiles_modtime BEFORE UPDATE ON public.expert_profiles FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();
CREATE TRIGGER update_cases_modtime BEFORE UPDATE ON public.cases FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();
CREATE TRIGGER update_consultations_modtime BEFORE UPDATE ON public.consultations FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();
CREATE TRIGGER update_free_tips_modtime BEFORE UPDATE ON public.free_tips FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expert_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specializations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expert_specializations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tip_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.free_tips ENABLE ROW LEVEL SECURITY;

-- 1. Profiles Policies
CREATE POLICY "Public profiles are readable by authenticated users" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- 2. Expert Profiles Policies
CREATE POLICY "Expert profiles are publicly readable" ON public.expert_profiles FOR SELECT USING (true);
CREATE POLICY "Experts can update their own expert profile" ON public.expert_profiles FOR UPDATE USING (auth.uid() = user_id);

-- 3. Specializations Policies
CREATE POLICY "Specializations readable by all" ON public.specializations FOR SELECT USING (true);
CREATE POLICY "Expert specializations readable by all" ON public.expert_specializations FOR SELECT USING (true);

-- 4. Cases Policies
CREATE POLICY "Farmers can read their own cases" ON public.cases FOR SELECT USING (auth.uid() = farmer_id);
CREATE POLICY "Farmers can create cases" ON public.cases FOR INSERT WITH CHECK (auth.uid() = farmer_id);
CREATE POLICY "Farmers can update their own cases" ON public.cases FOR UPDATE USING (auth.uid() = farmer_id);
CREATE POLICY "Assigned experts can read cases" ON public.cases FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.expert_profiles ep WHERE ep.id = cases.expert_id AND ep.user_id = auth.uid()
  )
);

-- 5. Case Images Policies
CREATE POLICY "Farmers can read their case images" ON public.case_images FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.cases c WHERE c.id = case_images.case_id AND c.farmer_id = auth.uid())
);
CREATE POLICY "Farmers can insert case images" ON public.case_images FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.cases c WHERE c.id = case_images.case_id AND c.farmer_id = auth.uid())
);

-- 6. Consultations Policies
CREATE POLICY "Farmers can read their consultations" ON public.consultations FOR SELECT USING (auth.uid() = farmer_id);
CREATE POLICY "Experts can read their consultations" ON public.consultations FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.expert_profiles ep WHERE ep.id = consultations.expert_id AND ep.user_id = auth.uid())
);

-- 7. Reviews Policies
CREATE POLICY "Reviews are publicly readable for expert trust scoring" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Farmers can insert reviews for their consultations" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = farmer_id);

-- 8. Tips Policies
CREATE POLICY "Tip categories readable by all" ON public.tip_categories FOR SELECT USING (true);
CREATE POLICY "Free tips readable by all" ON public.free_tips FOR SELECT USING (true);

-- ============================================================================
-- 9. SUPABASE STORAGE BUCKET SETUP FOR CASE IMAGES
-- ============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('case-images', 'case-images', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Farmers can upload images to case-images bucket" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'case-images' AND auth.uid() IS NOT NULL
);

CREATE POLICY "Authenticated users can view case-images" ON storage.objects FOR SELECT USING (
  bucket_id = 'case-images' AND auth.uid() IS NOT NULL
);
