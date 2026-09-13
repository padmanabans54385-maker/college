import { useMemo } from "react";
import {
  Link,
  useSearchParams,
} from "react-router-dom";

import {
  ArrowLeft,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  X,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useEffect, useState } from "react";
import { getCollegeById } from "../services/collegeService";

import type { College } from "../types";

const CollegeCompare = () => {
  const [searchParams] =
    useSearchParams();

  const ids = useMemo(
    () =>
      searchParams
        .get("ids")
        ?.split(",")
        .filter(Boolean) ?? [],
    [searchParams]
  );

  const [colleges, setColleges] =
    useState<College[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        const results =
          await Promise.all(
            ids
              .slice(0, 3)
              .map((id) =>
                getCollegeById(id)
              )
          );

        setColleges(
          results.filter(
            (
              college
            ): college is College =>
              college !== null
          )
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (ids.length > 0) {
      load();
    } else {
      (async () => setLoading(false))();
    }
  }, [ids]);

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <Link
            to="/colleges"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Colleges
          </Link>

          <div className="mt-8">
            <h1 className="text-3xl font-black text-gray-950 md:text-4xl">
              Compare Colleges
            </h1>

            <p className="mt-2 text-gray-500">
              Compare up to three colleges
              side by side.
            </p>
          </div>

          {colleges.length < 2 ? (
            <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-12 text-center">
              <h2 className="text-xl font-bold">
                Select at least two colleges
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Return to the college discovery
                page and choose colleges to
                compare.
              </p>

              <Link
                to="/colleges"
                className="mt-6 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
              >
                Explore Colleges
              </Link>
            </div>
          ) : (
            <div className="mt-8 overflow-x-auto rounded-3xl border border-gray-200 bg-white">
              <table className="w-full min-w-[800px] border-collapse">
                <thead>
                  <tr>
                    <th className="w-48 border-b border-r border-gray-200 p-5 text-left text-sm font-bold">
                      Compare
                    </th>

                    {colleges.map(
                      (college) => (
                        <th
                          key={
                            college.id
                          }
                          className="border-b border-gray-200 p-5 text-left align-top"
                        >
                          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-gray-100 text-2xl font-black">
                            {college.logo ? (
                              <img
                                src={
                                  college.logo
                                }
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              college.name.charAt(
                                0
                              )
                            )}
                          </div>

                          <h2 className="mt-4 text-lg font-bold text-gray-950">
                            {college.name}
                          </h2>

                          {college.verified && (
                            <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold">
                              <ShieldCheck className="h-4 w-4" />
                              Verified
                            </span>
                          )}
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                <tbody>
                  <CompareRow
                    label="Location"
                    colleges={colleges}
                    render={(college) => (
                      <div className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                        {college.location}
                      </div>
                    )}
                  />

                  <CompareRow
                    label="District"
                    colleges={colleges}
                    render={(college) =>
                      college.district ||
                      "—"
                    }
                  />

                  <CompareRow
                    label="State"
                    colleges={colleges}
                    render={(college) =>
                      college.state ||
                      "—"
                    }
                  />

                  <CompareRow
                    label="Verification"
                    colleges={colleges}
                    render={(college) =>
                      college.verified ? (
                        <span className="inline-flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="h-4 w-4" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-gray-400">
                          <X className="h-4 w-4" />
                          Not verified
                        </span>
                      )
                    }
                  />

                  <CompareRow
                    label="Courses"
                    colleges={colleges}
                    render={(college) => (
                      <div className="flex flex-wrap gap-2">
                        {(
                          college.courses ??
                          []
                        ).length > 0 ? (
                          (
                            college.courses ??
                            []
                          ).map(
                            (
                              course
                            ) => (
                              <span
                                key={
                                  course
                                }
                                className="rounded-full bg-gray-100 px-2.5 py-1 text-xs"
                              >
                                {course}
                              </span>
                            )
                          )
                        ) : (
                          <span className="text-gray-400">
                            Not available
                          </span>
                        )}
                      </div>
                    )}
                  />

                  <CompareRow
                    label="Website"
                    colleges={colleges}
                    render={(college) =>
                      college.website ? (
                        <a
                          href={
                            college.website
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold underline"
                        >
                          Visit Website
                        </a>
                      ) : (
                        "—"
                      )
                    }
                  />

                  <CompareRow
                    label="Actions"
                    colleges={colleges}
                    render={(college) => (
                      <div className="flex flex-wrap gap-2">
                        <Link
                          to={`/colleges/${college.id}`}
                          className="rounded-xl bg-black px-4 py-2 text-xs font-semibold text-white"
                        >
                          View Details
                        </Link>

                        <Link
                          to={`/colleges/${college.id}/apply`}
                          className="rounded-xl border border-gray-300 px-4 py-2 text-xs font-semibold"
                        >
                          Apply
                        </Link>
                      </div>
                    )}
                  />
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

const CompareRow = ({
  label,
  colleges,
  render,
}: {
  label: string;
  colleges: College[];
  render: (
    college: College
  ) => React.ReactNode;
}) => (
  <tr>
    <td className="border-b border-r border-gray-200 bg-gray-50 p-5 text-sm font-bold text-gray-700">
      {label}
    </td>

    {colleges.map((college) => (
      <td
        key={college.id}
        className="border-b border-gray-200 p-5 text-sm text-gray-600"
      >
        {render(college)}
      </td>
    ))}
  </tr>
);

export default CollegeCompare;