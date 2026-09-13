import { useEffect, useState } from "react";

import {
  ArrowLeft,
  CheckCircle2,
  PlayCircle,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import { useAuth } from "../hooks/AuthContext";

import {
  getCourseEnrollment,
  getOnlineCourseById,
  updateEnrollmentProgress,
} from "../services/onlineCourseService";

import type {
  CourseEnrollment,
  OnlineCourse,
} from "../types";

const OnlineCourseLearn = () => {
  const { courseId } = useParams();

  const { user } = useAuth();

  const [course, setCourse] =
    useState<OnlineCourse | null>(null);

  const [enrollment, setEnrollment] =
    useState<CourseEnrollment | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!courseId || !user) return;

      const [courseData, enrollmentData] =
        await Promise.all([
          getOnlineCourseById(courseId),
          getCourseEnrollment(
            user.uid,
            courseId
          ),
        ]);

      setCourse(courseData);
      setEnrollment(enrollmentData);
    };

    load();
  }, [courseId, user]);

  const markComplete = async () => {
    if (!enrollment) return;

    await updateEnrollmentProgress(
      enrollment.id,
      100
    );

    setEnrollment({
      ...enrollment,
      progress: 100,
      status: "completed",
    });
  };

  if (!user) {
    return null;
  }

  if (!course || !enrollment) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading learning area...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <Link
            to={`/online-courses/${course.id}`}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black"
          >
            <ArrowLeft size={17} />
            Back to Course
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="aspect-video overflow-hidden rounded-3xl bg-black">
              <div className="flex h-full flex-col items-center justify-center text-white">
                <PlayCircle
                  size={70}
                  strokeWidth={1.2}
                />

                <p className="mt-5 text-lg font-semibold">
                  Course Video
                </p>

                <p className="mt-2 text-sm text-gray-400">
                  Video lessons can be connected here.
                </p>
              </div>
            </div>

            <div className="mt-7 rounded-3xl border bg-white p-7">
              <p className="text-sm font-semibold text-gray-500">
                {course.category}
              </p>

              <h1 className="mt-2 text-3xl font-black">
                {course.title}
              </h1>

              <p className="mt-4 leading-7 text-gray-600">
                {course.description}
              </p>
            </div>
          </div>

          <aside>
            <div className="sticky top-24 rounded-3xl border bg-white p-6">
              <h2 className="text-xl font-bold">
                Your Progress
              </h2>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Completion
                </span>

                <strong>
                  {enrollment.progress}%
                </strong>
              </div>

              <div className="mt-2 h-3 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-black"
                  style={{
                    width: `${enrollment.progress}%`,
                  }}
                />
              </div>

              {enrollment.progress < 100 ? (
                <button
                  onClick={markComplete}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 font-semibold text-white"
                >
                  <CheckCircle2 size={18} />
                  Mark Course Complete
                </button>
              ) : (
                <div className="mt-6 rounded-xl bg-gray-100 p-4 text-center text-sm font-semibold">
                  Course Completed ✓
                </div>
              )}

              <div className="mt-7 border-t pt-6">
                <h3 className="font-bold">
                  Course Information
                </h3>

                <div className="mt-4 space-y-3 text-sm text-gray-500">
                  <p>
                    Instructor:{" "}
                    <strong className="text-gray-800">
                      {course.instructor}
                    </strong>
                  </p>

                  <p>
                    Lessons:{" "}
                    <strong className="text-gray-800">
                      {course.lessons}
                    </strong>
                  </p>

                  <p>
                    Duration:{" "}
                    <strong className="text-gray-800">
                      {course.duration}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default OnlineCourseLearn;