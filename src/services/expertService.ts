import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';

export type ExpertProfileRow = Database['public']['Tables']['expert_profiles']['Row'];
export type SpecializationRow = Database['public']['Tables']['specializations']['Row'];

export interface ExpertWithProfile extends ExpertProfileRow {
  profiles: Database['public']['Tables']['profiles']['Row'];
  expert_specializations: {
    specializations: SpecializationRow;
  }[];
}

export const expertService = {
  /**
   * Fetch all verified agricultural experts with specializations and user profile
   */
  async getFeaturedExperts(): Promise<ExpertWithProfile[]> {
    const { data, error } = await supabase
      .from('expert_profiles')
      .select(`
        *,
        profiles!inner(*),
        expert_specializations(
          specializations(*)
        )
      `)
      .eq('verification_status', 'verified')
      .order('rating', { ascending: false });

    if (error) {
      console.warn('getFeaturedExperts error:', error.message);
      return [];
    }
    return data as any[];
  },

  /**
   * Fetch single expert by ID
   */
  async getExpertById(expertId: string): Promise<ExpertWithProfile | null> {
    const { data, error } = await supabase
      .from('expert_profiles')
      .select(`
        *,
        profiles!inner(*),
        expert_specializations(
          specializations(*)
        )
      `)
      .eq('id', expertId)
      .maybeSingle();

    if (error) {
      console.warn('getExpertById error:', error.message);
      return null;
    }
    return data as any;
  },

  /**
   * Fetch all specializations
   */
  async getSpecializations(): Promise<SpecializationRow[]> {
    const { data, error } = await supabase.from('specializations').select('*');
    if (error) {
      console.warn('getSpecializations error:', error.message);
      return [];
    }
    return data;
  },
};
