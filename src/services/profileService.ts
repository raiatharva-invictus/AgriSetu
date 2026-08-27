import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';

export type ProfileRow = Database['public']['Tables']['profiles']['Row'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export const profileService = {
  /**
   * Fetch profile by User ID
   */
  async getProfileById(userId: string): Promise<ProfileRow | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.warn('getProfileById error:', error.message);
      return null;
    }
    return data;
  },

  /**
   * Update farmer or expert profile
   */
  async updateProfile(userId: string, updates: ProfileUpdate): Promise<ProfileRow | null> {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.warn('updateProfile error:', error.message);
      return null;
    }
    return data;
  },
};
