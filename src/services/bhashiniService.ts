import { LanguageCode } from '@/locales';

export interface IBhashiniLanguageService {
  speechToText(audioUri: string, sourceLang: LanguageCode): Promise<string>;
  translate(text: string, sourceLang: LanguageCode, targetLang: LanguageCode): Promise<string>;
  textToSpeech(text: string, targetLang: LanguageCode): Promise<string>;
}

/**
 * BHASHINI AI Mock Service Adapter.
 * Prepared for live API key insertion (Bhashini Pipeline API v2).
 */
export class BhashiniMockAdapter implements IBhashiniLanguageService {
  async speechToText(audioUri: string, sourceLang: LanguageCode): Promise<string> {
    // Simulated network speech recognition delay
    await new Promise((res) => setTimeout(res, 800));

    switch (sourceLang) {
      case 'hi':
        return 'कपास के पत्तों पर लाल धब्बे आ रहे हैं और पत्ते ऊपर की तरफ मुड़ रहे हैं। उपचारात्मक उपाय बताएं।';
      case 'bn':
        return 'তুলো পাতার প্রান্তে লাল দাগ দেখা যাচ্ছে এবং পাতাগুলি কোঁকড়ে যাচ্ছে। প্রতিকার বলুন।';
      case 'as':
        return 'কপাহ পাতৰ কাষত ৰঙা দাগ দেখা গৈছে আৰু পাতবোৰ কোঁচ খাই গৈছে। উপায় কওক।';
      case 'en':
      default:
        return 'Yellowish and reddish curling spots on cotton leaf edges. Need pest control advice.';
    }
  }

  async translate(text: string, sourceLang: LanguageCode, targetLang: LanguageCode): Promise<string> {
    await new Promise((res) => setTimeout(res, 400));
    if (sourceLang === targetLang) return text;
    
    // Simulating instant neural translation across regional languages
    return `[BHASHINI AI Translated to ${targetLang.toUpperCase()}]: ${text}`;
  }

  async textToSpeech(text: string, targetLang: LanguageCode): Promise<string> {
    await new Promise((res) => setTimeout(res, 500));
    // Returns synthetic audio stream URL
    return `https://cdn.agrisetu.org/audio/tts_${targetLang}_${Date.now()}.mp3`;
  }
}

export const bhashiniService = new BhashiniMockAdapter();
