import { useLanguage } from "../hooks/LanguageContext";

export const LanguageSwitcher = () => {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="inline-flex overflow-hidden rounded-full border border-[#E2ECF3] bg-white text-xs font-bold">
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`px-3 py-1.5 transition-colors ${locale === "en" ? "bg-[#075B63] text-white" : "text-[#5A6E78] hover:text-[#075B63]"}`}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("ta")}
        className={`px-3 py-1.5 transition-colors ${locale === "ta" ? "bg-[#075B63] text-white" : "text-[#5A6E78] hover:text-[#075B63]"}`}
        aria-pressed={locale === "ta"}
      >
        தமிழ்
      </button>
    </div>
  );
};
