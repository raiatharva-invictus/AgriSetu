import { AgriculturalExpert } from '@/types';
import { CaseStatus } from '@/types/case';

export interface StructuredCase {
  id: string;
  farmerId: string;
  crop: string;
  problemCategory: string;
  description: string;
  location?: string;
  urgency: 'Normal' | 'Urgent';
  status: CaseStatus;
  imageUrls?: string[];
}

export interface RankedExpert {
  expert: AgriculturalExpert;
  score: number; // 0 to 100
  matchFactors: string[];
  whyThisExpert: string[];
}

/**
 * AgriSetu Expert Matching Engine
 * 
 * Scores and ranks agricultural experts for a structured crop case using a weighted multi-factor algorithm:
 * - Problem expertise: 30%
 * - Crop expertise: 25%
 * - Regional relevance: 15%
 * - Similar case history: 10%
 * - Experience: 10%
 * - Availability: 5%
 * - Affordability: 5%
 * 
 * Decoupled from UI and raw user input so AI problem extraction (Voice STT -> AI Case model)
 * feeds directly into this engine without modification.
 */
export class ExpertMatchingEngine {
  public rankExperts(
    structuredCase: StructuredCase,
    experts: AgriculturalExpert[]
  ): RankedExpert[] {
    const cropLower = structuredCase.crop.toLowerCase();
    const problemLower = (structuredCase.problemCategory + ' ' + structuredCase.description).toLowerCase();
    const locationLower = (structuredCase.location || 'nagpur maharashtra').toLowerCase();

    const ranked = experts.map((expert) => {
      const reasons: string[] = [];
      const factors: string[] = [];

      // 1. Problem Expertise (30%)
      let problemScore = 0;
      const expertSpecialties = expert.specialty.map((s) => s.toLowerCase());
      const hasProblemMatch = expertSpecialties.some((s) =>
        problemLower.includes(s) || s.includes(structuredCase.problemCategory.toLowerCase())
      );
      if (hasProblemMatch) {
        problemScore = 30;
        const mainSpecialty = expert.specialty[0] || 'Crop Protection';
        reasons.push(`${mainSpecialty} expertise`);
        factors.push('Problem specialty match');
      } else {
        problemScore = 15; // Partial default credit for certified agronomists
      }

      // 2. Crop Expertise (25%)
      let cropScore = 0;
      const expertHeadline = expert.designation.toLowerCase() + ' ' + expert.institution.toLowerCase();
      const hasCropMatch =
        expertSpecialties.some((s) => s.includes(cropLower) || cropLower.includes(s)) ||
        expertHeadline.includes(cropLower);

      if (hasCropMatch) {
        cropScore = 25;
        reasons.push(`${structuredCase.crop} specialist`);
        factors.push('Direct crop specialization');
      } else {
        cropScore = 12; // General crop science baseline
      }

      // 3. Regional Relevance (15%)
      let regionScore = 0;
      if (
        locationLower.includes('nagpur') ||
        locationLower.includes('vidarbha') ||
        locationLower.includes('maharashtra') ||
        expertHeadline.includes('icar') ||
        expertHeadline.includes('cicr')
      ) {
        regionScore = 15;
        reasons.push('Works in your region (Vidarbha / Maharashtra)');
        factors.push('Regional agro-climatic proximity');
      } else {
        regionScore = 8;
      }

      // 4. Similar Case History (10%)
      const casesCount = expert.relevantCaseCount || expert.consultationsCompleted || 12;
      let historyScore = Math.min(10, Math.round((casesCount / 40) * 10));
      reasons.push(`${casesCount}+ similar crop cases solved`);
      factors.push('Proven case history');

      // 5. Experience (10%)
      let expScore = Math.min(10, Math.round((expert.experienceYears / 20) * 10));
      factors.push(`${expert.experienceYears} years active field experience`);

      // 6. Availability (5%)
      let availScore = expert.isOnline ? 5 : 3;

      // 7. Affordability (5%)
      let feeScore = expert.feeText.toLowerCase().includes('free') ? 5 : 4;

      // Total Normalized Score (0 - 100)
      const rawTotal =
        problemScore + cropScore + regionScore + historyScore + expScore + availScore + feeScore;
      const normalizedScore = Math.min(99, Math.max(75, Math.round(rawTotal)));

      return {
        expert: {
          ...expert,
          matchPercentage: normalizedScore,
          whyThisExpert: reasons,
        },
        score: normalizedScore,
        matchFactors: factors,
        whyThisExpert: reasons,
      };
    });

    // Rank descending by match score
    return ranked.sort((a, b) => b.score - a.score);
  }
}

export const matchingEngine = new ExpertMatchingEngine();
