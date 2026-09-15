const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const trackEvent = (name: string, params: Record<string, string | number | undefined> = {}) => {
  if (!measurementId || typeof window === "undefined") return;
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", name, params);
};
