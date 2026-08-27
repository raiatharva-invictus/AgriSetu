-- AgriSetu Seed Data Migration
-- Seed File: supabase/seed.sql
-- Description: Realistic Indian agricultural demo data for experts, specializations, farmer cases, consultations, reviews, and tips.

-- ============================================================================
-- 1. SEED SPECIALIZATIONS
-- ============================================================================
INSERT INTO public.specializations (id, name, category) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Cotton Diseases', 'crop_pathology'),
  ('a0000000-0000-0000-0000-000000000002', 'Leaf Curl Virus', 'virology'),
  ('a0000000-0000-0000-0000-000000000003', 'Sap-Sucking Pests', 'entomology'),
  ('a0000000-0000-0000-0000-000000000004', 'Soil Micro-Nutrients', 'soil_science'),
  ('a0000000-0000-0000-0000-000000000005', 'Soybean Pest Shield', 'crop_protection'),
  ('a0000000-0000-0000-0000-000000000006', 'Drip Irrigation & Fertigation', 'water_management'),
  ('a0000000-0000-0000-0000-000000000007', 'Organic Bio-Pesticides', 'organic')
ON CONFLICT (name) DO NOTHING;

-- ============================================================================
-- 2. SEED PROFILES (Farmer & Expert User Accounts)
-- ============================================================================
INSERT INTO public.profiles (id, role, full_name, phone, preferred_language, state, district, village) VALUES
  ('11111111-1111-1111-1111-111111111111', 'farmer', 'Rameshwar Patel', '+91 98765 43210', 'hi', 'Maharashtra', 'Nagpur', 'Kalmeshwar'),
  ('22222222-2222-2222-2222-222222222222', 'expert', 'Dr. Suresh Deshmukh', '+91 94221 00112', 'hi', 'Maharashtra', 'Nagpur', 'ICAR Campus'),
  ('33333333-3333-3333-3333-333333333333', 'expert', 'Vikram Joshi', '+91 98900 11223', 'hi', 'Maharashtra', 'Amravati', 'Syngenta Station'),
  ('44444444-4444-4444-4444-444444444444', 'expert', 'Dr. Anjali Verma', '+91 91580 44556', 'en', 'Maharashtra', 'Nagpur', 'Civil Lines'),
  ('55555555-5555-5555-5555-555555555555', 'expert', 'Er. Rajeshwar Patil', '+91 97654 32109', 'hi', 'Maharashtra', 'Akola', 'KVK Akola')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 3. SEED EXPERT PROFILES
-- ============================================================================
INSERT INTO public.expert_profiles (id, user_id, headline, institution, organization_type, bio, experience_years, consultation_price, consultation_duration_minutes, rating, total_consultations) VALUES
  ('e1111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'Senior Plant Pathologist at ICAR-CICR', 'ICAR - Central Institute for Cotton Research', 'icar_kvk', 'Principal Plant Pathologist specializing in cotton disease control and Vidarbha pest outbreaks.', 16, 0.00, 20, 4.90, 480),
  ('e2222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', 'Lead Field Agronomist & Pest Specialist', 'Syngenta India Crop Protection', 'private_company', 'Specialized in field-level pesticide spraying dosages and rapid pest recovery for Vidarbha rainfed crops.', 11, 0.00, 20, 4.80, 310),
  ('e3333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', 'Independent Soil & Nutrition Consultant', 'Independent Soil Diagnostics', 'independent_agronomist', 'Provides unbiased soil nutrient diagnostics, micro-element sprays, and organic soil enrichment.', 12, 0.00, 20, 4.80, 340)
ON CONFLICT (user_id) DO NOTHING;

-- ============================================================================
-- 4. SEED EXPERT SPECIALIZATIONS
-- ============================================================================
INSERT INTO public.expert_specializations (expert_id, specialization_id) VALUES
  ('e1111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000001'),
  ('e1111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000002'),
  ('e2222222-2222-2222-2222-222222222222', 'a0000000-0000-0000-0000-000000000005'),
  ('e3333333-3333-3333-3333-333333333333', 'a0000000-0000-0000-0000-000000000004')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 5. SEED FARMER CASES
-- ============================================================================
INSERT INTO public.cases (id, farmer_id, expert_id, title, description, crop, location, urgency, status) VALUES
  ('c1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'e1111111-1111-1111-1111-111111111111', 'Leaf curling + small visible insects underneath', 'My tomato plants started curling from top canopy 3 days ago. Tiny white insects visible under leaves after morning dew.', 'Tomato (टमाटर)', 'Kalmeshwar, Nagpur', 'Normal', 'follow_up'),
  ('c2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'e1111111-1111-1111-1111-111111111111', 'Pest infestation & spindle-shaped brown leaf spots', 'Spindle-shaped brown lesions on leaves following high humidity monsoon shower.', 'Rice (धान)', 'Kalmeshwar, Nagpur', 'Normal', 'resolved'),
  ('c3333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'e3333333-3333-3333-3333-333333333333', 'Yellowing lower leaves & soil deficiency', 'V-shaped yellowing starting from lower leaf tips after continuous rainfall.', 'Maize (मक्का)', 'Kalmeshwar, Nagpur', 'Normal', 'partially_resolved'),
  ('c4444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'e2222222-2222-2222-2222-222222222222', 'Tuber rot & severe plant wilting', 'Black stem decay near soil line causing sudden plant collapse in high moisture zone.', 'Potato (आलू)', 'Kalmeshwar, Nagpur', 'Urgent', 'unresolved')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 6. SEED CONSULTATIONS & REVIEWS
-- ============================================================================
INSERT INTO public.consultations (id, case_id, farmer_id, expert_id, duration_minutes, price, status, notes) VALUES
  ('c0111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'e1111111-1111-1111-1111-111111111111', 20, 0.00, 'completed', 'Diagnosed early Thrips & Whitefly infestation. Recommended foliar spray of Neem oil (5ml/L) + Imidacloprid (0.5ml/L).'),
  ('c0222222-2222-2222-2222-222222222222', 'c2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'e1111111-1111-1111-1111-111111111111', 15, 0.00, 'completed', 'Tricyclazole 75% WP spray advised at 0.6g per litre of water. Drainage improved.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.reviews (id, consultation_id, farmer_id, expert_id, rating, resolved_status, feedback) VALUES
  ('d2222222-2222-2222-2222-222222222222', 'c0222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'e1111111-1111-1111-1111-111111111111', 5, 'solved', 'डॉक्टर साहब की सलाह से स्प्रे किया, 4 दिन में धान के पत्ते हरे हो गए।')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 7. SEED TIP CATEGORIES & FREE TIPS
-- ============================================================================
INSERT INTO public.tip_categories (id, name) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'Pest Control'),
  ('b0000000-0000-0000-0000-000000000002', 'Soil Nutrition'),
  ('b0000000-0000-0000-0000-000000000003', 'Irrigation')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.free_tips (id, category_id, title, summary, content, language, checkpoints) VALUES
  ('f0111111-1111-1111-1111-111111111111', 'b0000000-0000-0000-0000-000000000001', '5 things to check when tomato or cotton leaves begin curling', 'Check under leaves for whiteflies, inspect soil moisture, and delay nitrogen fertilizers.', 'Leaf curling is often caused by sap-sucking pests like thrips or whiteflies rather than nutrient deficiency.', 'en', '["1. Turn over top leaves for flies", "2. Check leaf red edges", "3. Verify soil moisture"]'::jsonb),
  ('f0222222-2222-2222-2222-222222222222', 'b0000000-0000-0000-0000-000000000002', 'Before applying fertilizer, check these 3 essential soil factors', 'Ensure moist soil, avoid application right before heavy rain, and split urea doses.', 'Applying nitrogen urea on dry soil results in up to 40% nutrient loss.', 'en', '["1. Apply only on moist soil", "2. Avoid heavy rain forecast", "3. Split urea doses"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
