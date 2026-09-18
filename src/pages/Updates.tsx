import { useEffect, useState } from "react";
import { Seo } from "../components/Seo";
import { EmptyState } from "../components/ui/States";
import { getPublishedUpdates } from "../services/admissionUpdateService";
import type { AdmissionUpdate } from "../types";
import { Bell, ExternalLink } from "lucide-react";

const Updates = () => {
  const [items, setItems] = useState<AdmissionUpdate[]>([]);

  useEffect(() => {
    getPublishedUpdates().then(setItems).catch(() => setItems([]));
  }, []);

  return (
    <main className="bg-[#edf4ec] py-12">
      <Seo title="Admission News & Updates" description="TNEA, NEET, scholarship and counselling updates." path="/updates" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#143527]">
          <Bell className="h-3.5 w-3.5 text-[#143527]" />
          Realtime Alerts
        </div>

        <h1 className="mt-4 font-heading text-4xl font-extrabold text-[#142e23] sm:text-5xl">
          Admission <span className="font-serif-italic font-normal italic text-[#143527]">news & updates</span>
        </h1>
        <p className="mt-2 text-base text-[#577063]">
          Latest official announcements on TNEA counselling schedules, cutoffs, and scholarship deadlines.
        </p>

        {items.length === 0 ? (
          <div className="mt-8">
            <EmptyState title="No updates yet" description="Published alerts from the admin portal will appear here." />
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {items.map((item) => (
              <article key={item.id} className="rounded-3xl border border-[#cdddc9] bg-white p-6 sm:p-8 shadow-sm transition hover:shadow-md">
                <div className="inline-flex items-center rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#143527]">
                  {item.category}
                </div>
                <h2 className="mt-3 font-heading text-2xl font-bold text-[#142e23]">{item.title}</h2>
                <p className="mt-2 text-sm text-[#577063] leading-relaxed">{item.summary}</p>
                {item.content && <p className="mt-4 whitespace-pre-wrap text-sm text-[#142e23] border-t border-[#cdddc9]/60 pt-4">{item.content}</p>}

                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[#577063] border-t border-[#cdddc9]/40 pt-4">
                  {item.importantDate && (
                    <span className="font-semibold text-[#143527]">Important date: {item.importantDate}</span>
                  )}
                  {item.source && <span>Source: {item.source}</span>}
                  {item.officialLink && (
                    <a
                      href={item.officialLink}
                      className="inline-flex items-center gap-1 font-bold text-[#143527] hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Official link <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Updates;
