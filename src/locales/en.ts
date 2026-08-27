export const en = {
  appName: 'AgriSetu',
  splashTagline: 'The right agricultural expertise, when you need it.',
  greeting: 'Namaste',
  languageName: 'English',
  
  // First Time Language Selection
  chooseLanguageTitle: 'Choose your language',
  chooseLanguageSub: 'You can change this later from your profile.',
  continueBtn: 'Continue',

  // Role Selection
  howWillYouUseTitle: 'How will you use AgriSetu?',
  farmerPathTitle: "I'm a Farmer",
  farmerPathSub: 'Get practical help for your farm and connect with the right expert.',
  expertPathTitle: "I'm an Agricultural Expert",
  expertPathSub: 'Share your expertise, help farmers, and build your professional profile.',

  // Farmer Onboarding
  farmerStep1Title: "Let's get to know you",
  fullNameLabel: 'Full name',
  phoneNumberLabel: 'Phone number',
  farmerStep2Title: 'Where do you farm?',
  stateLabel: 'State',
  districtLabel: 'District',
  villageLabel: 'Village / Block (Optional)',
  farmerStep3Title: 'What do you grow?',
  selectCropsSub: 'Select all crops you grow in your fields',
  farmerFinishTitle: "You're all set.",
  continueToAgriSetu: 'Continue to AgriSetu',

  // Expert Onboarding
  expertStep1Title: 'Build your professional profile',
  professionalTitleLabel: 'Professional title',
  expertStep2Title: 'What do you specialize in?',
  expertStep3Title: 'Tell farmers about your experience',
  yearsExpLabel: 'Years of experience',
  regionsServedLabel: 'Regions served',
  shortBioLabel: 'Short bio',
  expertStep4Title: 'Set your consultation',
  priceLabel: 'Consultation price',
  durationLabel: 'Duration',
  availabilityLabel: 'Availability',
  createProfileBtn: 'Create my professional profile',

  // Common UI
  nextBtn: 'Next',
  backBtn: 'Back',
  stepOf: 'Step {current} of {total}',
  optional: 'Optional',

  // Home Screen
  cropHelpHeroEyebrow: 'CROP HELP IN 2 SECONDS',
  cropHelpHeroTitle: 'Facing a crop issue?',
  cropHelpHeroSub: 'Speak or take a photo for free guidance from agricultural scientists',
  speakProblem: 'Speak Problem',
  takeLeafPhoto: 'Take Leaf Photo',
  activeQueryTitle: 'My Active Query',
  activeQuerySub: 'Under review by KVK scientist',
  viewAll: 'View All',
  fieldAdvisoryTitle: 'Field Advisory Today',
  mandiRatesTitle: 'Mandi Rates Today',
  mandiRatesSub: 'Nagpur & nearby markets',
  availableExpertsTitle: 'Available Experts',
  availableExpertsSub: 'Certified scientists from ICAR & Agri Universities',
  seasonalAdviceTitle: 'Seasonal Crop Advice',
  seasonalAdviceSub: 'Crop rotation & organic farming best practices',

  // Ask Help Flow
  whatIsHappeningTitle: 'What is happening with your farm?',
  whatIsHappeningSub: 'Choose voice, camera, or text input.',
  speakTitle: '1. Speak in your language',
  speakSub: 'Tap mic button and describe your crop issue',
  tapToSpeak: 'Tap to Speak',
  listening: 'Listening...',
  reRecord: 'Re-record Voice',
  voiceTranscript: 'Voice Transcript:',
  photoTitle: '2. Take Leaf Photo',
  photoSub: 'Take photo of affected leaf or pest',
  typeTitle: '3. Type Question',
  typePlaceholder: 'e.g. Yellow spots on cotton leaf edges...',
  optionalDetails: 'Optional Details',
  selectCrop: 'Select Crop:',
  urgencyLevel: 'Urgency Level:',
  normalUrgency: 'Normal (24h response)',
  urgentUrgency: 'Urgent (Immediate scientist call)',
  continueToReview: 'Review Problem Summary',

  // Review Screen
  reviewTitle: 'We understood your problem',
  reviewSub: 'We interpreted your query to match with certified KVK agricultural experts.',
  crop: 'Crop',
  noticedIssue: 'What We Noticed',
  symptoms: 'Symptoms',
  categoryArea: 'Category Area',
  region: 'Region',
  urgency: 'Urgency',
  humanTrustNotice: 'This information is routed directly to ICAR & KVK agricultural scientists for verification.',
  isThisCorrect: 'Is this correct?',
  yesFindExpert: 'Yes, Find Expert',
  editInfo: 'Edit Information',

  // Expert Match
  foundExpertsTitle: 'We found {count} experts who can help',
  foundExpertsSub: 'Experts relevant to your specific Cotton leaf disease query',
  whyThisExpert: 'Why this expert?',
  consultationFee: 'Consultation Fee',
  availableNow: 'Available Now',
  offline: 'Offline',
  viewProfile: 'View Profile',
  bookConsultation: 'Book Consultation',

  // Free Tips
  usefulAdviceTitle: 'Useful advice, free for you',
  usefulAdviceSub: 'Practical agricultural knowledge scannable in 30 seconds.',
  checkpointsTitle: '30-Second Checkpoints:',
  readFullGuide: 'Read Full Guide',
  showLess: 'Show Less',
  stillNeedHelp: 'Still need help?',
  stillNeedHelpSub: 'Get direct advice from ICAR & KVK scientists for serious pest or disease outbreaks.',
  findAnExpertBtn: 'Find an Expert',

  // Expert Portal
  expertPortalTitle: 'AgriSetu Expert Management Portal',
  todaysRequests: "Today's requests",
  upcomingCalls: 'Upcoming calls',
  farmersHelped: 'Farmers helped',
  reportedResolution: 'Reported resolution',
  newRequestsTitle: 'New Requests',
  acceptRequest: 'Accept Request',
  declineRequest: 'Decline',
};

export type LocaleKeys = keyof typeof en;
