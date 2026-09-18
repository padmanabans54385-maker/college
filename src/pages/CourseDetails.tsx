import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  GraduationCap,
  MapPin,
  Building2,
  ArrowRight,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getCourseById } from "../services/courseService";
import { getCollegeById } from "../services/collegeService";
import { LoadingSkeleton, EmptyState } from "../components/ui/States";
import type { College, Course } from "../types";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourse = async () => {
      if (!courseId) return;
      try {
        const data = await getCourseById(courseId);
        setCourse(data);

        if (data?.collegeIds?.length) {
          const collegeResults = await Promise.all(
            data.collegeIds.map((id) => getCollegeById(id))
          );
          setColleges(collegeResults.filter(Boolean) as College[]);
        }
      } finally {
        setLoading(false);
      }
    };
    loadCourse();
  }, [courseId]);

  if (loading) return <LoadingSkeleton label="Loading course details" />;
  if (!course) {
    return (
      <main className="bg-[#edf4ec] py-16">
        <div className="mx-auto max-w-3xl px-4">
          <EmptyState title="Course not found" description="This course is unavailable." />
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#edf4ec]">
      <main>
        {/* Banner Section */}
        <section className="border-b border-[#cdddc9]/60 bg-[#dce8da] py-12 sm:py-16 text-[#142e23]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              to="/courses"
              className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#143527] hover:underline"
            >
              <ArrowLeft size={16} />
              Back to Courses
            </Link>

            <div className="max-w-4xl">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#143527] text-white shadow-xs">
                <BookOpen size={24} className="text-[#dce8da]" />
              </div>

              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-[#143527]">
                {course.categoryName}
              </p>

              <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight sm:text-5xl text-[#142e23]">
                {course.name}
              </h1>

              <p className="mt-4 max-w-3xl text-base text-[#465f51] leading-relaxed">
                {course.description}
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <div className="rounded-3xl border border-[#cdddc9] bg-white p-6 sm:p-8 shadow-md">
                <h2 className="font-heading text-2xl font-bold text-[#142e23]">
                  Course Overview & Eligibility
                </h2>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-[#cdddc9] bg-[#edf4ec]/50 p-5">
                    <Clock size={20} className="text-[#143527]" />
                    <p className="mt-3 text-xs font-bold uppercase text-[#577063]">
                      Duration
                    </p>
                    <p className="mt-1 font-heading text-lg font-bold text-[#142e23]">
                      {course.duration || "4 Years (8 Semesters)"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#cdddc9] bg-[#edf4ec]/50 p-5">
                    <GraduationCap size={20} className="text-[#143527]" />
                    <p className="mt-3 text-xs font-bold uppercase text-[#577063]">
                      Eligibility
                    </p>
                    <p className="mt-1 font-heading text-base font-bold text-[#142e23]">
                      {course.eligibility || "Pass in 10+2 with PCM"}
                    </p>
                  </div>
                </div>

                <div className="mt-8 border-t border-[#cdddc9]/60 pt-6">
                  <h3 className="font-heading text-lg font-bold text-[#142e23]">
                    About this Specialization
                  </h3>
                  <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-[#465f51]">
                    {course.description}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold text-[#142e23]">
                  Colleges Offering {course.name}
                </h2>

                <div className="mt-4 space-y-4">
                  {colleges.map((college) => (
                    <div
                      key={college.id}
                      className="rounded-3xl border border-[#cdddc9] bg-white p-6 shadow-xs transition hover:shadow-md"
                    >
                      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div>
                          <h3 className="font-heading text-xl font-bold text-[#142e23]">
                            {college.name}
                          </h3>
                          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#577063]">
                            <MapPin size={14} className="text-[#143527]" />
                            {college.location}, {college.district}
                          </p>

                          {college.verified && (
                            <span className="mt-3 inline-flex items-center gap-1 rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-3 py-1 text-xs font-bold text-[#143527]">
                              <CheckCircle2 size={14} /> Verified Institution
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <Link
                            to={`/colleges/${college.id}`}
                            className="rounded-full border border-[#cdddc9] bg-[#edf4ec] px-5 py-2.5 text-xs font-bold text-[#142e23] transition hover:bg-[#dce8da]"
                          >
                            View College
                          </Link>

                          <Link
                            to={`/colleges/${college.id}/apply?courseId=${course.id}`}
                            className="rounded-full bg-[#143527] px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-[#0b2017]"
                          >
                            Apply Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}

                  {colleges.length === 0 && (
                    <div className="rounded-3xl border border-[#cdddc9] bg-white p-8 text-center text-sm text-[#577063]">
                      No colleges have been linked to this course specialization yet.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <aside>
              <div className="sticky top-24 rounded-3xl border border-[#cdddc9] bg-[#143527] p-8 text-white shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
                  <Building2 size={24} className="text-[#dce8da]" />
                </div>

                <h3 className="mt-5 font-heading text-2xl font-bold">
                  Start your admission journey
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#c4e0ce]">
                  Explore all accredited engineering colleges offering this specialization in Tamil Nadu.
                </p>

                <Link
                  to="/colleges"
                  className="mt-8 flex items-center justify-center gap-2 rounded-full bg-white py-3.5 text-sm font-bold text-[#143527] shadow-md transition hover:bg-[#dce8da]"
                >
                  <span>Explore Colleges</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CourseDetails;