import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Clock,
  GraduationCap,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getPublishedOnlineCourses } from "../services/onlineCourseService";
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
      <Navbar />
      <div className="min-h-screen bg-slate-50">
        <section className="relative overflow-hidden bg-slate-950 py-16 text-white lg:py-24">
          <div className="absolute top-0 right-0 h-96 w-96 bg-indigo-600/20 blur-[130px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 h-80 w-80 bg-emerald-500/10 blur-[100px] pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <span className="inline-flex rounded-full bg-indigo-500/10 border border-indigo-500/30 px-4 py-1.5 text-xs font-bold text-indigo-400">
              CAREER CERTIFICATIONS & SKILLS
            </span>

            <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white md:text-6xl">
              Learn Job-Ready Skills <br className="hidden sm:inline" />
              <span className="text-indigo-400">From Academic Industry Experts</span>
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
              Explore online masterclasses and certification courses designed to accelerate your engineering, management, and technology careers.
            </p>

            <div className="mt-10 flex flex-col gap-3 md:flex-row">
              <div className="flex flex-1 items-center rounded-2xl border border-slate-800 bg-slate-900/90 px-4 text-white">
                <Search size={20} className="text-slate-400 shrink-0" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search online courses, instructors, subjects..."
                  className="w-full bg-transparent px-3 py-4 text-sm outline-none placeholder:text-slate-500"
                />
              </div>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4 text-sm font-semibold text-white outline-none cursor-pointer"
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
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-heading text-2xl font-bold text-slate-900">
                Explore Available Certification Courses
              </h2>
              <p className="mt-1 text-xs text-slate-500 font-medium">
                Showing {filteredCourses.length} accredited courses
              </p>
            </div>
          </div>

          {loading ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center text-slate-500 font-medium shadow-sm">
              Loading available courses...
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center text-slate-500">
              <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="font-heading text-lg font-bold text-slate-800">No courses found</h3>
              <p className="mt-1 text-xs text-slate-400">Try adjusting your search terms or filters.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <Link
                  key={course.id}
                  to={`/online-courses/${course.id}`}
                  className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative flex h-52 items-center justify-center bg-slate-100 overflow-hidden">
                      {course.image ? (
                        <img
                          src={course.image}
                          alt={course.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-600 to-violet-700 text-white">
                          <GraduationCap size={56} />
                        </div>
                      )}
                      <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-indigo-700 shadow-sm">
                        {course.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {course.title}
                      </h3>

                      <p className="mt-1 text-xs font-semibold text-slate-400">
                        Instructor: <span className="text-slate-700">{course.instructor}</span>
                      </p>

                      <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-600">
                        {course.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-0">
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Clock size={15} className="text-indigo-500" />
                        {course.duration}
                      </span>
                      <span className="font-heading text-lg font-extrabold text-indigo-600">
                        ₹{course.price}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-indigo-50 py-2.5 text-xs font-bold text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <BookOpen size={15} />
                      <span>Enroll in Course</span>
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