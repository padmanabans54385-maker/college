import { useEffect, useMemo, useState } from "react";
import { GraduationCap, Search, ArrowRight, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { getPublishedScholarships } from "../services/scholarshipService";
import { Seo } from "../components/Seo";
import { LoadingSkeleton, EmptyState } from "../components/ui/States";
import type { Scholarship, ScholarshipType } from "../types";

const Scholarships = () => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState<ScholarshipType | "">("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedScholarships()
      .then(setScholarships)
      .finally(() => setLoading(false));
  }, []);

  const filteredScholarships = useMemo(() => {
    const value = search.toLowerCase().trim();

    return scholarships.filter((s) => {
      const matchesSearch =
        !value ||
        (s.name || "").toLowerCase().includes(value) ||
        s.provider.toLowerCase().includes(value);

      const matchesType = !type || s.type === type;
      return matchesSearch && matchesType;
    });
  }, [scholarships, search, type]);

  const formatType = (t: ScholarshipType) => {
    switch (t) {
      case "government":
        return "Government";
      case "private":
        return "Private";
      case "college":
        return "College";
      case "ngo":
        return "NGO";
      default:
        return t;
    }
  };

  return (
    <div className="min-h-screen bg-[#edf4ec]">
      <Seo title="Scholarships & Financial Aid" description="Discover government, private, and institutional engineering scholarships." path="/scholarships" />

      {/* HERO */}
      <section className="border-b border-[#cdddc9]/60 bg-[#dce8da] py-14 text-[#142e23]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#143527]">
              <Award className="h-3.5 w-3.5 text-[#143527]" />
              Financial Aid & Grants
            </span>

            <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight md:text-6xl text-[#142e23]">
              Find scholarships that <br className="hidden sm:inline" />
              help fund your <span className="font-serif-italic font-normal italic text-[#143527]">education</span>.
            </h1>

            <p className="mt-4 text-base leading-relaxed text-[#465f51] md:text-lg">
              Discover government scheme subsidies, private foundation grants, and college scholarships for Tamil Nadu students.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 md:flex-row">
            <div className="flex flex-1 items-center rounded-2xl border border-[#cdddc9] bg-white px-5 shadow-sm transition focus-within:border-[#143527] focus-within:ring-2 focus-within:ring-[#143527]/20">
              <Search size={20} className="text-[#577063]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search scholarship name, provider, or scheme..."
                className="w-full bg-transparent px-3 py-4 text-sm text-[#142e23] placeholder-[#577063]/60 outline-none"
              />
            </div>

            <select
              value={type}
              onChange={(event) => setType(event.target.value as ScholarshipType | "")}
              className="rounded-2xl border border-[#cdddc9] bg-white px-5 py-4 text-sm font-semibold text-[#142e23] outline-none shadow-sm focus:border-[#143527]"
            >
              <option value="">All Scholarship Types</option>
              <option value="government">Government</option>
              <option value="private">Private</option>
              <option value="college">College</option>
              <option value="ngo">NGO</option>
            </select>
          </div>
        </div>
      </section>

      {/* LIST */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold text-[#142e23]">
              Available Scholarships
            </h2>
            <p className="mt-1 text-xs font-semibold text-[#577063]">
              {filteredScholarships.length} opportunities listed
            </p>
          </div>
        </div>

        {loading ? (
          <LoadingSkeleton label="Loading scholarships" />
        ) : filteredScholarships.length === 0 ? (
          <EmptyState title="No scholarships found" description="Try clearing your search query or selecting another category." />
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {filteredScholarships.map((scholarship) => (
              <Link
                key={scholarship.id}
                to={`/scholarships/${scholarship.id}`}
                className="group flex flex-col justify-between rounded-3xl border border-[#cdddc9] bg-white p-6 sm:p-8 shadow-xs transition-all hover:-translate-y-1 hover:border-[#143527]/40 hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#143527] text-white shadow-xs">
                      <GraduationCap size={22} className="text-[#dce8da]" />
                    </div>

                    <span className="rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-3 py-1 text-xs font-bold text-[#143527]">
                      {formatType(scholarship.type)}
                    </span>
                  </div>

                  <h3 className="mt-5 font-heading text-xl font-bold text-[#142e23] transition group-hover:text-[#143527]">
                    {scholarship.name}
                  </h3>

                  <p className="mt-2 text-xs font-bold uppercase tracking-wider text-[#577063]">
                    {scholarship.provider}
                  </p>

                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#465f51]">
                    {scholarship.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#cdddc9]/60 pt-5 text-xs text-[#577063]">
                  <span className="font-bold text-[#143527]">
                    {scholarship.amount || "Financial Support Available"}
                  </span>
                  <span className="flex items-center gap-1 font-bold text-[#143527]">
                    View Details <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Scholarships;