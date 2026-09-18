import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  GraduationCap,
  IndianRupee,
  Award,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getScholarshipById } from "../services/scholarshipService";
import { LoadingSkeleton, EmptyState } from "../components/ui/States";
import type { Scholarship } from "../types";

const ScholarshipDetails = () => {
  const { scholarshipId } = useParams();
  const [scholarship, setScholarship] = useState<Scholarship | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!scholarshipId) return;
    getScholarshipById(scholarshipId)
      .then(setScholarship)
      .finally(() => setLoading(false));
  }, [scholarshipId]);

  if (loading) return <LoadingSkeleton label="Loading scholarship details" />;
  if (!scholarship) {
    return (
      <main className="bg-[#edf4ec] py-16">
        <div className="mx-auto max-w-3xl px-4">
          <EmptyState title="Scholarship not found" description="This scholarship program is currently unavailable." />
          <div className="mt-6 text-center">
            <Link to="/scholarships" className="inline-flex items-center gap-2 rounded-full bg-[#143527] px-6 py-3 text-sm font-semibold text-white">
              Browse All Scholarships
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#edf4ec]">
      <section className="border-b border-[#cdddc9]/60 bg-[#dce8da] py-12 sm:py-16 text-[#142e23]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/scholarships"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#143527] hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Scholarships
          </Link>

          <div className="max-w-4xl">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#143527] text-white shadow-xs">
              <Award size={24} className="text-[#dce8da]" />
            </div>

            <p className="mt-4 text-xs font-bold uppercase tracking-widest text-[#143527]">
              {scholarship.provider}
            </p>

            <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight sm:text-5xl text-[#142e23]">
              {scholarship.name}
            </h1>

            <p className="mt-4 max-w-3xl text-base text-[#465f51] leading-relaxed">
              {scholarship.description}
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* KEY INFORMATION */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-[#cdddc9] bg-white p-6 shadow-sm">
                <IndianRupee size={22} className="text-[#143527]" />
                <p className="mt-3 text-xs font-bold uppercase text-[#577063]">
                  Scholarship Amount
                </p>
                <p className="mt-1 font-heading text-xl font-bold text-[#143527]">
                  {scholarship.amount || "Financial Support"}
                </p>
              </div>

              <div className="rounded-3xl border border-[#cdddc9] bg-white p-6 shadow-sm">
                <CalendarDays size={22} className="text-[#143527]" />
                <p className="mt-3 text-xs font-bold uppercase text-[#577063]">
                  Application Deadline
                </p>
                <p className="mt-1 font-heading text-xl font-bold text-[#142e23]">
                  {scholarship.applicationDeadline || "Open / Rolling"}
                </p>
              </div>
            </div>

            {/* ELIGIBILITY */}
            <div className="rounded-3xl border border-[#cdddc9] bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold text-[#142e23]">
                Eligibility & Requirements
              </h2>

              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-[#465f51]">
                {scholarship.eligibility || "Eligibility requirements apply based on academic cutoff and income norms."}
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {scholarship.incomeLimit && (
                  <div className="rounded-2xl border border-[#cdddc9] bg-[#edf4ec]/50 p-4">
                    <p className="text-xs font-bold uppercase text-[#577063]">
                      Family Income Limit
                    </p>
                    <p className="mt-1 font-bold text-[#142e23]">
                      {scholarship.incomeLimit}
                    </p>
                  </div>
                )}

                {scholarship.educationLevel && (
                  <div className="rounded-2xl border border-[#cdddc9] bg-[#edf4ec]/50 p-4">
                    <p className="text-xs font-bold uppercase text-[#577063]">
                      Education Level
                    </p>
                    <p className="mt-1 font-bold text-[#142e23]">
                      {scholarship.educationLevel}
                    </p>
                  </div>
                )}

                {scholarship.category && (
                  <div className="rounded-2xl border border-[#cdddc9] bg-[#edf4ec]/50 p-4">
                    <p className="text-xs font-bold uppercase text-[#577063]">
                      Category
                    </p>
                    <p className="mt-1 font-bold text-[#142e23]">
                      {scholarship.category}
                    </p>
                  </div>
                )}

                {scholarship.state && (
                  <div className="rounded-2xl border border-[#cdddc9] bg-[#edf4ec]/50 p-4">
                    <p className="text-xs font-bold uppercase text-[#577063]">
                      State Scope
                    </p>
                    <p className="mt-1 font-bold text-[#142e23]">
                      {scholarship.state}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="rounded-3xl border border-[#cdddc9] bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold text-[#142e23]">
                About this scholarship
              </h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-[#465f51]">
                {scholarship.description}
              </p>
            </div>
          </div>

          {/* APPLY SIDEBAR */}
          <aside>
            <div className="sticky top-24 rounded-3xl border border-[#cdddc9] bg-[#143527] p-8 text-white shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
                <GraduationCap size={24} className="text-[#dce8da]" />
              </div>

              <h2 className="mt-5 font-heading text-2xl font-bold">
                Apply for Scholarship
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-[#c4e0ce]">
                Review the eligibility criteria carefully before accessing the official application link.
              </p>

              {scholarship.applicationUrl ? (
                <a
                  href={scholarship.applicationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 flex items-center justify-center gap-2 rounded-full bg-white py-3.5 text-sm font-bold text-[#143527] shadow-md transition hover:bg-[#dce8da]"
                >
                  <span>Apply Officially</span>
                  <ArrowUpRight size={16} />
                </a>
              ) : (
                <div className="mt-8 rounded-2xl border border-white/15 bg-white/10 p-4 text-center text-xs font-medium text-[#c4e0ce]">
                  Official application link will be updated soon.
                </div>
              )}

              {scholarship.applicationStart && (
                <p className="mt-5 text-center text-xs text-[#a8d5ba]">
                  Applications open: {scholarship.applicationStart}
                </p>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default ScholarshipDetails;