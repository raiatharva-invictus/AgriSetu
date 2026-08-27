import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';

export type ConsultationRow = Database['public']['Tables']['consultations']['Row'];
export type ConsultationInsert = Database['public']['Tables']['consultations']['Insert'];
export type ReviewInsert = Database['public']['Tables']['reviews']['Insert'];

export const consultationService = {
  /**
   * Schedule or create consultation
   */
  async createConsultation(consultation: ConsultationInsert): Promise<ConsultationRow | null> {
    const { data, error } = await supabase
      .from('consultations')
      .insert(consultation)
      .select()
      .single();

    if (error) {
      console.warn('createConsultation error:', error.message);
      return null;
    }
    return data;
  },

  /**
   * Fetch consultation details by Case ID
   */
  async getConsultationByCase(caseId: string): Promise<ConsultationRow | null> {
    const { data, error } = await supabase
      .from('consultations')
      .select('*')
      .eq('case_id', caseId)
      .maybeSingle();

    if (error) {
      console.warn('getConsultationByCase error:', error.message);
      return null;
    }
    return data;
  },

  /**
   * Add farmer review & recovery outcome feedback
   */
  async addReview(review: ReviewInsert) {
    const { data, error } = await supabase
      .from('reviews')
      .insert(review)
      .select()
      .single();

    if (error) {
      console.warn('addReview error:', error.message);
      return null;
    }
    return data;
  },
};
