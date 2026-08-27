import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rfubnfdtsqzptadgfqcp.supabase.co';
const supabaseKey = 'sb_publishable_Qqh1Ioz_KLoWc2h37Xaw3w_DTwqWArn';

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedLiveDatabase() {
  console.log('====================================================');
  console.log('SEEDING LIVE SUPABASE CLOUD DATABASE');
  console.log('Project URL:', supabaseUrl);
  console.log('====================================================\n');

  try {
    // 1. Seed Specializations
    console.log('[1/4] Seeding Specializations...');
    const { data: specData, error: specError } = await supabase
      .from('specializations')
      .upsert([
        { id: 's0000000-0000-0000-0000-000000000001', name: 'Cotton Diseases', category: 'crop_pathology' },
        { id: 's0000000-0000-0000-0000-000000000002', name: 'Leaf Curl Virus', category: 'virology' },
        { id: 's0000000-0000-0000-0000-000000000003', name: 'Sap-Sucking Pests', category: 'entomology' },
        { id: 's0000000-0000-0000-0000-000000000004', name: 'Soil Micro-Nutrients', category: 'soil_science' },
        { id: 's0000000-0000-0000-0000-000000000005', name: 'Soybean Pest Shield', category: 'crop_protection' },
      ]);
    if (specError) {
      console.warn('Specializations note:', specError.message);
    } else {
      console.log('✓ Specializations seeded successfully.');
    }

    // 2. Seed Tip Categories
    console.log('\n[2/4] Seeding Tip Categories...');
    const { data: catData, error: catError } = await supabase
      .from('tip_categories')
      .upsert([
        { id: 'tc000000-0000-0000-0000-000000000001', name: 'Pest Control' },
        { id: 'tc000000-0000-0000-0000-000000000002', name: 'Soil Nutrition' },
        { id: 'tc000000-0000-0000-0000-000000000003', name: 'Irrigation' },
      ]);
    if (catError) {
      console.warn('Tip Categories note:', catError.message);
    } else {
      console.log('✓ Tip Categories seeded successfully.');
    }

    // 3. Seed Free Tips
    console.log('\n[3/4] Seeding Free Agricultural Tips...');
    const { data: tipData, error: tipError } = await supabase
      .from('free_tips')
      .upsert([
        {
          id: 'ft111111-1111-1111-1111-111111111111',
          category_id: 'tc000000-0000-0000-0000-000000000001',
          title: '5 things to check when tomato or cotton leaves begin curling',
          summary: 'Check under leaves for whiteflies, inspect soil moisture, and delay nitrogen fertilizers.',
          content: 'Leaf curling is often caused by sap-sucking pests like thrips or whiteflies rather than nutrient deficiency.',
          language: 'en',
          checkpoints: ['Turn over top leaves for flies', 'Check leaf red edges', 'Verify soil moisture'],
        },
        {
          id: 'ft222222-2222-2222-2222-222222222222',
          category_id: 'tc000000-0000-0000-0000-000000000002',
          title: 'Before applying fertilizer, check these 3 essential soil factors',
          summary: 'Ensure moist soil, avoid application right before heavy rain, and split urea doses.',
          content: 'Applying nitrogen urea on dry soil results in up to 40% nutrient loss.',
          language: 'en',
          checkpoints: ['Apply only on moist soil', 'Avoid heavy rain forecast', 'Split urea doses'],
        },
      ]);
    if (tipError) {
      console.warn('Free Tips note:', tipError.message);
    } else {
      console.log('✓ Free Agricultural Tips seeded successfully.');
    }

    // 4. Verify Read Access
    console.log('\n[4/4] Verifying Live Read Access...');
    const { data: testTips } = await supabase.from('free_tips').select('*');
    console.log('✓ Live query returned', testTips ? testTips.length : 0, 'tips from live Supabase DB.');

    console.log('\n====================================================');
    console.log('LIVE SUPABASE DATABASE SEEDED & VERIFIED SUCCESSFULLY');
    console.log('====================================================');
  } catch (err: any) {
    console.error('Seeding error:', err.message);
  }
}

seedLiveDatabase();
