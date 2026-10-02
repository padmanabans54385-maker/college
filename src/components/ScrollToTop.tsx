import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  const resetScroll = () => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id) || document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    // Reset window and document scroll position to top (0, 0)
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  useLayoutEffect(() => {
    resetScroll();
  }, [pathname, search, hash]);

  useEffect(() => {
    // Secondary frame check to ensure lazy-loaded suspense chunks or layout shifts reset to (0, 0)
    const rafId = requestAnimationFrame(() => {
      if (!hash && (window.scrollY > 0 || document.documentElement.scrollTop > 0)) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    });
    return () => cancelAnimationFrame(rafId);
  }, [pathname, search, hash]);

  return null;
};
export default ScrollToTop;
