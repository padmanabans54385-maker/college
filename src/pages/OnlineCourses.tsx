import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Clock,
  GraduationCap,
  Search,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getPublishedOnlineCourses } from "../services/onlineCourseService";
import { Seo } from "../components/Seo";
import { LoadingSkeleton, EmptyState } from "../components/ui/States";
import type { OnlineCourse } from "../types";

const OnlineCourses = () => {
  const [courses, setCourses] = useState<OnlineCourse[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedOnlineCourses()
      .then(setCourses)
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(courses.map((c) => c.category))),
    [courses]
  );

  const filteredCourses = useMemo(() => {
    const val = search.toLowerCase().trim();
    return courses.filter((c) => {
      const matchSearch =
        !val ||
        c.title.toLowerCase().includes(val) ||
        c.category.toLowerCase().includes(val) ||
        c.instructor.toLowerCase().includes(val);
      const matchCategory = !category || c.category === category;
      return matchSearch && matchCategory;
    });
  }, [courses, search, category]);

  return (
    <>
      <Seo title="Online Masterclasses & Certifications" description="Learn job-ready skills from academic and industry experts." path="/online-courses" />
      <Navbar />
      <div className="min-h-screen bg-[#F5F9FC]">
        <section className="border-b border-[#E2ECF3]/60 bg-[#E8F4FA] py-14 text-[#075B63]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E2ECF3] bg-[#F0F8FD] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#075B63]">
              <Sparkles className="h-3.5 w-3.5 text-[#075B63]" />
              Skill Certifications & Masterclasses
            </span>

            <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-[#075B63] md:text-6xl">
              Learn Job-Ready Skills <br className="hidden sm:inline" />
              <span className="font-serif-italic font-normal italic text-[#075B63]">From Industry Experts</span>
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#5A6E78] md:text-lg">
              Explore online masterclasses and certification courses designed to accelerate your engineering and technology career.
            </p>

            <div className="mt-8 flex flex-col gap-3 md:flex-row">
              <div className="flex flex-1 items-center rounded-2xl border border-[#E2ECF3] bg-white px-5 shadow-sm transition focus-within:border-[#075B63] focus-within:ring-2 focus-within:ring-[#075B63]/20">
                <Search size={20} className="text-[#5A6E78] shrink-0" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search online courses, instructors, subjects..."
                  className="w-full bg-transparent px-3 py-4 text-sm text-[#075B63] placeholder-[#5A6E78]/60 outline-none"
                />
              </div>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-2xl border border-[#E2ECF3] bg-white px-5 py-4 text-sm font-semibold text-[#075B63] outline-none shadow-sm focus:border-[#075B63]"
              >
                <option value="">All Categories</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#075B63]">
                Available Certification Courses
              </h2>
              <p className="mt-1 text-xs font-semibold text-[#5A6E78]">
                Showing {filteredCourses.length} accredited courses
              </p>
            </div>
          </div>

          {loading ? (
            <LoadingSkeleton label="Loading certification courses" />
          ) : filteredCourses.length === 0 ? (
            <EmptyState title="No courses found" description="Try adjusting your search terms or category selection." />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <Link
                  key={course.id}
                  to={`/online-courses/${course.id}`}
                  className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-[#E2ECF3] bg-white shadow-xs transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div>
                    <div className="relative flex h-48 items-center justify-center bg-[#E8F4FA] overflow-hidden">
                      {course.image ? (
                        <img
                          src={course.image}
                          alt={course.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#075B63] to-[#05434A] text-white">
                          <GraduationCap size={56} className="text-[#E8F4FA]" />
                        </div>
                      )}
                      <span className="absolute top-3 left-3 rounded-full border border-[#E2ECF3] bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-[#075B63] shadow-xs">
                        {course.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <h3 className="font-heading text-lg font-bold text-[#075B63] transition group-hover:text-[#075B63]">
                        {course.title}
                      </h3>

                      <p className="mt-1 text-xs font-semibold text-[#5A6E78]">
                        Instructor: <span className="text-[#075B63]">{course.instructor}</span>
                      </p>

                      <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-[#5A6E78]">
                        {course.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-0">
                    <div className="flex items-center justify-between border-t border-[#E2ECF3]/60 pt-4 text-xs font-semibold text-[#5A6E78]">
                      <span className="flex items-center gap-1.5">
                        <Clock size={15} className="text-[#075B63]" />
                        {course.duration}
                      </span>
                      <span className="font-heading text-lg font-extrabold text-[#075B63]">
                        ₹{course.price}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#075B63] py-3 text-xs font-bold text-white shadow-xs transition group-hover:bg-[#05434A]">
                      <BookOpen size={15} />
                      <span>Enroll in Course</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default OnlineCourses;