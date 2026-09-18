import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { getCourses } from "../services/courseService";
import type { Course } from "../types";
import { LoadingSkeleton } from "../components/ui/States";

const CoursesSection = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourses()
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="courses" className="bg-[#edf4ec] py-16 border-t border-[#cdddc9]/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-[#142e23] sm:text-4xl">
            Discover courses
          </h2>
          <Link
            to="/courses"
            className="inline-flex items-center justify-center rounded-full bg-[#143527] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#0b2017]"
          >
            View all
          </Link>
        </div>

        {loading ? (
          <div className="mt-8">
            <LoadingSkeleton />
          </div>
        ) : courses.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-[#cdddc9] bg-white p-8 text-center">
            <p className="text-[#577063]">No courses added to Firebase database yet.</p>
            <p className="mt-1 text-xs text-[#577063]">Courses created in Firebase Firestore will automatically render here.</p>
            <Link to="/courses" className="mt-4 inline-block text-xs font-bold text-[#143527] underline">
              Browse All Courses
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 6).map((course) => (
              <div
                key={course.id}
                className="group flex flex-col justify-between rounded-2xl border border-[#cdddc9] bg-white p-6 shadow-xs transition-all hover:-translate-y-1 hover:border-[#143527] hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-[#d7e7d5] px-2.5 py-0.5 text-[10px] font-bold text-[#143527] uppercase tracking-wider">
                      {course.duration || "4 YEARS"}
                    </span>
                    <span className="text-xs font-medium text-[#577063]">
                      {course.categoryName || "Engineering"}
                    </span>
                  </div>

                  <h3 className="mt-4 font-heading text-lg font-bold text-[#142e23] group-hover:text-[#143527]">
                    {course.name}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[#465f51] line-clamp-3">
                    {course.description || course.eligibility || "High demand degree program across top engineering institutions."}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#edf4ec]">
                  <Link
                    to={`/courses/${course.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#143527] hover:underline"
                  >
                    <span>View course details</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesSection;