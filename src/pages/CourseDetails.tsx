import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  GraduationCap,
  MapPin,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";

import { getCourseById } from "../services/courseService";
import { getCollegeById } from "../services/collegeService";

import type {
  College,
  Course,
} from "../types";

const CourseDetails = () => {
  const { courseId } = useParams();

  const [course, setCourse] =
    useState<Course | null>(null);

  const [colleges, setColleges] =
    useState<College[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourse = async () => {
      if (!courseId) return;

      try {
        const data = await getCourseById(courseId);

        setCourse(data);

        if (data?.collegeIds?.length) {
          const collegeResults =
            await Promise.all(
              data.collegeIds.map((id) =>
                getCollegeById(id)
              )
            );

          setColleges(
            collegeResults.filter(
              Boolean
            ) as College[]
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading course...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Course not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <section className="bg-black text-white">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <Link
              to="/courses"
              className="mb-10 inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white"
            >
              <ArrowLeft size={17} />
              Back to Courses
            </Link>

            <div className="max-w-4xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black">
                <BookOpen size={25} />
              </div>

              <p className="mt-7 text-sm font-semibold text-gray-400">
                {course.categoryName}
              </p>

              <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">
                {course.name}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
                {course.description}
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-3xl border bg-white p-7">
                <h2 className="text-2xl font-bold">
                  Course Information
                </h2>

                <div className="mt-7 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl bg-gray-50 p-5">
                    <Clock size={21} />

                    <p className="mt-4 text-sm text-gray-500">
                      Duration
                    </p>

                    <p className="mt-1 font-bold">
                      {course.duration ||
                        "Not specified"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gray-50 p-5">
                    <GraduationCap size={21} />

                    <p className="mt-4 text-sm text-gray-500">
                      Eligibility
                    </p>

                    <p className="mt-1 font-bold">
                      {course.eligibility ||
                        "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-bold">
                    About this course
                  </h3>

                  <p className="mt-3 whitespace-pre-line leading-7 text-gray-600">
                    {course.description}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-bold">
                  Colleges offering this course
                </h2>

                <div className="mt-5 space-y-4">
                  {colleges.map((college) => (
                    <div
                      key={college.id}
                      className="rounded-2xl border bg-white p-6"
                    >
                      <div className="flex flex-col justify-between gap-5 md:flex-row">
                        <div>
                          <h3 className="text-xl font-bold">
                            {college.name}
                          </h3>

                          <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                            <MapPin size={15} />
                            {college.location},{" "}
                            {college.district}
                          </p>

                          {college.verified && (
                            <p className="mt-3 flex items-center gap-2 text-sm font-semibold">
                              <CheckCircle2
                                size={16}
                              />
                              Verified College
                            </p>
                          )}
                        </div>

                        <div className="flex gap-3">
                          <Link
                            to={`/colleges/${college.id}`}
                            className="rounded-xl border px-5 py-3 text-sm font-semibold"
                          >
                            View College
                          </Link>

                          <Link
                            to={`/colleges/${college.id}/apply?courseId=${course.id}`}
                            className="rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
                          >
                            Apply Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}

                  {colleges.length === 0 && (
                    <div className="rounded-2xl border bg-white p-8 text-center text-gray-500">
                      No colleges have been linked to
                      this course yet.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <aside>
              <div className="sticky top-24 rounded-3xl bg-black p-7 text-white">
                <BookOpen size={26} />

                <h3 className="mt-5 text-2xl font-bold">
                  Start your admission journey
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-300">
                  Explore colleges offering this course
                  and submit your application.
                </p>

                <Link
                  to="/colleges"
                  className="mt-7 block rounded-xl bg-white px-5 py-3 text-center font-semibold text-black"
                >
                  Explore Colleges
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