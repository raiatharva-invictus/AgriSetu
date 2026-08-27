import { LanguageCode } from '@/locales';
import { UserRole, FarmerProfile, AgriculturalExpert } from '@/types';

export interface UserSession {
  role: UserRole;
  language: LanguageCode;
  hasCompletedOnboarding: boolean;
  createdAt: string;
  farmerProfile?: Partial<FarmerProfile>;
  expertProfile?: Partial<AgriculturalExpert>;
}

export interface ISessionService {
  getSession(): Promise<UserSession | null>;
  saveSession(session: UserSession): Promise<void>;
  clearSession(): Promise<void>;
  getCurrentRole(): Promise<UserRole | null>;
  getPreferredLanguage(): Promise<LanguageCode | null>;
}

const SESSION_STORAGE_KEY = '@agrisetu_user_session_v1';

/**
 * Local device session persistence adapter.
 * Abstracted so Supabase Auth & profiles table can replace local storage seamlessly.
 */
export class LocalDeviceSessionAdapter implements ISessionService {
  private inMemorySession: UserSession | null = null;

  async getSession(): Promise<UserSession | null> {
    if (this.inMemorySession) {
      return this.inMemorySession;
    }

    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = window.localStorage.getItem(SESSION_STORAGE_KEY);
        if (stored) {
          this.inMemorySession = JSON.parse(stored);
          return this.inMemorySession;
        }
      }
    } catch (e) {
      console.warn('Session reading warning:', e);
    }
    return null;
  }

  async saveSession(session: UserSession): Promise<void> {
    this.inMemorySession = session;
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
      }
    } catch (e) {
      console.warn('Session save warning:', e);
    }
  }

  async clearSession(): Promise<void> {
    this.inMemorySession = null;
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(SESSION_STORAGE_KEY);
        window.localStorage.clear();
      }
    } catch (e) {
      console.warn('Session clear warning:', e);
    }
  }

  async getCurrentRole(): Promise<UserRole | null> {
    const session = await this.getSession();
    return session ? session.role : null;
  }

  async getPreferredLanguage(): Promise<LanguageCode | null> {
    const session = await this.getSession();
    return session ? session.language : null;
  }
}

export const sessionService = new LocalDeviceSessionAdapter();
