import { useEffect } from "react";
import { brand } from "../config/brand";

interface SeoProps {
  title: string;
  description: string;
  path?: string;
}

export const Seo = ({ title, description, path = "/" }: SeoProps) => {
  useEffect(() => {
    const fullTitle = `${title} | ${brand.name}`;
    document.title = fullTitle;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let tag = document.head.querySelector(`meta[${attr}="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:image", brand.logoSrc, true);
    setMeta("og:type", "website", true);

    const origin = import.meta.env.VITE_SITE_URL || window.location.origin;
    const canonicalHref = `${origin}${path}`;
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalHref);
  }, [title, description, path]);

  return null;
};
