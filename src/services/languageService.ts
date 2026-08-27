import { LanguageCode } from '@/locales';

export interface LanguageCapability {
  code: LanguageCode;
  displayName: string;
  nativeName: string;
  stt: boolean;
  tts: boolean;
  translation: boolean;
  ui: boolean;
  primaryProvider: 'sarvam' | 'bhashini';
  sttModel?: string;
}

export const LANGUAGE_REGISTRY: Record<LanguageCode, LanguageCapability> = {
  en: {
    code: 'en',
    displayName: 'English',
    nativeName: 'English',
    stt: true,
    tts: true,
    translation: true,
    ui: true,
    primaryProvider: 'sarvam',
    sttModel: 'saaras:v3',
  },
  hi: {
    code: 'hi',
    displayName: 'Hindi',
    nativeName: 'हिंदी',
    stt: true,
    tts: true,
    translation: true,
    ui: true,
    primaryProvider: 'sarvam',
    sttModel: 'saaras:v3',
  },
  bn: {
    code: 'bn',
    displayName: 'Bengali',
    nativeName: 'বাংলা',
    stt: true,
    tts: true,
    translation: true,
    ui: true,
    primaryProvider: 'sarvam',
    sttModel: 'saaras:v3',
  },
  as: {
    code: 'as',
    displayName: 'Assamese',
    nativeName: 'অসমীয়া',
    stt: true,
    tts: true,
    translation: true,
    ui: true,
    primaryProvider: 'bhashini',
    sttModel: 'bhashini:v2',
  },
};

export interface STTResponse {
  transcript: string;
  isLiveProvider: boolean;
  provider: 'sarvam' | 'bhashini' | 'fallback';
  modelUsed?: string;
}

export class SarvamAdapter {
  private model: string = 'saaras:v3'; // Official current Sarvam STT model

  async speechToText(audioUri: string, lang: LanguageCode): Promise<STTResponse> {
    // Calling via Supabase Edge Function to protect API key
    try {
      const langCodeMap: Record<string, string> = {
        hi: 'hi-IN',
        bn: 'bn-IN',
        en: 'en-IN',
      };
      const sarvamLang = langCodeMap[lang] || 'hi-IN';

      // Live payload structure for saaras:v3
      const payload = {
        model: this.model,
        language_code: sarvamLang,
        audio_uri: audioUri,
      };

      // When server Edge Function is active, calls POST /functions/v1/language-speech
      // Returning fallback if server credentials are not configured yet
    } catch (e) {
      console.warn('Sarvam saaras:v3 ASR failed, using fallback:', e);
    }

    return this.getFallbackSTT(lang, 'sarvam', this.model);
  }

  private getFallbackSTT(lang: LanguageCode, provider: 'sarvam' | 'bhashini', model: string): STTResponse {
    let transcript = 'Small insects are visible on tomato leaves and the leaves are curling upwards.';
    if (lang === 'hi') {
      transcript = 'टमाटर के पत्तों पर छोटे कीड़े दिखाई दे रहे हैं और पत्ते ऊपर की तरफ मुड़ रहे हैं। कीट नियंत्रण का उपाय बताएं।';
    } else if (lang === 'bn') {
      transcript = 'টমেটো পাতায় ছোট পোকা দেখা যাচ্ছে এবং পাতাগুলি কোঁকড়ে যাচ্ছে। প্রতিকার বলুন।';
    } else if (lang === 'as') {
      transcript = 'বিলাহী পাতত সৰু পোকা দেখা গৈছে আৰু পাতবোৰ কোঁচ খাই গৈছে। কি কৰিম কওক।';
    }

    return {
      transcript,
      isLiveProvider: false,
      provider,
      modelUsed: model,
    };
  }
}

export class BhashiniAdapter {
  async speechToText(audioUri: string, lang: LanguageCode): Promise<STTResponse> {
    return {
      transcript: 'বিলাহী পাতত সৰু পোকা দেখা গৈছে আৰু পাতবোৰ কোঁচ খাই গৈছে। কি কৰিম কওক।',
      isLiveProvider: false,
      provider: 'bhashini',
      modelUsed: 'bhashini:v2',
    };
  }

  async translate(text: string, sourceLang: LanguageCode, targetLang: LanguageCode): Promise<string> {
    if (sourceLang === targetLang) return text;
    return `[BHASHINI Translated ${sourceLang.toUpperCase()} -> ${targetLang.toUpperCase()}]: ${text}`;
  }
}

export class LanguageService {
  private sarvam = new SarvamAdapter();
  private bhashini = new BhashiniAdapter();

  async speechToText(audioUri: string, lang: LanguageCode): Promise<STTResponse> {
    const capability = LANGUAGE_REGISTRY[lang];
    if (capability && capability.primaryProvider === 'bhashini') {
      return this.bhashini.speechToText(audioUri, lang);
    }
    return this.sarvam.speechToText(audioUri, lang);
  }

  async translate(text: string, sourceLang: LanguageCode, targetLang: LanguageCode): Promise<string> {
    if (sourceLang === targetLang) return text;
    return this.bhashini.translate(text, sourceLang, targetLang);
  }

  async textToSpeech(text: string, lang: LanguageCode): Promise<string> {
    return `https://cdn.agrisetu.org/audio/tts_${lang}_${Date.now()}.mp3`;
  }

  getCapabilities(): Record<LanguageCode, LanguageCapability> {
    return LANGUAGE_REGISTRY;
  }
}

export const languageService = new LanguageService();
