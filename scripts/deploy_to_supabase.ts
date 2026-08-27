import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rfubnfdtsqzptadgfqcp.supabase.co';
const supabaseKey = 'sb_publishable_Qqh1Ioz_KLoWc2h37Xaw3w_DTwqWArn';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('Connecting to live Supabase project:', supabaseUrl);
  try {
    const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
    if (error) {
      console.log('Response from live Supabase:', error.message);
      if (error.message.includes('relation "public.profiles" does not exist') || error.code === 'PGRST204' || error.code === '42P01') {
        console.log('\n--> CONFIRMED: Live Supabase database is connected! Tables are ready to be created.');
      }
    } else {
      console.log('✓ Successfully connected! Found profiles table, count:', data);
    }
  } catch (err: any) {
    console.error('Connection error:', err.message);
  }
}

testConnection();
