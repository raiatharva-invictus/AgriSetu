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
}

export class ProblemUnderstandingService {
  async processInput(
    rawText: string,
    language: string = 'en',
    userLocation: string = 'Nashik',
    photoAttached: boolean = false
  ): Promise<AgriculturalCaseDraft> {
    await new Promise((r) => setTimeout(r, 700));

    const lower = rawText.toLowerCase();

    let crop = 'Tomato';
    if (lower.includes('cotton') || lower.includes('कपास') || lower.includes('তুলো') || lower.includes('কপাহ')) {
      crop = 'Cotton';
    } else if (lower.includes('wheat') || lower.includes('गेहूं') || lower.includes('গম')) {
      crop = 'Wheat';
    } else if (lower.includes('rice') || lower.includes('धान') || lower.includes('ধান')) {
      crop = 'Rice / Paddy';
    } else if (lower.includes('chilli') || lower.includes('मिर्च') || lower.includes('লঙ্কা')) {
      crop = 'Chilli';
    }

    let problemCategory = 'Plant Pathology & Pest Control';
    if (lower.includes('fertilizer') || lower.includes('खाद') || lower.includes('সার') || lower.includes('soil')) {
      problemCategory = 'Soil Science & Crop Nutrition';
    } else if (lower.includes('water') || lower.includes('पानी') || lower.includes('জল') || lower.includes('drought')) {
      problemCategory = 'Irrigation & Water Management';
    }

    const symptoms: string[] = [];
    if (lower.includes('curl') || lower.includes('मुड़') || lower.includes('কোঁকড়ে')) {
      symptoms.push('Leaf Curling');
    }
    if (lower.includes('insect') || lower.includes('कीड़े') || lower.includes('পোকা') || lower.includes('pest')) {
      symptoms.push('Visible Pest Infestation');
    }
    if (lower.includes('spot') || lower.includes('धब्बे') || lower.includes('দাগ')) {
      symptoms.push('Leaf Spot Discoloration');
    }
    if (lower.includes('yellow') || lower.includes('पीले')) {
      symptoms.push('Chlorosis / Yellowing');
    }

    if (symptoms.length === 0) {
      symptoms.push('Leaf Damage / Stress Symptoms');
    }

    return {
      crop,
      problemCategory,
      symptoms,
      environmentFactors: ['High Temperature', 'Humidity / Recent Rainfall'],
      location: userLocation || 'Nashik',
      urgency: lower.includes('urgent') || lower.includes('fast') || lower.includes('तुरंत') ? 'High' : 'Normal',
      confidence: 0.88,
      rawTranscript: rawText,
      photoAttached,
    };
  }
}

export const problemUnderstandingService = new ProblemUnderstandingService();
