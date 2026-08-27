import { LocaleKeys } from './en';

export const bn: Record<LocaleKeys, string> = {
  appName: 'কৃষি সেতু',
  splashTagline: 'সঠিক সময় সঠিক কৃষি পরামর্শ।',
  greeting: 'নমস্কার',
  languageName: 'বাংলা',
  
  // First Time Language Selection
  chooseLanguageTitle: 'আপনার ভাষা নির্বাচন করুন',
  chooseLanguageSub: 'আপনি এটি পরে আপনার প্রোফাইল থেকে পরিবর্তন করতে পারেন।',
  continueBtn: 'এগিয়ে যান',

  // Role Selection
  howWillYouUseTitle: 'আপনি কীভাবে কৃষি সেতু ব্যবহার করবেন?',
  farmerPathTitle: 'আমি একজন কৃষক',
  farmerPathSub: 'আপনার খামারের জন্য বাস্তবসম্মত পরামর্শ পান এবং সঠিক বিশেষজ্ঞদের সাথে যুক্ত হন।',
  expertPathTitle: 'আমি একজন কৃষি বিশেষজ্ঞ',
  expertPathSub: 'আপনার অভিজ্ঞতা ভাগ করুন, কৃষকদের সাহায্য করুন এবং পেশাদার প্রোফাইল তৈরি করুন।',

  // Farmer Onboarding
  farmerStep1Title: 'আপনার সাথে পরিচিত হওয়া যাক',
  fullNameLabel: 'আপনার পুরো নাম',
  phoneNumberLabel: 'ফোন নম্বর',
  farmerStep2Title: 'আপনার খামার কোথায় অবস্থিত?',
  stateLabel: 'রাজ্য',
  districtLabel: 'জেলা',
  villageLabel: 'গ্রাম / ব্লক (ঐচ্ছিক)',
  farmerStep3Title: 'আপনি কী কী চাষ করেন?',
  selectCropsSub: 'আপনার প্রধান ফসলগুলি নির্বাচন করুন',
  farmerFinishTitle: 'আপনার প্রোফাইল প্রস্তুত।',
  continueToAgriSetu: 'কৃষি সেতু শুরু করুন',

  // Expert Onboarding
  expertStep1Title: 'আপনার পেশাদার প্রোফাইল তৈরি করুন',
  professionalTitleLabel: 'পদবি',
  expertStep2Title: 'আপনার প্রধান দক্ষতা কী?',
  expertStep3Title: 'কৃষকদের আপনার অভিজ্ঞতার কথা বলুন',
  yearsExpLabel: 'অভিজ্ঞতা (বছর)',
  regionsServedLabel: 'কর্মক্ষেত্র / জেলা',
  shortBioLabel: 'সংক্ষিপ্ত বিবরণ',
  expertStep4Title: 'পরামর্শ ফি নির্বাচন করুন',
  priceLabel: 'পরামর্শ ফি',
  durationLabel: 'সময়কাল',
  availabilityLabel: 'উপলব্ধতা',
  createProfileBtn: 'প্রোফাইল তৈরি করে শুরু করুন',

  // Common UI
  nextBtn: 'পরবর্তী',
  backBtn: 'পিছনে',
  stepOf: 'ধাপ {current} / {total}',
  optional: 'ঐচ্ছিক',

  // Home Screen
  cropHelpHeroEyebrow: 'ফসল সুরক্ষা ও পরামর্শ (২ সেকেন্ডে)',
  cropHelpHeroTitle: 'আপনার ক্ষেতে কি কোনো সমস্যা আছে?',
  cropHelpHeroSub: 'কৃষি বিজ্ঞানীদের থেকে বিনামূল্যে পরামর্শ পেতে কথা বলুন বা ছবি তুলুন',
  speakProblem: 'কথা বলে বলুন',
  takeLeafPhoto: 'ছবি তুলুন',
  activeQueryTitle: 'আপনার সক্রিয় প্রশ্ন',
  activeQuerySub: 'কৃষি বিজ্ঞানী দ্বারা পর্যালোচনা চলছে',
  viewAll: 'সব দেখুন',
  fieldAdvisoryTitle: 'আজকের মাঠের পরামর্শ',
  mandiRatesTitle: 'আজকের বাজার দর',
  mandiRatesSub: 'নিকটস্থ শস্য বাজার',
  availableExpertsTitle: 'উপলব্ধ কৃষি বিশেষজ্ঞ',
  availableExpertsSub: 'ICAR এবং কৃষি বিশ্ববিদ্যালয়ের প্রত্যয়িত বিজ্ঞানী',
  seasonalAdviceTitle: 'মরসুমী চাষের টিপস',
  seasonalAdviceSub: 'ফসল পর্যায়ক্রম ও জৈব চাষের পদ্ধতি',

  // Ask Help Flow
  whatIsHappeningTitle: 'আপনার ক্ষেতে কি সমস্যা হচ্ছে?',
  whatIsHappeningSub: 'ভয়েস, ক্যামেরা বা টেক্সটের মাধ্যমে জানান।',
  speakTitle: '১. আপনার ভাষায় বলুন',
  speakSub: 'মাইক বোতাম টিপে আপনার ফসলের সমস্যা বলুন',
  tapToSpeak: 'বলতে স্পর্শ করুন',
  listening: 'রেকর্ডিং চলছে...',
  reRecord: 'পুনরায় রেকর্ড করুন',
  voiceTranscript: 'আপনার বলা কথা:',
  photoTitle: '২. পাতার ছবি তুলুন',
  photoSub: 'আক্রান্ত পাতা বা পোকার ছবি তুলুন',
  typeTitle: '৩. টাইপ করে লিখুন',
  typePlaceholder: 'যেমন: তুলো পাতার প্রান্তে হলুদ দাগ...',
  optionalDetails: 'অতিরিক্ত বিবরণ (ঐচ্ছিক)',
  selectCrop: 'ফসল নির্বাচন করুন:',
  urgencyLevel: 'জরুরি মাত্রা:',
  normalUrgency: 'সাধারণ (২৪ ঘণ্টায় উত্তর)',
  urgentUrgency: 'জরুরি (তাত্ক্ষণিক বিজ্ঞানী কল)',
  continueToReview: 'পরবর্তী ধাপ (বিবরণ পরীক্ষা)',

  // Review Screen
  reviewTitle: 'আমরা আপনার সমস্যা বুঝতে পেরেছি',
  reviewSub: 'আমরা আপনার কথা কৃষি বিজ্ঞানীদের সাথে মেলাতে বিশ্লেষণ করেছি।',
  crop: 'ফসল',
  noticedIssue: 'যা দেখা গেছে',
  symptoms: 'প্রধান লক্ষণ',
  categoryArea: 'বিভাগ',
  region: 'অঞ্চল',
  urgency: 'জরুরি মাত্রা',
  humanTrustNotice: 'এই তথ্য সরাসরি ICAR এবং KVK কৃষি বিজ্ঞানীদের কাছে পৌঁছাবে।',
  isThisCorrect: 'এই তথ্য কি সঠিক?',
  yesFindExpert: 'হ্যাঁ, কৃষি বিশেষজ্ঞ খুঁজুন',
  editInfo: 'সংশোধন করুন',

  // Expert Match
  foundExpertsTitle: 'আপনার সমস্যার জন্য {count} জন বিশেষজ্ঞ পাওয়া গেছে',
  foundExpertsSub: 'আপনার শস্য সমস্যার জন্য সবচেয়ে উপযুক্ত বিজ্ঞানী',
  whyThisExpert: 'কেন এই বিশেষজ্ঞ উপযুক্ত?',
  consultationFee: 'পরামর্শ ফি',
  availableNow: 'আজ উপলব্ধ',
  offline: 'অফলাইন',
  viewProfile: 'প্রোফাইল দেখুন',
  bookConsultation: 'কথা বলুন',

  // Free Tips
  usefulAdviceTitle: 'দরকারী পরামর্শ, আপনার জন্য বিনামূল্যে',
  usefulAdviceSub: 'ব্যবহারিক কৃষি জ্ঞান যা ৩০ সেকেন্ডে পড়া যায়।',
  checkpointsTitle: '৩০-সেকেন্ডের চেকলিস্ট:',
  readFullGuide: 'সম্পূর্ণ বিবরণ পড়ুন',
  showLess: 'কম দেখান',
  stillNeedHelp: 'আপনার কি এখনও সাহায্যের প্রয়োজন?',
  stillNeedHelpSub: 'গুরুতর পোকার আক্রমণ বা রোগের জন্য সরাসরি বিজ্ঞানীদের সাথে কথা বলুন।',
  findAnExpertBtn: 'কৃষি বিশেষজ্ঞের সাথে কথা বলুন',

  // Expert Portal
  expertPortalTitle: 'কৃষি সেতু বিশেষজ্ঞ পোর্টাল',
  todaysRequests: 'আজকের নতুন অনুরোধ',
  upcomingCalls: 'আসন্ন কল',
  farmersHelped: 'কৃষকদের সাহায্য করা হয়েছে',
  reportedResolution: 'সমাধানের হার',
  newRequestsTitle: 'নতুন পরামর্শ অনুরোধ',
  acceptRequest: 'গ্রহণ করুন',
  declineRequest: 'বাতিল করুন',
};
