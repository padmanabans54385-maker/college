import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublishedUpdates } from "../services/admissionUpdateService";
import type { AdmissionUpdate } from "../types";
import { EmptyState } from "../components/ui/States";

const HomeUpdates = () => {
  const [updates, setUpdates] = useState<AdmissionUpdate[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPublishedUpdates()
      .then((items) =>
        setUpdates(
          [...items].sort((a, b) => String(b.importantDate || "").localeCompare(String(a.importantDate || "")))
        )
      )
      .catch(() => setError(true));
  }, []);

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="font-heading text-3xl font-extrabold">Admission updates</h2>
          <Link to="/updates" className="text-sm font-semibold text-teal-700">
            View all
          </Link>
        </div>
        {error && (
          <p className="mt-6 text-sm text-slate-500">Updates could not be loaded right now.</p>
        )}
        {!error && updates.length === 0 && (
          <div className="mt-6">
            <EmptyState
              title="No updates yet"
              description="Official admission alerts will appear here when published by the admin team."
            />
          </div>
        )}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {updates.slice(0, 3).map((item) => (
            <article key={item.id} className="rounded-3xl border border-slate-200 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-teal-700">{item.category}</p>
              <h3 className="mt-2 font-heading text-lg font-bold">{item.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-slate-600">{item.summary}</p>
              {item.importantDate && (
                <p className="mt-3 text-xs text-slate-500">Important date: {item.importantDate}</p>
              )}
              {item.source && <p className="mt-1 text-xs text-slate-400">Source: {item.source}</p>}
              <Link to="/updates" className="mt-4 inline-block text-sm font-semibold text-teal-700">
                Read more
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeUpdates;
