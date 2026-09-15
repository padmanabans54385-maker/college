export const en = {
  nav: {
    home: "Home",
    colleges: "Colleges",
    courses: "Courses",
    tnea: "TNEA 2026",
    compare: "Compare",
    scholarships: "Scholarships",
    updates: "Updates",
    counselling: "Counselling",
    blog: "Blog",
    signIn: "Sign In",
    findCollege: "Find My College",
  },
  cta: {
    findCollege: "Find My College",
    getCounselling: "Get Counselling",
    whatsapp: "Chat on WhatsApp",
    talkExpert: "Talk to an Expert",
    choiceList: "Get My Choice List",
  },
  disclaimer: {
    prediction:
      "Predictions are based on historical trends and available data. They are not a guarantee of admission.",
    official:
      "Please verify important dates, eligibility requirements and admission procedures with the official authority.",
    college:
      "College information may change. Verify current fees, courses and admission details with the institution.",
    fees: "Fees may change. Please verify current fee structure with the institution.",
    placement:
      "Placement figures are based on available published information and may change.",
  },
};

export const ta = {
  nav: {
    home: "முகப்பு",
    colleges: "கல்லூரிகள்",
    courses: "பாடங்கள்",
    tnea: "TNEA 2026",
    compare: "ஒப்பீடு",
    scholarships: "உதவித்தொகை",
    updates: "அறிவிப்புகள்",
    counselling: "ஆலோசனை",
    blog: "கட்டுரைகள்",
    signIn: "உள்நுழை",
    findCollege: "கல்லூரியைத் தேடு",
  },
  cta: {
    findCollege: "கல்லூரியைத் தேடு",
    getCounselling: "ஆலோசனை பெறுக",
    whatsapp: "WhatsApp-ல் அரட்டை",
    talkExpert: "நிபுணரிடம் பேசுக",
    choiceList: "தேர்வுப் பட்டியல்",
  },
  disclaimer: {
    prediction:
      "பரிந்துரைகள் முந்தைய போக்குகள் மற்றும் கிடைக்கும் தரவின் அடிப்படையில் உள்ளன. சேர்க்கை உறுதி அல்ல.",
    official:
      "முக்கிய தேதிகள், தகுதி மற்றும் சேர்க்கை நடைமுறைகளை அதிகாரப்பூர்வ ஆணையத்துடன் உறுதி செய்து கொள்ளவும்.",
    college:
      "கல்லூரி தகவல்கள் மாறலாம். கட்டணம், பாடங்கள் மற்றும் சேர்க்கை விவரங்களை நிறுவனத்துடன் உறுதி செய்து கொள்ளவும்.",
    fees: "கட்டணம் மாறலாம். தற்போதைய கட்டணத்தை நிறுவனத்துடன் உறுதி செய்து கொள்ளவும்.",
    placement:
      "வேலைவாய்ப்பு எண்கள் வெளியிடப்பட்ட தகவலை அடிப்படையாகக் கொண்டவை; மாறலாம்.",
  },
};

export type Dictionary = typeof en;
export type Locale = "en" | "ta";

export const dictionaries: Record<Locale, Dictionary> = { en, ta };
