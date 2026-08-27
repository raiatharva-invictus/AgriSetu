import { supabase } from '@/lib/supabase';
import { Database, PreferredLanguage } from '@/types/database';

export type FreeTipRow = Database['public']['Tables']['free_tips']['Row'];
export type TipCategoryRow = Database['public']['Tables']['tip_categories']['Row'];

export const tipService = {
  /**
   * Fetch free agricultural tips by language
   */
  async getFreeTips(language: PreferredLanguage = 'en'): Promise<FreeTipRow[]> {
    const { data, error } = await supabase
      .from('free_tips')
      .select('*')
      .eq('language', language)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('getFreeTips error:', error.message);
      return [];
    }
    return data;
  },

  /**
   * Fetch all tip categories
   */
  async getTipCategories(): Promise<TipCategoryRow[]> {
    const { data, error } = await supabase.from('tip_categories').select('*');
    if (error) {
      console.warn('getTipCategories error:', error.message);
      return [];
    }
    return data;
  },
};
