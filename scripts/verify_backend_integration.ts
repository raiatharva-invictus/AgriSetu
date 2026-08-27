import { supabase } from '../src/lib/supabase';
import { authService } from '../src/services/authService';
import { profileService } from '../src/services/profileService';
import { expertService } from '../src/services/expertService';
import { caseService } from '../src/services/caseService';
import { consultationService } from '../src/services/consultationService';
import { tipService } from '../src/services/tipService';

async function runBackendVerification() {
  console.log('====================================================');
  console.log('AGRISETU BACKEND & SUPABASE INTEGRATION VERIFICATION');
  console.log('====================================================');

  try {
    // 1. Check Supabase Client Instance
    console.log('\n[1/6] Testing Supabase Client Module...');
    if (!supabase) {
      throw new Error('Supabase client module failed to initialize!');
    }
    console.log('✓ Supabase client initialized cleanly.');

    // 2. Test Auth Service Abstraction
    console.log('\n[2/6] Testing Auth Service Abstraction...');
    const session = await authService.getCurrentSession();
    console.log('✓ authService.getCurrentSession() executed without error (Session:', session ? 'Active' : 'Guest/Offline Mode', ')');

    // 3. Test Profile Service Abstraction
    console.log('\n[3/6] Testing Profile Service Abstraction...');
    const profile = await profileService.getProfileById('11111111-1111-1111-1111-111111111111');
    console.log('✓ profileService.getProfileById() executed without error.');

    // 4. Test Expert Discovery Service
    console.log('\n[4/6] Testing Expert Service...');
    const experts = await expertService.getFeaturedExperts();
    console.log('✓ expertService.getFeaturedExperts() executed without error.');

    // 5. Test Crop Cases Service
    console.log('\n[5/6] Testing Case Service...');
    const cases = await caseService.getCasesByFarmer('11111111-1111-1111-1111-111111111111');
    console.log('✓ caseService.getCasesByFarmer() executed without error.');

    // 6. Test Free Tips Service
    console.log('\n[6/6] Testing Free Tip Service...');
    const tips = await tipService.getFreeTips('hi');
    console.log('✓ tipService.getFreeTips() executed without error.');

    console.log('\n====================================================');
    console.log('ALL BACKEND INTEGRATION VERIFICATION CHECKS PASSED ✓');
    console.log('====================================================');
  } catch (err: any) {
    console.error('❌ Backend Verification Error:', err.message);
    process.exit(1);
  }
}

runBackendVerification();
