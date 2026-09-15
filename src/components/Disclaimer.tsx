import { Info } from "lucide-react";
import { useLanguage } from "../hooks/LanguageContext";

type DisclaimerKind = "prediction" | "official" | "college" | "fees" | "placement";

export const Disclaimer = ({ kind }: { kind: DisclaimerKind }) => {
  const { t } = useLanguage();
  return (
    <p className="mt-4 flex gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden />
      <span>{t.disclaimer[kind]}</span>
    </p>
  );
};
