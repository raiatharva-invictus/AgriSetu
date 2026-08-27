import { LanguageCode } from '@/locales';

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

export interface CaseImage {
  id: string;
  caseId: string;
  uri: string;
  createdAt: string;
}

export interface Consultation {
  id: string;
  caseId: string;
  farmerId: string;
  expertId: string;
  expertName: string;
  expertTitle: string;
  expertAvatarUrl?: string;
  scheduledAt: string;
  durationMinutes: number;
  price: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  matchRationale?: string[];
}

export interface CaseOutcome {
  id: string;
  caseId: string;
  status: 'resolved' | 'partially_resolved' | 'unresolved';
  feedback?: string;
  recordedAt: string;
}

export interface Case {
  id: string;
  farmerId: string;
  farmerName: string;
  location: string;
  cropName: string;
  problemTitle: string;
  description: string;
  urgency: 'Normal' | 'Urgent';
  status: CaseStatus;
  createdAt: string;
  updatedAt: string;
  
  // Relations / Extended details
  images?: CaseImage[];
  consultation?: Consultation;
  outcome?: CaseOutcome;
  assignedExpertId?: string;
  assignedExpertName?: string;
}

/**
 * Human-readable status mapping helper.
 * Decouples raw backend enum strings from user-facing text.
 */
export function getCaseStatusLabel(status: CaseStatus, lang: LanguageCode = 'en'): string {
  const mappings: Record<CaseStatus, Record<LanguageCode, string>> = {
    new: {
      en: 'New',
      hi: 'नई समस्या',
      bn: 'নতুন সমস্যা',
      as: 'নতুন সমস্যা',
    },
    matched: {
      en: 'Expert Matched',
      hi: 'विशेषज्ञ मिला',
      bn: 'বিশেষজ্ঞ মিলেছে',
      as: 'বিশেষজ্ঞ মিলিল',
    },
    consultation_pending: {
      en: 'Consultation Pending',
      hi: 'परामर्श लंबित',
      bn: 'পরামর্শ পেন্ডিং',
      as: 'পৰামৰ্শ বাকী',
    },
    scheduled: {
      en: 'Call Scheduled',
      hi: 'कॉल समय निर्धारित',
      bn: 'কল নির্ধারিত',
      as: 'কল নিৰ্ধাৰিত',
    },
    in_consultation: {
      en: 'In Consultation',
      hi: 'परामर्श जारी',
      bn: 'পরামর্শ চলছে',
      as: 'পৰামৰ্শ চলি আছে',
    },
    follow_up: {
      en: 'Follow-up',
      hi: 'अनुवर्ती जांच (Follow-up)',
      bn: 'ফলো-আপ',
      as: 'ফলো-আপ',
    },
    resolved: {
      en: 'Resolved',
      hi: 'समाधान हो गया',
      bn: 'সমাধান হয়েছে',
      as: 'সমাধান হ’ল',
    },
    partially_resolved: {
      en: 'Partially resolved',
      hi: 'आंशिक रूप से ठीक',
      bn: 'আংশিক সমাধান',
      as: 'আংশিক সমাধান',
    },
    unresolved: {
      en: 'Still unresolved',
      hi: 'अभी भी असमाधान',
      bn: 'এখনও সমাধান হয়নি',
      as: 'এতিয়াও সমাধান হোৱা নাই',
    },
    cancelled: {
      en: 'Cancelled',
      hi: 'रद्द कर दिया',
      bn: 'বাতিল',
      as: 'বাতিল',
    },
  };

  return mappings[status]?.[lang] || mappings[status]?.['en'] || status;
}
