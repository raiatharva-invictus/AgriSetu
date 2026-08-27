import { LocaleKeys } from './en';

export const hi: Record<LocaleKeys, string> = {
  appName: 'कृषिसेतु',
  splashTagline: 'सही कृषि सलाह, जब आपको ज़रूरत हो।',
  greeting: 'नमस्ते',
  languageName: 'हिन्दी',
  
  // First Time Language Selection
  chooseLanguageTitle: 'अपनी भाषा चुनें',
  chooseLanguageSub: 'आप इसे बाद में अपनी प्रोफाइल से बदल सकते हैं।',
  continueBtn: 'आगे बढ़ें',

  // Role Selection
  howWillYouUseTitle: 'आप कृषिसेतु का उपयोग कैसे करेंगे?',
  farmerPathTitle: 'मैं किसान हूँ',
  farmerPathSub: 'अपने खेत के लिए व्यावहारिक सलाह पाएं और सही कृषि विशेषज्ञ से जुड़ें।',
  expertPathTitle: 'मैं कृषि विशेषज्ञ हूँ',
  expertPathSub: 'अपनी विशेषज्ञता साझा करें, किसानों की मदद करें और अपनी प्रोफाइल बनाएं।',

  // Farmer Onboarding
  farmerStep1Title: 'आइए आपके बारे में जानें',
  fullNameLabel: 'आपका पूरा नाम',
  phoneNumberLabel: 'फ़ोन नंबर',
  farmerStep2Title: 'आप कहाँ खेती करते हैं?',
  stateLabel: 'राज्य',
  districtLabel: 'ज़िला',
  villageLabel: 'गाँव / ब्लॉक (ऐच्छिक)',
  farmerStep3Title: 'आप क्या उगाते हैं?',
  selectCropsSub: 'अपनी मुख्य फसलों का चयन करें',
  farmerFinishTitle: 'आपकी प्रोफाइल तैयार है।',
  continueToAgriSetu: 'कृषिसेतु शुरू करें',

  // Expert Onboarding
  expertStep1Title: 'अपनी व्यावसायिक प्रोफाइल बनाएं',
  professionalTitleLabel: 'पदनाम / पद',
  expertStep2Title: 'आपकी मुख्य विशेषज्ञता क्या है?',
  expertStep3Title: 'किसानों को अपने अनुभव के बारे में बताएं',
  yearsExpLabel: 'अनुभव (वर्ष)',
  regionsServedLabel: 'कार्य क्षेत्र / ज़िले',
  shortBioLabel: 'संक्षिप्त विवरण',
  expertStep4Title: 'सलाह व परामर्श दर चुनें',
  priceLabel: 'परामर्श शुल्क',
  durationLabel: 'अवधि',
  availabilityLabel: 'उपलब्धता',
  createProfileBtn: 'प्रोफाइल बनाएं व शुरू करें',

  // Common UI
  nextBtn: 'आगे बढ़ें',
  backBtn: 'पीछे',
  stepOf: 'चरण {current} / {total}',
  optional: 'ऐच्छिक',

  // Home Screen
  cropHelpHeroEyebrow: 'फसल सुरक्षा व सलाह (2 सेकंड में)',
  cropHelpHeroTitle: 'खेत में कोई परेशानी है?',
  cropHelpHeroSub: 'कृषि वैज्ञानिकों से निःशुल्क सलाह पाने के लिए बोलें या फोटो खींचें',
  speakProblem: 'बोलकर पूछें',
  takeLeafPhoto: 'फोटो खींचें',
  activeQueryTitle: 'आपकी सक्रिय समस्याएं',
  activeQuerySub: 'कृषि वैज्ञानिक द्वारा समीक्षा जारी',
  viewAll: 'सभी देखें',
  fieldAdvisoryTitle: 'आज की खेत सलाह',
  mandiRatesTitle: 'मंडी आज का भाव',
  mandiRatesSub: 'नागपुर व आस-पास की मंडियां',
  availableExpertsTitle: 'उपलब्ध कृषि विशेषज्ञ',
  availableExpertsSub: 'ICAR व कृषि विश्वविद्यालय के प्रमाणित वैज्ञानिक',
  seasonalAdviceTitle: 'मौसमी खेती टिप्स',
  seasonalAdviceSub: 'फसल चक्र व जैविक खेती के उपाय',

  // Ask Help Flow
  whatIsHappeningTitle: 'आपके खेत में क्या समस्या है?',
  whatIsHappeningSub: 'बोलकर, फोटो खींचकर, या टाइप करके बताएं।',
  speakTitle: '1. अपनी भाषा में बोलें',
  speakSub: 'माइक बटन दबाएं और फसल की समस्या बोलकर बताएं',
  tapToSpeak: 'बोलने के लिए दबाएं',
  listening: 'रिकॉर्डिंग जारी है...',
  reRecord: 'फिर से बोलें',
  voiceTranscript: 'आपके द्वारा बोली गई बात:',
  photoTitle: '2. फसल की फोटो',
  photoSub: 'प्रभावित पत्ते या पौधे की फोटो खींचें',
  typeTitle: '3. टाइप करके लिखें',
  typePlaceholder: 'उदा. कपास के पत्तों पर पीलापन आ रहा है...',
  optionalDetails: 'अतिरिक्त विवरण (ऐच्छिक)',
  selectCrop: 'फसल चुनें:',
  urgencyLevel: 'प्राथमिकता / आपातकाल:',
  normalUrgency: 'सामान्य (24 घंटे में जवाब)',
  urgentUrgency: 'अति आवश्यक (त्वरित वैज्ञानिक कॉल)',
  continueToReview: 'आगे बढ़ें (विवरण जांचें)',

  // Review Screen
  reviewTitle: 'आपकी समस्या समझ आ गई है',
  reviewSub: 'हमने आपकी बात का विश्लेषण कृषि वैज्ञानिकों से मिलाने के लिए किया है।',
  crop: 'फसल',
  noticedIssue: 'क्या देखा गया',
  symptoms: 'मुख्य लक्षण',
  categoryArea: 'विभाग',
  region: 'क्षेत्र',
  urgency: 'प्राथमिकता',
  humanTrustNotice: 'यह जानकारी सीधे आईसीएआर व कृषि विज्ञान केंद्र के वैज्ञानिकों को भेजी जाएगी।',
  isThisCorrect: 'क्या यह जानकारी सही है?',
  yesFindExpert: 'हाँ, कृषि विशेषज्ञ खोजें',
  editInfo: 'सुधार करें',

  // Expert Match
  foundExpertsTitle: 'आपकी समस्या के लिए {count} कृषि विशेषज्ञ मिले',
  foundExpertsSub: 'आपकी कपास रोग की समस्या के लिए सबसे उपयुक्त विशेषज्ञ',
  whyThisExpert: 'यह विशेषज्ञ क्यों उपयुक्त हैं?',
  consultationFee: 'सलाह शुल्क',
  availableNow: 'आज उपलब्ध',
  offline: 'ऑफ़लाइन',
  viewProfile: 'प्रोफाइल देखें',
  bookConsultation: 'बातचीत करें',

  // Free Tips
  usefulAdviceTitle: 'उपयोगी सलाह, आपके लिए निःशुल्क',
  usefulAdviceSub: 'व्यावहारिक कृषि ज्ञान जिसे 30 सेकंड में पढ़ा जा सकता है।',
  checkpointsTitle: 'त्वरित जांच सूची (30 सेकंड):',
  readFullGuide: 'पूरा विवरण पढ़ें',
  showLess: 'कम दिखाएं',
  stillNeedHelp: 'क्या आपको अभी भी सहायता चाहिए?',
  stillNeedHelpSub: 'फसल की गंभीर बीमारी या कीट प्रकोप के लिए कृषि वैज्ञानिकों से सीधा परामर्श लें।',
  findAnExpertBtn: 'कृषि विशेषज्ञ से बात करें',

  // Expert Portal
  expertPortalTitle: 'कृषिसेतु विशेषज्ञ प्रबंधन पोर्टल',
  todaysRequests: 'आज के नए अनुरोध',
  upcomingCalls: 'आगामी कॉल',
  farmersHelped: 'किसानों की मदद की',
  reportedResolution: 'रिपोर्ट किया समाधान',
  newRequestsTitle: 'नए परामर्श अनुरोध',
  acceptRequest: 'स्वीकार करें',
  declineRequest: 'अस्वीकार',
};
