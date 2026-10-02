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
      const nameMatch = (course.name || "").toLowerCase().includes(value);
      const catMatch = (course.categoryName || "").toLowerCase().includes(value);
      const descMatch = (course.description || "").toLowerCase().includes(value);

      const matchesSearch = !value || nameMatch || catMatch || descMatch;
      const matchesCategory = !categoryId || course.categoryId === categoryId;

      return matchesSearch && matchesCategory;
    });
  }, [courses, search, categoryId]);

  return (
    <div className="min-h-screen bg-[#F5F9FC]">
      <Seo title="Explore Engineering Courses" description="Discover B.E, B.Tech, and specialized engineering courses in Tamil Nadu." path="/courses" />
      <div className="border-b border-[#E2ECF3]/60 bg-[#E8F4FA] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E2ECF3] bg-[#F0F8FD] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#075B63]">
              <BookOpen className="h-3.5 w-3.5 text-[#075B63]" />
              Course Directory
            </span>

            <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-[#075B63] md:text-6xl">
              Find the right course <br className="hidden sm:inline" />
              for your <span className="font-serif-italic font-normal italic text-[#075B63]">future</span>.
            </h1>

            <p className="mt-4 text-base leading-relaxed text-[#5A6E78] md:text-lg">
              Explore B.E/B.Tech specializations, eligibility criteria, duration, and Tamil Nadu colleges offering them.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 md:flex-row">
            <div className="flex flex-1 items-center rounded-2xl border border-[#E2ECF3] bg-white px-5 shadow-sm transition focus-within:border-[#075B63] focus-within:ring-2 focus-within:ring-[#075B63]/20">
              <Search size={20} className="text-[#5A6E78]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search course name or branch..."
                className="w-full bg-transparent px-3 py-4 text-sm text-[#075B63] placeholder-[#5A6E78]/60 outline-none"
              />
            </div>

            <select
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
              className="rounded-2xl border border-[#E2ECF3] bg-white px-5 py-4 text-sm font-semibold text-[#075B63] outline-none shadow-sm transition focus:border-[#075B63]"
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
          <h2 className="font-heading text-2xl font-bold text-[#075B63]">
            {filteredCourses.length} Specializations Found
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              className="group flex flex-col justify-between rounded-3xl border border-[#E2ECF3] bg-white p-6 sm:p-8 shadow-xs transition-all hover:-translate-y-1 hover:border-[#075B63]/40 hover:shadow-md"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#075B63] text-white shadow-xs">
                  <BookOpen size={22} className="text-[#E8F4FA]" />
                </div>

                <p className="mt-5 text-xs font-bold uppercase tracking-wider text-[#075B63]">
                  {course.categoryName}
                </p>

                <h3 className="mt-2 font-heading text-xl font-bold text-[#075B63] transition group-hover:text-[#075B63]">
                  {course.name}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#5A6E78]">
                  {course.description || "Explore course overview, eligibility, and colleges offering this branch."}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#E2ECF3]/60 pt-5 text-xs font-medium text-[#5A6E78]">
                <span>{course.duration || "4 Years"}</span>
                <span className="flex items-center gap-1 font-bold text-[#075B63]">
                  View Details <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="rounded-3xl border border-[#E2ECF3] bg-white p-16 text-center shadow-xs">
            <BookOpen className="mx-auto text-[#5A6E78]/40" size={48} />
            <h3 className="mt-4 font-heading text-xl font-bold text-[#075B63]">
              No courses found
            </h3>
            <p className="mt-2 text-sm text-[#5A6E78]">
              Try adjusting your search query or selecting a different course category.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Courses;