import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { globalSearch, type SearchHit } from "../services/searchService";
import { trackEvent } from "../services/analytics";

export const SearchBar = ({
  placeholder = "Search college, course, location or university...",
  size = "md",
}: {
  placeholder?: string;
  size?: "md" | "lg";
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [open, setOpen] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    window.clearTimeout(timer.current);
    if (query.trim().length < 2) {
      setHits([]);
      return;
    }
    timer.current = window.setTimeout(async () => {
      try {
        const results = await globalSearch(query);
        setHits(results);
        setOpen(true);
        trackEvent("college_search", { query });
      } catch {
        setHits([]);
      }
    }, 280);
    return () => window.clearTimeout(timer.current);
  }, [query]);

  const goSearch = (href?: string) => {
    setOpen(false);
    if (href) {
      navigate(href);
      return;
    }
    navigate(`/colleges?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="relative w-full">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          goSearch();
        }}
        className={`flex items-center gap-3 rounded-2xl border border-[#E2ECF3] bg-white shadow-sm transition focus-within:border-[#075B63] focus-within:ring-2 focus-within:ring-[#075B63]/15 ${
          size === "lg" ? "px-5 py-4" : "px-4 py-3"
        }`}
      >
        <Search className="h-5 w-5 text-[#5A6E78]" aria-hidden />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-[#075B63] placeholder-[#5A6E78]/70 outline-none"
          aria-label={placeholder}
        />
        <button
          type="submit"
          className="rounded-full bg-[#075B63] px-5 py-2 text-sm font-semibold text-white shadow-xs transition hover:bg-[#05434A]"
        >
          Search
        </button>
      </form>
      {open && hits.length > 0 && (
        <ul className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-[#E2ECF3] bg-white shadow-xl">
          {hits.map((hit) => (
            <li key={`${hit.type}-${hit.id}`}>
              <button
                type="button"
                onClick={() => goSearch(hit.href)}
                className="flex w-full flex-col items-start px-4 py-3 text-left transition hover:bg-[#F0F8FD]"
              >
                <span className="text-sm font-semibold text-[#075B63]">{hit.title}</span>
                <span className="text-xs font-medium text-[#5A6E78]">
                  {hit.type} {hit.subtitle ? `· ${hit.subtitle}` : ""}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
