import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  GraduationCap,
  PlayCircle,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useAuth } from "../hooks/AuthContext";

import {
  enrollInOnlineCourse,
  getCourseEnrollment,
  getOnlineCourseById,
} from "../services/onlineCourseService";

import type {
  CourseEnrollment,
  OnlineCourse,
} from "../types";

const OnlineCourseDetails = () => {
  const { courseId } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();

  const [course, setCourse] =
    useState<OnlineCourse | null>(null);

  const [enrollment, setEnrollment] =
    useState<CourseEnrollment | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [enrolling, setEnrolling] =
    useState(false);

  useEffect(() => {
    const load = async () => {
      if (!courseId) return;

      try {
        const courseData =
          await getOnlineCourseById(courseId);

        setCourse(courseData);

        if (user && courseData) {
          const enrollmentData =
            await getCourseEnrollment(
              user.uid,
              courseData.id
            );

          setEnrollment(enrollmentData);
        }
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [courseId, user]);

  const enroll = async () => {
    if (!course) return;

    if (!user) {
      navigate("/login");
      return;
    }

    setEnrolling(true);

    try {
      const result =
        await enrollInOnlineCourse(
          user.uid,
          course.id,
          course.title
        );

      const enrollmentData =
        await getCourseEnrollment(
          user.uid,
          course.id
        );

      setEnrollment(
        enrollmentData ?? {
          id: result,
          userId: user.uid,
          courseId: course.id,
          courseTitle: course.title,
          status: "active",
          progress: 0,
          enrolledAt: new Date(),
        }
      );
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading course...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#edf4ec] font-sans text-[#142e23]">
        <Navbar />

        <main className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
          <h1 className="font-heading text-3xl font-bold text-[#143527]">
            Course not found
          </h1>

          <Link
            to="/online-courses"
            className="mt-6 rounded-full bg-[#143527] px-8 py-3 text-sm font-semibold text-white hover:bg-[#0b2017] transition"
          >
            Browse Courses
          </Link>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#edf4ec] font-sans text-[#142e23]">
      <Navbar />

      <section className="border-b border-[#cdddc9] bg-[#dce8da] py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Link
            to="/online-courses"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#577063] hover:text-[#143527]"
          >
            <ArrowLeft size={17} />
            Back to Online Courses
          </Link>

          <div className="mt-8 max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-4 py-1.5 text-xs font-semibold text-[#143527]">
              <GraduationCap size={16} />
              {course.category}
            </div>

            <h1 className="font-heading text-3xl font-extrabold tracking-tight text-[#143527] sm:text-4xl md:text-5xl">
              {course.title}
            </h1>

            <p className="mt-4 text-base leading-relaxed text-[#577063]">
              {course.description}
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="grid gap-4 md:grid-cols-3">
              <InfoCard
                icon={<Clock size={21} />}
                label="Duration"
                value={course.duration}
              />

              <InfoCard
                icon={<BookOpen size={21} />}
                label="Lessons"
                value={String(course.lessons)}
              />

              <InfoCard
                icon={<GraduationCap size={21} />}
                label="Level"
                value={course.level}
              />
            </div>

            <div className="mt-7 rounded-3xl border bg-white p-7">
              <h2 className="text-2xl font-bold">
                About this course
              </h2>

              <p className="mt-4 whitespace-pre-line leading-7 text-gray-600">
                {course.description}
              </p>
            </div>

            <div className="mt-7 rounded-3xl border bg-white p-7">
              <h2 className="text-2xl font-bold">
                What you'll learn
              </h2>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {[
                  "Practical concepts",
                  "Industry-relevant knowledge",
                  "Hands-on learning",
                  "Career-focused skills",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-gray-50 p-4"
                  >
                    <CheckCircle2 size={18} />
                    <span className="text-sm font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside>
            <div className="sticky top-24 overflow-hidden rounded-3xl border bg-white shadow-sm">
              {course.image && (
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-52 w-full object-cover"
                />
              )}

              <div className="p-7">
                <p className="text-sm text-gray-500">
                  Course Fee
                </p>

                <p className="mt-2 text-3xl font-black">
                  {course.price === 0
                    ? "Free"
                    : `₹${course.price}`}
                </p>

                {enrollment ? (
                  <>
                    <div className="mt-7">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>

                        <strong>
                          {enrollment.progress}%
                        </strong>
                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-black"
                          style={{
                            width: `${enrollment.progress}%`,
                          }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        navigate(
                          `/online-courses/${course.id}/learn`
                        )
                      }
                      className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 font-semibold text-white"
                    >
                      <PlayCircle size={18} />
                      Continue Learning
                    </button>
                  </>
                ) : (
                  <button
                    onClick={enroll}
                    disabled={enrolling}
                    className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 font-semibold text-white disabled:opacity-50"
                  >
                    {enrolling
                      ? "Enrolling..."
                      : "Enroll Now"}
                  </button>
                )}

                <p className="mt-4 text-center text-xs text-gray-500">
                  By {course.instructor}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const InfoCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="rounded-3xl border border-[#cdddc9] bg-white p-6 shadow-xs">
    <div className="w-fit rounded-2xl bg-[#e6f0e4] p-3 text-[#143527]">
      {icon}
    </div>

    <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#577063]">
      {label}
    </p>

    <p className="mt-1 font-heading text-lg font-bold text-[#143527] capitalize">
      {value || "Not specified"}
    </p>
  </div>
);

export default OnlineCourseDetails;