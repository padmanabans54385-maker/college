import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { defaultContact, getSiteSettings } from "../services/settingsService";
import type { SiteContactSettings } from "../types";

interface SettingsContextValue {
  contact: SiteContactSettings;
  loading: boolean;
  refresh: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [contact, setContact] = useState<SiteContactSettings>(defaultContact);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const settings = await getSiteSettings();
      setContact(settings.contact);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <SettingsContext.Provider value={{ contact, loading, refresh }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings must be used inside SettingsProvider");
  return context;
};
