import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useSearchParams,
} from "react-router-dom";

import {
  Check,
  ChevronDown,
  Filter,
  Heart,
  MapPin,
  RotateCcw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useAuth } from "../hooks/AuthContext";

import { getColleges } from "../services/collegeService";

import {
  getSavedColleges,
  saveCollege,
  removeSavedCollege,
} from "../services/savedCollegeService";

import {
  filterColleges,
  getCollegeRecommendationScore,
  type CollegeFilters,
} from "../services/collegeDiscoveryService";

import type { College } from "../types";

const ITEMS_PER_PAGE = 9;

const states = [
  "Tamil Nadu",
  "Kerala",
  "Karnataka",
  "Andhra Pradesh",
  "Telangana",
  "Maharashtra",
  "Delhi",
  "West Bengal",
];

const Colleges = () => {
  const { user, profile } = useAuth();

  const [searchParams, setSearchParams] =
    useSearchParams();

  const [colleges, setColleges] =
    useState<College[]>([]);

  const [savedCollegeIds, setSavedCollegeIds] =
    useState<Set<string>>(new Set());

  const [compareIds, setCompareIds] =
    useState<string[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  const [filters, setFilters] =
    useState<CollegeFilters>({
      search:
        searchParams.get("search") ?? "",
      state:
        searchParams.get("state") ?? "",
      district:
        searchParams.get("district") ?? "",
      course:
        searchParams.get("course") ?? "",
      verifiedOnly:
        searchParams.get("verified") === "true",
      sort:
        (searchParams.get("sort") as CollegeFilters["sort"]) ??
        "name-asc",
    });

  const [page, setPage] =
    useState(
      Number(searchParams.get("page") ?? 1)
    );

  useEffect(() => {
    const loadColleges = async () => {
      setLoading(true);

      try {
        const data = await getColleges();

        setColleges(data);
      } catch (error) {
        console.error(
          "Failed to load colleges:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadColleges();
  }, []);

  useEffect(() => {
    if (!user) {
      (async () => setSavedCollegeIds(new Set()))();
      return;
    }

    const loadSavedColleges = async () => {
      try {
        const saved =
          await getSavedColleges(user.uid);

        setSavedCollegeIds(
          new Set(
            saved.map(
              (item) => item.collegeId
            )
          )
        );
      } catch (error) {
        console.error(error);
      }
    };

    loadSavedColleges();
  }, [user]);

  const filteredColleges = useMemo(() => {
    return filterColleges(
      colleges,
      filters
    );
  }, [colleges, filters]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredColleges.length /
        ITEMS_PER_PAGE
    )
  );

  const currentPage = Math.min(
    page,
    totalPages
  );

  const visibleColleges =
    filteredColleges.slice(
      (currentPage - 1) *
        ITEMS_PER_PAGE,
      currentPage *
        ITEMS_PER_PAGE
    );

  const updateFilters = (
    changes: Partial<CollegeFilters>
  ) => {
    const next = {
      ...filters,
      ...changes,
    };

    setFilters(next);
    setPage(1);

    const params = new URLSearchParams();

    if (next.search) {
      params.set(
        "search",
        next.search
      );
    }

    if (next.state) {
      params.set(
        "state",
        next.state
      );
    }

    if (next.district) {
      params.set(
        "district",
        next.district
      );
    }

    if (next.course) {
      params.set(
        "course",
        next.course
      );
    }

    if (next.verifiedOnly) {
      params.set(
        "verified",
        "true"
      );
    }

    if (next.sort !== "name-asc") {
      params.set(
        "sort",
        next.sort
      );
    }

    setSearchParams(params);
  };

  const resetFilters = () => {
    const next: CollegeFilters = {
      search: "",
      state: "",
      district: "",
      course: "",
      verifiedOnly: false,
      sort: "name-asc",
    };

    setFilters(next);
    setPage(1);
    setSearchParams({});
  };

  const changePage = (
    nextPage: number
  ) => {
    const safePage = Math.min(
      Math.max(nextPage, 1),
      totalPages
    );

    setPage(safePage);

    const params =
      new URLSearchParams(
        searchParams
      );

    if (safePage > 1) {
      params.set(
        "page",
        String(safePage)
      );
    } else {
      params.delete("page");
    }

    setSearchParams(params);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleSave = async (
    college: College
  ) => {
    if (!user) {
      return;
    }

    const isSaved =
      savedCollegeIds.has(
        college.id
      );

    try {
      if (isSaved) {
        await removeSavedCollege(
          user.uid,
          college.id
        );

        setSavedCollegeIds(
          (current) => {
            const next =
              new Set(current);

            next.delete(college.id);

            return next;
          }
        );
      } else {
        await saveCollege(
          user.uid,
          college
        );

        setSavedCollegeIds(
          (current) => {
            const next =
              new Set(current);

            next.add(college.id);

            return next;
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleCompare = (
    collegeId: string
  ) => {
    setCompareIds((current) => {
      if (current.includes(collegeId)) {
        return current.filter(
          (id) => id !== collegeId
        );
      }

      if (current.length >= 3) {
        return current;
      }

      return [
        ...current,
        collegeId,
      ];
    });
  };

  const compareColleges =
    colleges.filter((college) =>
      compareIds.includes(
        college.id
      )
    );

  const districtOptions =
    Array.from(
      new Set(
        colleges
          .map(
            (college) =>
              college.district
          )
          .filter(Boolean)
      )
    ).sort();

  const courseOptions =
    Array.from(
      new Set(
        colleges.flatMap(
          (college) =>
            college.courses ?? []
        )
      )
    ).sort();

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="relative overflow-hidden bg-slate-950 py-16 text-white lg:py-24">
          <div className="absolute top-0 right-0 h-96 w-96 bg-indigo-600/20 blur-[130px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 h-80 w-80 bg-emerald-500/10 blur-[100px] pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-400">
                <Search className="h-3.5 w-3.5" />
                ACCREDITED COLLEGE DIRECTORY
              </div>

              <h1 className="font-heading text-4xl font-extrabold tracking-tight md:text-6xl text-white">
                Find the Right College <br className="hidden sm:inline" />
                <span className="text-indigo-400">For Your Career Path</span>
              </h1>

              <p className="mt-4 text-base leading-relaxed text-slate-400 md:text-lg">
                Explore accredited engineering, medical, management, and science colleges across Tamil Nadu. Filter by district, degree course, or cut-offs.
              </p>
            </div>

            {/* Search */}
            <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/90 p-3 shadow-2xl backdrop-blur-xl">
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    value={filters.search}
                    onChange={(event) =>
                      updateFilters({
                        search: event.target.value,
                      })
                    }
                    placeholder="Search college name, city, district, or degree..."
                    className="w-full rounded-2xl bg-slate-950 border border-slate-800 px-12 py-3.5 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-800 px-5 py-3 text-sm font-semibold text-white md:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filter Options
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="flex items-start gap-8">
            {/* Desktop filters */}
            <aside className="hidden w-72 shrink-0 lg:block">
              <FilterPanel
                filters={filters}
                updateFilters={
                  updateFilters
                }
                resetFilters={
                  resetFilters
                }
                districtOptions={
                  districtOptions
                }
                courseOptions={
                  courseOptions
                }
              />
            </aside>

            {/* Main */}
            <div className="min-w-0 flex-1">
              {/* Toolbar */}
              <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-950">
                    {filteredColleges.length}{" "}
                    colleges found
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Page {currentPage} of{" "}
                    {totalPages}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </button>

                  <select
                    value={filters.sort}
                    onChange={(event) =>
                      updateFilters({
                        sort:
                          event.target
                            .value as CollegeFilters["sort"],
                      })
                    }
                    className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold outline-none"
                  >
                    <option value="name-asc">
                      Name A–Z
                    </option>

                    <option value="name-desc">
                      Name Z–A
                    </option>

                    <option value="location">
                      Location
                    </option>
                  </select>
                </div>
              </div>

              {/* Results */}
              {loading ? (
                <LoadingGrid />
              ) : visibleColleges.length ===
                0 ? (
                <EmptyResults
                  onReset={
                    resetFilters
                  }
                />
              ) : (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {visibleColleges.map(
                    (college) => {
                      const recommendationScore =
                        getCollegeRecommendationScore(
                          college,
                          profile
                        );

                      const recommended =
                        recommendationScore >=
                        40;

                      return (
                        <CollegeDiscoveryCard
                          key={college.id}
                          college={college}
                          saved={savedCollegeIds.has(
                            college.id
                          )}
                          comparing={compareIds.includes(
                            college.id
                          )}
                          canCompare={
                            compareIds.length <
                              3 ||
                            compareIds.includes(
                              college.id
                            )
                          }
                          recommended={
                            recommended
                          }
                          onSave={() =>
                            toggleSave(
                              college
                            )
                          }
                          onCompare={() =>
                            toggleCompare(
                              college.id
                            )
                          }
                        />
                      );
                    }
                  )}
                </div>
              )}

              {/* Pagination */}
              {!loading &&
                filteredColleges.length >
                  ITEMS_PER_PAGE && (
                  <Pagination
                    page={currentPage}
                    totalPages={
                      totalPages
                    }
                    onChange={
                      changePage
                    }
                  />
                )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile filters */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() =>
              setMobileFiltersOpen(
                false
              )
            }
          />

          <div className="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto rounded-t-3xl bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                Filters
              </h2>

              <button
                type="button"
                onClick={() =>
                  setMobileFiltersOpen(
                    false
                  )
                }
                className="rounded-full bg-gray-100 p-2"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <FilterPanel
              filters={filters}
              updateFilters={
                updateFilters
              }
              resetFilters={
                resetFilters
              }
              districtOptions={
                districtOptions
              }
              courseOptions={
                courseOptions
              }
            />

            <button
              type="button"
              onClick={() =>
                setMobileFiltersOpen(
                  false
                )
              }
              className="mt-6 w-full rounded-xl bg-black px-5 py-3 font-semibold text-white"
            >
              Show Results
            </button>
          </div>
        </div>
      )}

      {/* Compare drawer */}
      {compareColleges.length > 0 && (
        <CompareBar
          colleges={compareColleges}
          onRemove={toggleCompare}
          onClear={() =>
            setCompareIds([])
          }
        />
      )}

      <Footer />
    </>
  );
};

const FilterPanel = ({
  filters,
  updateFilters,
  resetFilters,
  districtOptions,
  courseOptions,
}: {
  filters: CollegeFilters;
  updateFilters: (
    changes: Partial<CollegeFilters>
  ) => void;
  resetFilters: () => void;
  districtOptions: string[];
  courseOptions: string[];
}) => {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5" />

          <h2 className="font-bold">
            Filters
          </h2>
        </div>

        <button
          type="button"
          onClick={resetFilters}
          className="text-xs font-semibold text-gray-500 hover:text-black"
        >
          Clear
        </button>
      </div>

      <div className="mt-6 space-y-5">
        <FilterSelect
          label="State"
          value={filters.state}
          options={states}
          onChange={(value) =>
            updateFilters({
              state: value,
            })
          }
        />

        <FilterSelect
          label="District"
          value={filters.district}
          options={districtOptions}
          onChange={(value) =>
            updateFilters({
              district: value,
            })
          }
        />

        <FilterSelect
          label="Course"
          value={filters.course}
          options={courseOptions}
          onChange={(value) =>
            updateFilters({
              course: value,
            })
          }
        />

        <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 p-4">
          <div>
            <p className="text-sm font-semibold">
              Verified only
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Show verified colleges
            </p>
          </div>

          <input
            type="checkbox"
            checked={
              filters.verifiedOnly
            }
            onChange={(event) =>
              updateFilters({
                verifiedOnly:
                  event.target.checked,
              })
            }
            className="h-5 w-5 accent-black"
          />
        </label>
      </div>
    </div>
  );
};

const FilterSelect = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (
    value: string
  ) => void;
}) => (
  <div>
    <label className="mb-2 block text-sm font-semibold text-gray-700">
      {label}
    </label>

    <div className="relative">
      <select
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 pr-10 text-sm outline-none focus:border-black"
      >
        <option value="">
          All {label}s
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>

      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
    </div>
  </div>
);

const CollegeDiscoveryCard = ({
  college,
  saved,
  comparing,
  canCompare,
  recommended,
  onSave,
  onCompare,
}: {
  college: College;
  saved: boolean;
  comparing: boolean;
  canCompare: boolean;
  recommended: boolean;
  onSave: () => void;
  onCompare: () => void;
}) => {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col justify-between">
      <div>
        <div className="relative h-48 overflow-hidden bg-slate-100">
          {college.logo ? (
            <img
              src={college.logo}
              alt={college.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-indigo-600 to-violet-700 text-5xl font-heading font-black text-white">
              {college.name.charAt(0)}
            </div>
          )}

          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {college.verified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-bold text-white shadow-md">
                <ShieldCheck className="h-3.5 w-3.5" />
                Verified
              </span>
            )}

            {recommended && (
              <span className="rounded-full bg-indigo-600 px-3 py-1 text-[11px] font-bold text-white shadow-md">
                Recommended
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onSave}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-md transition hover:scale-110"
            aria-label={saved ? "Remove saved college" : "Save college"}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                saved ? "fill-rose-500 text-rose-500" : "text-slate-600 hover:text-rose-500"
              }`}
            />
          </button>
        </div>

        <div className="p-5">
          <h3 className="line-clamp-2 font-heading text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
            {college.name}
          </h3>

          <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <MapPin className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
            <span>
              {college.location}
              {college.district ? `, ${college.district}` : ""}
            </span>
          </div>

          <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-600">
            {college.description}
          </p>

          {college.courses && college.courses.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {college.courses.slice(0, 3).map((course) => (
                <span
                  key={course}
                  className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600"
                >
                  {course}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-5 pt-0">
        <div className="grid grid-cols-2 gap-2">
          <Link
            to={`/colleges/${college.id}`}
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-2.5 text-center text-xs font-semibold text-white shadow-md transition hover:opacity-95"
          >
            View Details
          </Link>

          <Link
            to={`/colleges/${college.id}/apply`}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-center text-xs font-semibold text-slate-800 transition hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700"
          >
            Apply Now
          </Link>
        </div>

        <button
          type="button"
          onClick={onCompare}
          disabled={!canCompare}
          className={`mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition ${
            comparing
              ? "bg-slate-900 text-white"
              : canCompare
              ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
              : "bg-slate-50 text-slate-300 cursor-not-allowed"
          }`}
        >
          {comparing ? <Check className="h-3.5 w-3.5" /> : null}
          {comparing ? "Comparing" : "Compare"}
        </button>
      </div>
    </article>
  );
};

const CompareBar = ({
  colleges,
  onRemove,
  onClear,
}: {
  colleges: College[];
  onRemove: (
    collegeId: string
  ) => void;
  onClear: () => void;
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 p-4 shadow-2xl backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-bold text-gray-950">
            Compare ({colleges.length}/3)
          </span>

          {colleges.map((college) => (
            <div
              key={college.id}
              className="flex items-center gap-2 rounded-xl bg-gray-100 px-3 py-2"
            >
              <span className="max-w-36 truncate text-xs font-semibold">
                {college.name}
              </span>

              <button
                type="button"
                onClick={() =>
                  onRemove(
                    college.id
                  )
                }
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClear}
            className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold"
          >
            Clear
          </button>

          <button
            type="button"
            onClick={() =>
              alert(
                "College comparison screen will be added in the next step."
              )
            }
            disabled={
              colleges.length < 2
            }
            className="rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Compare Now
          </button>
        </div>
      </div>
    </div>
  );
};

const Pagination = ({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (
    page: number
  ) => void;
}) => {
  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        type="button"
        disabled={page === 1}
        onClick={() =>
          onChange(page - 1)
        }
        className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold disabled:opacity-40"
      >
        Previous
      </button>

      {Array.from(
        {
          length: totalPages,
        },
        (_, index) => index + 1
      )
        .slice(
          Math.max(0, page - 3),
          Math.min(
            totalPages,
            page + 2
          )
        )
        .map((number) => (
          <button
            key={number}
            type="button"
            onClick={() =>
              onChange(number)
            }
            className={`h-10 w-10 rounded-xl text-sm font-semibold ${
              number === page
                ? "bg-black text-white"
                : "border border-gray-300 bg-white hover:bg-gray-100"
            }`}
          >
            {number}
          </button>
        ))}

      <button
        type="button"
        disabled={
          page === totalPages
        }
        onClick={() =>
          onChange(page + 1)
        }
        className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

const LoadingGrid = () => (
  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
    {Array.from({
      length: 6,
    }).map((_, index) => (
      <div
        key={index}
        className="overflow-hidden rounded-3xl border border-gray-200 bg-white"
      >
        <div className="h-48 animate-pulse bg-gray-200" />

        <div className="space-y-3 p-5">
          <div className="h-5 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
          <div className="h-16 animate-pulse rounded bg-gray-100" />
        </div>
      </div>
    ))}
  </div>
);

const EmptyResults = ({
  onReset,
}: {
  onReset: () => void;
}) => (
  <div className="rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center">
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
      <Search className="h-6 w-6 text-gray-500" />
    </div>

    <h2 className="mt-5 text-xl font-bold">
      No colleges found
    </h2>

    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
      Try changing your search or removing
      one of the filters.
    </p>

    <button
      type="button"
      onClick={onReset}
      className="mt-6 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
    >
      Clear Filters
    </button>
  </div>
);

export default Colleges;