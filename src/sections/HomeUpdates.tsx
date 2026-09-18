import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublishedUpdates } from "../services/admissionUpdateService";
import type { AdmissionUpdate } from "../types";
import { LoadingSkeleton } from "../components/ui/States";

const HomeUpdates = () => {
  const [updates, setUpdates] = useState<AdmissionUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedUpdates()
      .then((items) => {
        setUpdates(
          [...items].sort((a, b) =>
            String(b.importantDate || "").localeCompare(String(a.importantDate || ""))
          )
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="bg-[#edf4ec] py-16 border-t border-[#cdddc9]/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-[#142e23] sm:text-4xl">
              Admission updates
            </h2>
            <p className="mt-1 text-xs text-[#577063]">
              Items marked "expected" are based on previous years and are not official TNEA OTE announcements.
            </p>
          </div>
          <Link
            to="/updates"
            className="inline-flex items-center justify-center rounded-full bg-[#143527] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#0b2017]"
          >
            View all
          </Link>
        </div>

        {loading ? (
          <div className="mt-8">
            <LoadingSkeleton />
          </div>
        ) : updates.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-[#cdddc9] bg-white p-8 text-center">
            <p className="text-[#577063]">No admission updates added to Firebase database yet.</p>
            <p className="mt-1 text-xs text-[#577063]">Updates published by Admin in Firebase will appear here automatically.</p>
            <Link to="/updates" className="mt-4 inline-block text-xs font-bold text-[#143527] underline">
              View All Updates Page
            </Link>
          </div>
        ) : (
          <div className="mt-8 divide-y divide-[#cdddc9] rounded-2xl border border-[#cdddc9] bg-white shadow-xs">
            {updates.slice(0, 4).map((item) => (
              <div key={item.id} className="p-6 transition-colors hover:bg-[#edf4ec]/50">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-2">
                    {item.importantDate && (
                      <span className="text-xs font-bold text-[#143527]">
                        {item.importantDate}
                      </span>
                    )}
                    <span className="rounded-md bg-[#d7e7d5] px-2 py-0.5 text-[10px] font-bold text-[#143527] uppercase">
                      {item.category || "TNEA"}
                    </span>
                  </div>
                </div>

                <h3 className="mt-2 font-heading text-lg font-bold text-[#142e23]">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#465f51]">
                  {item.summary}
                </p>

                <div className="mt-4">
                  <Link
                    to="/updates"
                    className="text-xs font-bold text-[#143527] underline"
                  >
                    Read official details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeUpdates;
