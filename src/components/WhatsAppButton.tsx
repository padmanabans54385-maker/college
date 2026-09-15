import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { useSettings } from "../hooks/SettingsContext";
import { useLanguage } from "../hooks/LanguageContext";
import { trackEvent } from "../services/analytics";

const digits = (value?: string) => (value || "").replace(/\D/g, "");

export const WhatsAppButton = ({
  message,
  source = "whatsapp",
  className = "",
  children,
}: {
  message?: string;
  source?: string;
  className?: string;
  children?: ReactNode;
}) => {
  const { contact } = useSettings();
  const { t } = useLanguage();
  const number = digits(contact.whatsapp || contact.phone);

  if (!number) return null;

  const href = `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

  const onClick = () => {
    trackEvent("whatsapp_click", { source });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      className={
        className ||
        "inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-500"
      }
    >
      <MessageCircle className="h-4 w-4" aria-hidden />
      {children || t.cta.whatsapp}
    </a>
  );
};

export const WhatsAppFab = () => {
  const { contact } = useSettings();
  const number = digits(contact.whatsapp || contact.phone);
  if (!number) return null;

  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      onClick={() => trackEvent("whatsapp_click", { source: "fab" })}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-700/30 transition hover:scale-105"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
};
