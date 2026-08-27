import { problemUnderstandingService, AgriculturalCaseDraft } from './problemUnderstandingService';
import { imageAnalysisService, ImageObservationResult } from './imageAnalysisService';

export class AIService {
  async understandProblem(
    text: string,
    language: string,
    location: string,
    photoAttached: boolean
  ): Promise<AgriculturalCaseDraft> {
    return problemUnderstandingService.processInput(text, language, location, photoAttached);
  }

  async analyzeImage(imageUri: string): Promise<ImageObservationResult> {
    return imageAnalysisService.analyzeCropImage(imageUri);
  }

  async generateCaseSummary(draft: AgriculturalCaseDraft): Promise<string> {
    return `${draft.crop} case in ${draft.location}: ${draft.symptoms.join(', ')}. Category: ${draft.problemCategory}.`;
  }
}

export const aiService = new AIService();
