import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  PlayCircle,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
      <div className="min-h-screen bg-[#F5F9FC] font-sans text-[#075B63]">
        <Navbar />
        <div className="flex min-h-[70vh] items-center justify-center font-medium text-[#5A6E78]">
          Loading learning area...
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F9FC] font-sans text-[#075B63]">
      <Navbar />

      <header className="border-b border-[#E2ECF3] bg-[#E8F4FA] py-4">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Link
            to={`/online-courses/${course.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#5A6E78] hover:text-[#075B63]"
          >
            <ArrowLeft size={17} />
            Back to Course Overview
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="aspect-video overflow-hidden rounded-3xl bg-[#075B63] shadow-lg">
              <div className="flex h-full flex-col items-center justify-center text-white">
                <PlayCircle
                  size={70}
                  strokeWidth={1.2}
                  className="text-[#F0F8FD]"
                />

                <p className="mt-5 font-heading text-xl font-bold">
                  Course Video Lesson
                </p>

                <p className="mt-2 text-sm text-[#D6EEF8]">
                  Interactive video content area
                </p>
              </div>
            </div>

            <div className="mt-7 rounded-3xl border border-[#E2ECF3] bg-white p-7 shadow-xs">
              <span className="rounded-full border border-[#E2ECF3] bg-[#F0F8FD] px-3.5 py-1 text-xs font-semibold text-[#075B63]">
                {course.category}
              </span>

              <h1 className="mt-4 font-heading text-3xl font-extrabold text-[#075B63]">
                {course.title}
              </h1>

              <p className="mt-4 leading-relaxed text-[#5A6E78]">
                {course.description}
              </p>
            </div>
          </div>

          <aside>
            <div className="sticky top-24 rounded-3xl border border-[#E2ECF3] bg-white p-6 shadow-xs">
              <h2 className="font-heading text-xl font-bold text-[#075B63]">
                Your Progress
              </h2>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm font-medium text-[#5A6E78]">
                  Completion Status
                </span>

                <strong className="font-heading text-lg font-bold text-[#075B63]">
                  {enrollment.progress}%
                </strong>
              </div>

              <div className="mt-2 h-3 overflow-hidden rounded-full bg-[#F0F8FD] border border-[#E2ECF3]">
                <div
                  className="h-full rounded-full bg-[#075B63] transition-all duration-500"
                  style={{
                    width: `${enrollment.progress}%`,
                  }}
                />
              </div>

              {enrollment.progress < 100 ? (
                <button
                  type="button"
                  onClick={markComplete}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#075B63] px-5 py-3 font-semibold text-white transition hover:bg-[#05434A]"
                >
                  <CheckCircle2 size={18} />
                  Mark Course Complete
                </button>
              ) : (
                <div className="mt-6 rounded-2xl border border-[#E2ECF3] bg-[#F0F8FD] p-4 text-center text-sm font-bold text-[#075B63]">
                  Course Completed ✓
                </div>
              )}

              <div className="mt-7 border-t border-[#E2ECF3]/60 pt-6">
                <h3 className="font-heading text-base font-bold text-[#075B63]">
                  Course Information
                </h3>

                <div className="mt-4 space-y-3 text-sm text-[#5A6E78]">
                  <p>
                    Instructor:{" "}
                    <strong className="text-[#075B63]">
                      {course.instructor}
                    </strong>
                  </p>

                  <p>
                    Lessons:{" "}
                    <strong className="text-[#075B63]">
                      {course.lessons}
                    </strong>
                  </p>

                  <p>
                    Duration:{" "}
                    <strong className="text-[#075B63]">
                      {course.duration}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OnlineCourseLearn;