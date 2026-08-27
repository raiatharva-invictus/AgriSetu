import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';

export type CaseRow = Database['public']['Tables']['cases']['Row'];
export type CaseInsert = Database['public']['Tables']['cases']['Insert'];
export type CaseUpdate = Database['public']['Tables']['cases']['Update'];

export const caseService = {
  /**
   * Create a new crop case
   */
  async createCase(newCase: CaseInsert): Promise<CaseRow | null> {
    const { data, error } = await supabase
      .from('cases')
      .insert(newCase)
      .select()
      .single();

    if (error) {
      console.warn('createCase error:', error.message);
      return null;
    }
    return data;
  },

  /**
   * Fetch cases for a farmer
   */
  async getCasesByFarmer(farmerId: string): Promise<CaseRow[]> {
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .eq('farmer_id', farmerId)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('getCasesByFarmer error:', error.message);
      return [];
    }
    return data;
  },

  /**
   * Fetch cases assigned to an expert
   */
  async getCasesByExpert(expertId: string): Promise<CaseRow[]> {
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .eq('expert_id', expertId)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('getCasesByExpert error:', error.message);
      return [];
    }
    return data;
  },

  /**
   * Update case status or assigned expert
   */
  async updateCaseStatus(caseId: string, status: Database['public']['Tables']['cases']['Row']['status'], expertId?: string): Promise<CaseRow | null> {
    const updates: CaseUpdate = { status };
    if (expertId) {
      updates.expert_id = expertId;
    }

    const { data, error } = await supabase
      .from('cases')
      .update(updates)
      .eq('id', caseId)
      .select()
      .single();

    if (error) {
      console.warn('updateCaseStatus error:', error.message);
      return null;
    }
    return data;
  },

  /**
   * Record case image storage path
   */
  async addCaseImage(caseId: string, storagePath: string) {
    const { data, error } = await supabase
      .from('case_images')
      .insert({ case_id: caseId, storage_path: storagePath })
      .select()
      .single();

    if (error) {
      console.warn('addCaseImage error:', error.message);
      return null;
    }
    return data;
  },
};
