import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';

export type ProfileRow = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];

export const authService = {
  /**
   * Get current active session
   */
  async getCurrentSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.warn('Supabase getSession error:', error.message);
      return null;
    }
    return data.session;
  },

  /**
   * Get currently authenticated user
   */
  async getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      return null;
    }
    return data.user;
  },

  /**
   * Sign in with phone or email credentials
   */
  async signIn(emailOrPhone: string) {
    if (emailOrPhone.includes('@')) {
      const { data, error } = await supabase.auth.signInWithOtp({ email: emailOrPhone });
      if (error) throw new Error(error.message);
      return data;
    }
    const { data, error } = await supabase.auth.signInWithOtp({ phone: emailOrPhone });
    if (error) throw new Error(error.message);
    return data;
  },

  /**
   * Sign out current user
   */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.warn('Supabase signOut warning:', error.message);
    }
  },

  /**
   * Create or update profile in public.profiles table
   */
  async createProfile(profile: ProfileInsert): Promise<ProfileRow | null> {
    const { data, error } = await supabase
      .from('profiles')
      .upsert(profile)
      .select()
      .single();

    if (error) {
      console.warn('createProfile error:', error.message);
      return null;
    }
    return data;
  },
};
