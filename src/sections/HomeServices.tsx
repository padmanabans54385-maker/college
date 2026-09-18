import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, MapPin } from "lucide-react";
import { getColleges } from "../services/collegeService";
import type { College } from "../types";
import { LoadingSkeleton } from "../components/ui/States";

const HomeServices = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getColleges()
      .then((data) => {
        setColleges(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="bg-[#edf4ec] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-[#142e23] sm:text-4xl">
            Featured colleges
          </h2>
          <Link
            to="/colleges"
            className="inline-flex items-center justify-center rounded-full bg-[#143527] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#0b2017]"
          >
            View all
          </Link>
        </div>

        {loading ? (
          <div className="mt-8">
            <LoadingSkeleton />
          </div>
        ) : colleges.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-[#cdddc9] bg-white p-8 text-center">
            <p className="text-[#577063]">No colleges found in database yet.</p>
            <p className="mt-1 text-xs text-[#577063]">Add colleges in Firebase Firestore or Admin panel to feature them here.</p>
            <Link to="/colleges" className="mt-4 inline-block text-xs font-bold text-[#143527] underline">
              Browse College Explorer
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {colleges.slice(0, 4).map((college, idx) => {
              const numTag = `0${idx + 1}`;
              const imageSrc =
                college.images?.[0] ||
                college.logo ||
                "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600";

              return (
                <div
                  key={college.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#cdddc9] bg-white shadow-xs transition-all hover:-translate-y-1 hover:border-[#143527] hover:shadow-md"
                >
                  <div>
                    {/* Top Image + Tag */}
                    <div className="relative aspect-16/9 overflow-hidden bg-[#143527]/10">
                      <img
                        src={imageSrc}
                        alt={college.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-2 left-2 flex items-center gap-1.5">
                        <span className="rounded-full bg-[#143527] px-2 py-0.5 text-[10px] font-bold text-white">
                          {numTag}
                        </span>
                        {college.verified && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                            <CheckCircle2 className="h-3 w-3 text-emerald-700" />
                            Verified
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-1 text-xs font-medium text-[#577063]">
                        <MapPin className="h-3.5 w-3.5 text-[#143527]" />
                        <span>{college.district || college.city || college.location || "Tamil Nadu"}</span>
                      </div>

                      <h3 className="mt-2 font-heading text-lg font-bold leading-snug text-[#142e23] line-clamp-2">
                        {college.name}
                      </h3>

                      {/* Badges */}
                      <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] font-medium text-[#142e23]">
                        {college.collegeType && (
                          <span className="rounded-md bg-[#edf4ec] px-2 py-0.5 border border-[#cdddc9]">
                            {college.collegeType}
                          </span>
                        )}
                        {college.naacGrade && (
                          <span className="rounded-md bg-[#d7e7d5] px-2 py-0.5 text-[#143527] font-semibold">
                            NAAC {college.naacGrade}
                          </span>
                        )}
                      </div>

                      {/* Details row */}
                      <div className="mt-4 pt-3 border-t border-[#edf4ec] text-xs text-[#577063] space-y-1">
                        {college.feeRange && (
                          <div className="flex justify-between">
                            <span>Fee range:</span>
                            <span className="font-semibold text-[#142e23]">{college.feeRange}</span>
                          </div>
                        )}
                        {college.placements?.rate && (
                          <div className="flex justify-between">
                            <span>Placement:</span>
                            <span className="font-semibold text-emerald-700">{college.placements.rate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Button */}
                  <div className="p-5 pt-0">
                    <Link
                      to={`/colleges/${college.id}`}
                      className="block w-full rounded-full border border-[#143527] py-2 text-center text-xs font-bold text-[#143527] transition-colors hover:bg-[#143527] hover:text-white"
                    >
                      View details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeServices;
