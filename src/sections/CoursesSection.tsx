import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCourses } from "../services/courseService";
import { BooksIcon, GrowthArrowIcon } from "../components/icons/AcademicIcons";
import { brand } from "../config/brand";
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
    <section id="courses" className="bg-white py-16 border-t border-[#E2ECF3]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#075B63] sm:text-4xl">
              Popular programs
            </h2>
            <p className="mt-2 font-poppins text-sm text-[#5A6E78]">
              Course selection aligned with career growth and academic strength.
            </p>
          </div>
          <div className="hidden overflow-hidden rounded-2xl bg-[#F5F9FC] p-3 lg:col-span-4 lg:block">
            <img
              src={brand.images.bookStack}
              alt="Stack of academic books with a graduation cap"
              className="mx-auto h-28 w-auto object-contain"
              loading="lazy"
            />
          </div>
        </div>
        <div className="mt-6">
          <Link to="/courses" className="btn-primary text-xs py-2 px-4">
            View all
          </Link>
        </div>

        {loading ? (
          <div className="mt-8">
            <LoadingSkeleton />
          </div>
        ) : courses.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-[#E2ECF3] bg-white p-8 text-center">
            <p className="text-[#5A6E78]">No courses added to Firebase database yet.</p>
            <p className="mt-1 text-xs text-[#5A6E78]">Courses created in Firebase Firestore will automatically render here.</p>
            <Link to="/courses" className="mt-4 inline-block text-xs font-bold text-[#075B63] underline">
              Browse All Courses
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 6).map((course) => (
              <div
                key={course.id}
                className="academic-card group flex flex-col justify-between p-6"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="academic-badge">
                      <BooksIcon size={12} />
                      {course.duration || "4 YEARS"}
                    </span>
                    <span className="text-xs font-medium text-[#5A6E78]">
                      {course.categoryName || "Engineering"}
                    </span>
                  </div>

                  <h3 className="mt-4 font-heading text-lg font-bold text-[#075B63] group-hover:text-[#075B63]">
                    {course.name}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[#5A6E78] line-clamp-3">
                    {course.description || course.eligibility || "High demand degree program across top engineering institutions."}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F5F9FC]">
                  <Link
                    to={`/courses/${course.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#075B63] hover:underline"
                  >
                    <span>View course details</span>
                    <GrowthArrowIcon size={14} />
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