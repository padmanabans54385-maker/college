import { useEffect, useState } from "react";

import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  IndianRupee,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  getScholarshipById,
} from "../services/scholarshipService";

import type {
  Scholarship,
} from "../types";

const ScholarshipDetails = () => {
  const { scholarshipId } =
    useParams();

  const [scholarship, setScholarship] =
    useState<Scholarship | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!scholarshipId) return;

    getScholarshipById(scholarshipId)
      .then(setScholarship)
      .finally(() => setLoading(false));
  }, [scholarshipId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading scholarship...
      </div>
    );
  }

  if (!scholarship) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">
          Scholarship not found
        </h1>

        <Link
          to="/scholarships"
          className="mt-4 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
        >
          Browse Scholarships
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <Link
            to="/scholarships"
            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Scholarships
          </Link>

          <div className="mt-10 max-w-4xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black">
              <GraduationCap size={25} />
            </div>

            <p className="mt-7 text-sm font-semibold text-gray-400">
              {scholarship.provider}
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">
              {scholarship.name}
            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-300">
              {scholarship.description}
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* KEY INFORMATION */}

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border bg-white p-6">
                <IndianRupee size={22} />

                <p className="mt-5 text-sm text-gray-500">
                  Scholarship Amount
                </p>

                <p className="mt-2 text-xl font-bold">
                  {scholarship.amount ||
                    "Varies"}
                </p>
              </div>

              <div className="rounded-3xl border bg-white p-6">
                <CalendarDays size={22} />

                <p className="mt-5 text-sm text-gray-500">
                  Application Deadline
                </p>

                <p className="mt-2 text-xl font-bold">
                  {scholarship.applicationDeadline ||
                    "Not specified"}
                </p>
              </div>
            </div>

            {/* ELIGIBILITY */}

            <div className="mt-6 rounded-3xl border bg-white p-7">
              <h2 className="text-2xl font-bold">
                Eligibility
              </h2>

              <p className="mt-4 whitespace-pre-line leading-7 text-gray-600">
                {scholarship.eligibility ||
                  "Eligibility details have not been specified."}
              </p>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {scholarship.incomeLimit && (
                  <div className="rounded-2xl bg-gray-50 p-5">
                    <p className="text-sm text-gray-500">
                      Family Income Limit
                    </p>

                    <p className="mt-2 font-bold">
                      {scholarship.incomeLimit}
                    </p>
                  </div>
                )}

                {scholarship.educationLevel && (
                  <div className="rounded-2xl bg-gray-50 p-5">
                    <p className="text-sm text-gray-500">
                      Education Level
                    </p>

                    <p className="mt-2 font-bold">
                      {scholarship.educationLevel}
                    </p>
                  </div>
                )}

                {scholarship.category && (
                  <div className="rounded-2xl bg-gray-50 p-5">
                    <p className="text-sm text-gray-500">
                      Category
                    </p>

                    <p className="mt-2 font-bold">
                      {scholarship.category}
                    </p>
                  </div>
                )}

                {scholarship.state && (
                  <div className="rounded-2xl bg-gray-50 p-5">
                    <p className="text-sm text-gray-500">
                      State
                    </p>

                    <p className="mt-2 font-bold">
                      {scholarship.state}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* DESCRIPTION */}

            <div className="mt-6 rounded-3xl border bg-white p-7">
              <h2 className="text-2xl font-bold">
                About this scholarship
              </h2>

              <p className="mt-4 whitespace-pre-line leading-7 text-gray-600">
                {scholarship.description}
              </p>
            </div>
          </div>

          {/* APPLY SIDEBAR */}

          <aside>
            <div className="sticky top-24 rounded-3xl bg-black p-7 text-white">
              <CheckCircle2 size={27} />

              <h2 className="mt-5 text-2xl font-bold">
                Check your eligibility
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-300">
                Review the eligibility requirements
                carefully before applying.
              </p>

              {scholarship.applicationUrl ? (
                <a
                  href={scholarship.applicationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-black"
                >
                  Apply Officially
                  <ArrowUpRight size={17} />
                </a>
              ) : (
                <div className="mt-7 rounded-xl bg-white/10 p-4 text-sm text-gray-300">
                  Official application link has not
                  been added yet.
                </div>
              )}

              {scholarship.applicationStart && (
                <p className="mt-5 text-xs text-gray-400">
                  Applications open:{" "}
                  {scholarship.applicationStart}
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