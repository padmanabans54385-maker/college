import { useLanguage } from "../hooks/LanguageContext";

export const LanguageSwitcher = () => {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="inline-flex overflow-hidden rounded-full border border-slate-200 bg-white text-xs font-semibold">
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`px-3 py-1.5 ${locale === "en" ? "bg-teal-700 text-white" : "text-slate-600"}`}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("ta")}
        className={`px-3 py-1.5 ${locale === "ta" ? "bg-teal-700 text-white" : "text-slate-600"}`}
        aria-pressed={locale === "ta"}
      >
        தமிழ்
      </button>
    </div>
  );
};
