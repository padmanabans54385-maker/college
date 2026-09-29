import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getColleges } from "../services/collegeService";
import type { College } from "../types";
import { LoadingSkeleton } from "../components/ui/States";
import { brand } from "../config/brand";
import { UniversityIcon } from "../components/icons/AcademicIcons";
import { MapPin } from "lucide-react";

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
    <section className="bg-[#F5F9FC] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[#075B63] sm:text-4xl">
            Featured institutions
          </h2>
          <Link to="/colleges" className="btn-primary text-xs py-2 px-4">
            View all
          </Link>
        </div>

        {loading ? (
          <div className="mt-8">
            <LoadingSkeleton />
          </div>
        ) : colleges.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-[#E2ECF3] bg-white p-8 text-center">
            <p className="text-[#5A6E78]">No colleges found in database yet.</p>
            <p className="mt-1 text-xs text-[#5A6E78]">Add colleges in Firebase Firestore or Admin panel to feature them here.</p>
            <Link to="/colleges" className="mt-4 inline-block text-xs font-bold text-[#075B63] underline">
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
                brand.images.campus;

              return (
                <div
                  key={college.id}
                  className="academic-card group flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Top Image + Tag */}
                    <div className="relative aspect-16/9 overflow-hidden bg-[#075B63]/10">
                      <img
                        src={imageSrc}
                        alt={college.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-2 left-2 flex items-center gap-1.5">
                        <span className="rounded-full bg-[#075B63] px-2 py-0.5 text-[10px] font-bold text-white">
                          {numTag}
                        </span>
                        {college.verified && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#F0F8FD] px-2 py-0.5 text-[10px] font-semibold text-[#075B63]">
                            <UniversityIcon size={12} />
                            Verified
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-1 text-xs font-medium text-[#5A6E78]">
                        <MapPin className="h-3.5 w-3.5 text-[#075B63]" />
                        <span>{college.district || college.city || college.location || "Tamil Nadu"}</span>
                      </div>

                      <h3 className="mt-2 font-heading text-lg font-bold leading-snug text-[#075B63] line-clamp-2">
                        {college.name}
                      </h3>

                      {/* Badges */}
                      <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] font-medium text-[#075B63]">
                        {college.collegeType && (
                          <span className="rounded-md bg-[#F5F9FC] px-2 py-0.5 border border-[#E2ECF3]">
                            {college.collegeType}
                          </span>
                        )}
                        {college.naacGrade && (
                          <span className="rounded-md bg-[#D6EEF8] px-2 py-0.5 text-[#075B63] font-semibold">
                            NAAC {college.naacGrade}
                          </span>
                        )}
                      </div>

                      {/* Details row */}
                      <div className="mt-4 pt-3 border-t border-[#F5F9FC] text-xs text-[#5A6E78] space-y-1">
                        {college.feeRange && (
                          <div className="flex justify-between">
                            <span>Fee range:</span>
                            <span className="font-semibold text-[#075B63]">{college.feeRange}</span>
                          </div>
                        )}
                        {college.placements?.rate && (
                          <div className="flex justify-between">
                            <span>Placement:</span>
                            <span className="font-semibold text-[#075B63]">{college.placements.rate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Button */}
                  <div className="p-5 pt-0">
                    <Link
                      to={`/colleges/${college.id}`}
                      className="block w-full rounded-full border border-[#075B63] py-2 text-center text-xs font-bold text-[#075B63] transition-colors hover:bg-[#075B63] hover:text-white"
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
