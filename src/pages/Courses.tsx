import { useEffect, useMemo, useState } from "react";
import { BookOpen, Search, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getCourseCategories, getPublishedCourses } from "../services/courseService";
import { Seo } from "../components/Seo";
import type { Course, CourseCategory } from "../types";

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<CourseCategory[]>([]);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    Promise.all([
      getPublishedCourses(),
      getCourseCategories(),
    ]).then(([courseData, categoryData]) => {
      setCourses(courseData);
      setCategories(categoryData);
    });
  }, []);

  const filteredCourses = useMemo(() => {
    const value = search.toLowerCase().trim();

    return courses.filter((course) => {
      const matchesSearch =
        !value ||
        course.name.toLowerCase().includes(value) ||
        course.categoryName.toLowerCase().includes(value);

      const matchesCategory =
        !categoryId ||
        course.categoryId === categoryId;

      return matchesSearch && matchesCategory;
    });
  }, [courses, search, categoryId]);

  return (
    <div className="min-h-screen bg-[#edf4ec]">
      <Seo title="Explore Engineering Courses" description="Discover B.E, B.Tech, and specialized engineering courses in Tamil Nadu." path="/courses" />
      <div className="border-b border-[#cdddc9]/60 bg-[#dce8da] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#143527]">
              <BookOpen className="h-3.5 w-3.5 text-[#143527]" />
              Course Directory
            </span>

            <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-[#142e23] md:text-6xl">
              Find the right course <br className="hidden sm:inline" />
              for your <span className="font-serif-italic font-normal italic text-[#143527]">future</span>.
            </h1>

            <p className="mt-4 text-base leading-relaxed text-[#465f51] md:text-lg">
              Explore B.E/B.Tech specializations, eligibility criteria, duration, and Tamil Nadu colleges offering them.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 md:flex-row">
            <div className="flex flex-1 items-center rounded-2xl border border-[#cdddc9] bg-white px-5 shadow-sm transition focus-within:border-[#143527] focus-within:ring-2 focus-within:ring-[#143527]/20">
              <Search size={20} className="text-[#577063]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search course name or branch..."
                className="w-full bg-transparent px-3 py-4 text-sm text-[#142e23] placeholder-[#577063]/60 outline-none"
              />
            </div>

            <select
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
              className="rounded-2xl border border-[#cdddc9] bg-white px-5 py-4 text-sm font-semibold text-[#142e23] outline-none shadow-sm transition focus:border-[#143527]"
            >
              <option value="">All Course Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold text-[#142e23]">
            {filteredCourses.length} Specializations Found
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              className="group flex flex-col justify-between rounded-3xl border border-[#cdddc9] bg-white p-6 sm:p-8 shadow-xs transition-all hover:-translate-y-1 hover:border-[#143527]/40 hover:shadow-md"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#143527] text-white shadow-xs">
                  <BookOpen size={22} className="text-[#dce8da]" />
                </div>

                <p className="mt-5 text-xs font-bold uppercase tracking-wider text-[#143527]">
                  {course.categoryName}
                </p>

                <h3 className="mt-2 font-heading text-xl font-bold text-[#142e23] transition group-hover:text-[#143527]">
                  {course.name}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#465f51]">
                  {course.description || "Explore course overview, eligibility, and colleges offering this branch."}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#cdddc9]/60 pt-5 text-xs font-medium text-[#577063]">
                <span>{course.duration || "4 Years"}</span>
                <span className="flex items-center gap-1 font-bold text-[#143527]">
                  View Details <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="rounded-3xl border border-[#cdddc9] bg-white p-16 text-center shadow-xs">
            <BookOpen className="mx-auto text-[#577063]/40" size={48} />
            <h3 className="mt-4 font-heading text-xl font-bold text-[#142e23]">
              No courses found
            </h3>
            <p className="mt-2 text-sm text-[#577063]">
              Try adjusting your search query or selecting a different course category.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Courses;