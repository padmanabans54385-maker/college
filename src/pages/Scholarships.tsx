import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  IndianRupee,
  Search,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
  getPublishedScholarships,
} from "../services/scholarshipService";

import type {
  Scholarship,
  ScholarshipType,
} from "../types";

const Scholarships = () => {
  const [scholarships, setScholarships] =
    useState<Scholarship[]>([]);

  const [search, setSearch] = useState("");

  const [type, setType] =
    useState<ScholarshipType | "">("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedScholarships()
      .then(setScholarships)
      .finally(() => setLoading(false));
  }, []);

  const filteredScholarships = useMemo(() => {
    const value = search
      .toLowerCase()
      .trim();

    return scholarships.filter((scholarship) => {
      const matchesSearch =
        !value ||
        scholarship.name
          .toLowerCase()
          .includes(value) ||
        scholarship.provider
          .toLowerCase()
          .includes(value) ||
        scholarship.description
          .toLowerCase()
          .includes(value);

      const matchesType =
        !type ||
        scholarship.type === type;

      return (
        matchesSearch &&
        matchesType
      );
    });
  }, [
    scholarships,
    search,
    type,
  ]);

  const formatType = (
    value: ScholarshipType
  ) => {
    return value
      .charAt(0)
      .toUpperCase() +
      value.slice(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}

      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
              Scholarships
            </span>

            <h1 className="mt-6 text-4xl font-black tracking-tight md:text-6xl">
              Find scholarships that
              help fund your education.
            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-300">
              Discover government, private,
              college and NGO scholarships
              available for students.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 md:flex-row">
            <div className="flex flex-1 items-center rounded-2xl bg-white px-5 text-gray-900">
              <Search
                size={20}
                className="text-gray-400"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search scholarships..."
                className="w-full bg-transparent px-3 py-4 outline-none"
              />
            </div>

            <select
              value={type}
              onChange={(event) =>
                setType(
                  event.target.value as
                    | ScholarshipType
                    | ""
                )
              }
              className="rounded-2xl bg-white px-5 py-4 text-gray-900 outline-none"
            >
              <option value="">
                All Scholarships
              </option>

              <option value="government">
                Government
              </option>

              <option value="private">
                Private
              </option>

              <option value="college">
                College
              </option>

              <option value="ngo">
                NGO
              </option>
            </select>
          </div>
        </div>
      </section>

      {/* LIST */}

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-7 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Available Scholarships
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {filteredScholarships.length}{" "}
              scholarships found
            </p>
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl border bg-white p-16 text-center text-gray-500">
            Loading scholarships...
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {filteredScholarships.map(
              (scholarship) => (
                <Link
                  key={scholarship.id}
                  to={`/scholarships/${scholarship.id}`}
                  className="group rounded-3xl border bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black text-white">
                      <GraduationCap
                        size={22}
                      />
                    </div>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold">
                      {formatType(
                        scholarship.type
                      )}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold group-hover:underline">
                    {scholarship.name}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-gray-500">
                    {scholarship.provider}
                  </p>

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
                    {scholarship.description}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-gray-50 p-4">
                      <div className="flex items-center gap-2 text-gray-500">
                        <IndianRupee size={16} />

                        <span className="text-xs">
                          Scholarship
                        </span>
                      </div>

                      <p className="mt-1 font-bold">
                        {scholarship.amount ||
                          "Varies"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-4">
                      <div className="flex items-center gap-2 text-gray-500">
                        <CalendarDays size={16} />

                        <span className="text-xs">
                          Deadline
                        </span>
                      </div>

                      <p className="mt-1 font-bold">
                        {scholarship.applicationDeadline ||
                          "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t pt-5">
                    <span className="text-sm font-semibold">
                      View Scholarship
                    </span>

                    <ArrowRight
                      size={18}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              )
            )}
          </div>
        )}

        {!loading &&
          filteredScholarships.length ===
            0 && (
            <div className="rounded-3xl border bg-white p-16 text-center">
              <GraduationCap
                className="mx-auto text-gray-300"
                size={48}
              />

              <h3 className="mt-5 text-xl font-bold">
                No scholarships found
              </h3>

              <p className="mt-2 text-gray-500">
                Try changing your search or
                scholarship type.
              </p>
            </div>
          )}
      </main>
    </div>
  );
};

export default Scholarships;