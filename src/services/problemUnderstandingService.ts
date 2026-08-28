import { supabase } from '@/lib/supabase';

export interface AgriculturalCaseDraft {
  crop: string;
  problemCategory: string;
  symptoms: string[];
  environmentFactors: string[];
  location: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Normal';
  confidence: number; // Structuring/interpretation step confidence (0.0 to 1.0)
  rawTranscript?: string;
  photoAttached?: boolean;
  isLiveProvider?: boolean;
  provider?: string;
  modelUsed?: string;
  additionalQuestions?: string[];
}

export class ProblemUnderstandingService {
  async processInput(
    rawText: string,
    language: string = 'en',
    userLocation: string = 'Nashik',
    photoAttached: boolean = false
  ): Promise<AgriculturalCaseDraft> {
    console.log('AI_FLOW: input_received', { rawText, language, userLocation, photoAttached });

    // 1. Attempt live call to Supabase Edge Function (server-side GEMINI_API_KEY)
    try {
      console.log('AI_FLOW: service_called -> ai-understand-case');
      const { data, error } = await supabase.functions.invoke('ai-understand-case', {
        body: {
          text: rawText,
          language,
          location: userLocation,
          photoAttached,
          model: 'gemini-3.6-flash',
        },
      });

      console.log('AI_FLOW: result_received', { error, dataStatus: data?.status, isLiveProvider: data?.isLiveProvider });

      if (!error && data && data.crop) {
        return {
          crop: data.crop,
          problemCategory: data.problemCategory || 'Plant Pathology & Pest Control',
          symptoms: data.symptoms || ['Crop Symptom Analysis'],
          environmentFactors: data.environmentFactors || ['Environmental Factors'],
          location: data.location || userLocation || 'Nashik',
          urgency: data.urgency || 'Normal',
          confidence: data.confidence || 0.95,
          rawTranscript: rawText,
          photoAttached,
          isLiveProvider: true,
          provider: 'gemini',
          modelUsed: data.modelUsed || 'gemini-3.6-flash',
          additionalQuestions: data.additionalQuestions || ['Are specific spots or lesions visible on the plant?'],
        };
      }
    } catch (e) {
      console.log('AI_FLOW: Edge Function ai-understand-case exception:', e);
    }

    // 2. Resilient dynamic fallback client-side parser (marked clearly as fallback)
    console.log('AI_FLOW: executing fallback dynamic parser (isLiveProvider = false)');
    await new Promise((r) => setTimeout(r, 300));

    const lower = rawText.toLowerCase();

    let crop = 'General Crop';
    if (lower.includes('sugarcane') || lower.includes('गन्ना') || lower.includes('आख')) {
      crop = 'Sugarcane';
    } else if (lower.includes('cotton') || lower.includes('कपास') || lower.includes('তুলো') || lower.includes('कपाह')) {
      crop = 'Cotton';
    } else if (lower.includes('tomato') || lower.includes('टमाटर') || lower.includes('टमाटो')) {
      crop = 'Tomato';
    } else if (lower.includes('wheat') || lower.includes('गेहूं') || lower.includes('गम')) {
      crop = 'Wheat';
    } else if (lower.includes('rice') || lower.includes('paddy') || lower.includes('धान')) {
      crop = 'Rice / Paddy';
    } else if (lower.includes('chilli') || lower.includes('मिर्च') || lower.includes('लंका')) {
      crop = 'Chilli';
    }

    let problemCategory = 'Plant Pathology & Pest Control';
    if (lower.includes('fertilizer') || lower.includes('खाद') || lower.includes('সার') || lower.includes('soil')) {
      problemCategory = 'Soil Science & Crop Nutrition';
    } else if (lower.includes('water') || lower.includes('पानी') || lower.includes('जल') || lower.includes('drought')) {
      problemCategory = 'Irrigation & Water Management';
    }

    const symptoms: string[] = [];
    if (lower.includes('curl') || lower.includes('मुड़')) {
      symptoms.push('Leaf Curling');
    }
    if (lower.includes('insect') || lower.includes('कीड़े') || lower.includes('pest') || lower.includes('underneath')) {
      symptoms.push('Pest Infestation');
    }
    if (lower.includes('patch') || lower.includes('spot') || lower.includes('धब्बे') || lower.includes('reddish') || lower.includes('brown')) {
      symptoms.push('Reddish-Brown Lesions / Spots');
    }
    if (lower.includes('yellow') || lower.includes('पीले')) {
      symptoms.push('Chlorosis / Yellowing');
    }
    if (lower.includes('weak') || lower.includes('कमजोर') || lower.includes('wilt')) {
      symptoms.push('Plant Weakness / Wilting');
    }

    if (symptoms.length === 0) {
      symptoms.push(rawText.length > 5 ? rawText.substring(0, 40) : 'Unspecified Leaf Damage');
    }

    return {
      crop,
      problemCategory,
      symptoms,
      environmentFactors: ['Local Field Environment'],
      location: userLocation || 'Nashik',
      urgency: lower.includes('urgent') || lower.includes('fast') || lower.includes('तुरंत') ? 'High' : 'Normal',
      confidence: 0.85,
      rawTranscript: rawText,
      photoAttached,
      isLiveProvider: false,
      provider: 'local-fallback',
      modelUsed: 'rule-engine',
      additionalQuestions: ['What color are the affected leaves or stems?'],
    };
  }
}

export const problemUnderstandingService = new ProblemUnderstandingService();
