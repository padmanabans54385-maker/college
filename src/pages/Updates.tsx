import { useEffect, useState } from "react";
import { Seo } from "../components/Seo";
import { EmptyState } from "../components/ui/States";
import { getPublishedUpdates } from "../services/admissionUpdateService";
import type { AdmissionUpdate } from "../types";

const Updates = () => {
  const [items, setItems] = useState<AdmissionUpdate[]>([]);

  useEffect(() => {
    getPublishedUpdates().then(setItems).catch(() => setItems([]));
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <Seo title="Admission News & Updates" description="TNEA, NEET, scholarship and counselling updates." path="/updates" />
      <h1 className="font-heading text-4xl font-extrabold">Admission news & updates</h1>
      {items.length === 0 ? (
        <div className="mt-8">
          <EmptyState title="No updates yet" description="Published alerts from the admin CMS will appear here." />
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {items.map((item) => (
            <article key={item.id} className="rounded-3xl border bg-white p-6">
              <p className="text-xs font-bold uppercase text-teal-700">{item.category}</p>
              <h2 className="mt-1 font-heading text-2xl font-bold">{item.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{item.summary}</p>
              {item.content && <p className="mt-3 whitespace-pre-wrap text-sm">{item.content}</p>}
              {item.importantDate && <p className="mt-2 text-xs">Important date: {item.importantDate}</p>}
              {item.source && <p className="text-xs text-slate-500">Source: {item.source}</p>}
              {item.officialLink && (
                <a href={item.officialLink} className="mt-3 inline-block text-sm font-semibold text-teal-700" target="_blank" rel="noreferrer">
                  Official link
                </a>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default Updates;
