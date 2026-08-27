export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type UserRole = 'farmer' | 'expert';
export type PreferredLanguage = 'en' | 'hi' | 'bn' | 'as';
export type OrganizationType = 'icar_kvk' | 'private_company' | 'independent_agronomist' | 'krishi_officer';
export type VerificationStatus = 'pending' | 'verified' | 'rejected';
export type CaseUrgency = 'Normal' | 'Urgent';
export type CaseStatus =
  | 'new'
  | 'matched'
  | 'consultation_pending'
  | 'scheduled'
  | 'in_consultation'
  | 'follow_up'
  | 'resolved'
  | 'partially_resolved'
  | 'unresolved'
  | 'cancelled';
export type ConsultationStatus = 'pending' | 'accepted' | 'scheduled' | 'completed' | 'cancelled';
export type ResolvedStatus = 'solved' | 'partially_solved' | 'unresolved';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: UserRole;
          full_name: string;
          phone: string | null;
          preferred_language: PreferredLanguage;
          state: string | null;
          district: string | null;
          village: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          role: UserRole;
          full_name: string;
          phone?: string | null;
          preferred_language?: PreferredLanguage;
          state?: string | null;
          district?: string | null;
          village?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          role?: UserRole;
          full_name?: string;
          phone?: string | null;
          preferred_language?: PreferredLanguage;
          state?: string | null;
          district?: string | null;
          village?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      expert_profiles: {
        Row: {
          id: string;
          user_id: string;
          headline: string;
          institution: string | null;
          organization_type: OrganizationType;
          bio: string | null;
          experience_years: number;
          consultation_price: number;
          consultation_duration_minutes: number;
          verification_status: VerificationStatus;
          rating: number;
          total_consultations: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          headline: string;
          institution?: string | null;
          organization_type?: OrganizationType;
          bio?: string | null;
          experience_years?: number;
          consultation_price?: number;
          consultation_duration_minutes?: number;
          verification_status?: VerificationStatus;
          rating?: number;
          total_consultations?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          headline?: string;
          institution?: string | null;
          organization_type?: OrganizationType;
          bio?: string | null;
          experience_years?: number;
          consultation_price?: number;
          consultation_duration_minutes?: number;
          verification_status?: VerificationStatus;
          rating?: number;
          total_consultations?: number;
          updated_at?: string;
        };
      };
      specializations: {
        Row: {
          id: string;
          name: string;
          category: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category?: string | null;
          created_at?: string;
        };
        Update: {
          name?: string;
          category?: string | null;
        };
      };
      expert_specializations: {
        Row: {
          expert_id: string;
          specialization_id: string;
        };
        Insert: {
          expert_id: string;
          specialization_id: string;
        };
        Update: {
          expert_id?: string;
          specialization_id?: string;
        };
      };
      cases: {
        Row: {
          id: string;
          farmer_id: string;
          expert_id: string | null;
          title: string;
          description: string;
          crop: string;
          problem_category: string | null;
          location: string | null;
          urgency: CaseUrgency;
          status: CaseStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          farmer_id: string;
          expert_id?: string | null;
          title: string;
          description: string;
          crop: string;
          problem_category?: string | null;
          location?: string | null;
          urgency?: CaseUrgency;
          status?: CaseStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          expert_id?: string | null;
          title?: string;
          description?: string;
          crop?: string;
          problem_category?: string | null;
          location?: string | null;
          urgency?: CaseUrgency;
          status?: CaseStatus;
          updated_at?: string;
        };
      };
      case_images: {
        Row: {
          id: string;
          case_id: string;
          storage_path: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          case_id: string;
          storage_path: string;
          created_at?: string;
        };
        Update: {
          storage_path?: string;
        };
      };
      consultations: {
        Row: {
          id: string;
          case_id: string;
          farmer_id: string;
          expert_id: string;
          scheduled_at: string | null;
          duration_minutes: number;
          price: number;
          status: ConsultationStatus;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          case_id: string;
          farmer_id: string;
          expert_id: string;
          scheduled_at?: string | null;
          duration_minutes?: number;
          price?: number;
          status?: ConsultationStatus;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          scheduled_at?: string | null;
          duration_minutes?: number;
          price?: number;
          status?: ConsultationStatus;
          notes?: string | null;
          updated_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          consultation_id: string;
          farmer_id: string;
          expert_id: string;
          rating: number | null;
          resolved_status: ResolvedStatus;
          feedback: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          consultation_id: string;
          farmer_id: string;
          expert_id: string;
          rating?: number | null;
          resolved_status: ResolvedStatus;
          feedback?: string | null;
          created_at?: string;
        };
        Update: {
          rating?: number | null;
          resolved_status?: ResolvedStatus;
          feedback?: string | null;
        };
      };
      tip_categories: {
        Row: {
          id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
        };
        Update: {
          name?: string;
        };
      };
      free_tips: {
        Row: {
          id: string;
          category_id: string | null;
          title: string;
          summary: string;
          content: string;
          image_url: string | null;
          language: PreferredLanguage;
          checkpoints: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id?: string | null;
          title: string;
          summary: string;
          content: string;
          image_url?: string | null;
          language?: PreferredLanguage;
          checkpoints?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          category_id?: string | null;
          title?: string;
          summary?: string;
          content?: string;
          image_url?: string | null;
          language?: PreferredLanguage;
          checkpoints?: Json;
          updated_at?: string;
        };
      };
    };
  };
}
