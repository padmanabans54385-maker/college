import { useEffect, useState } from "react";

import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  GraduationCap,
  PlayCircle,
} from "lucide-react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

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
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">
          Course not found
        </h1>

        <Link
          to="/online-courses"
          className="mt-4 rounded-xl bg-black px-5 py-3 text-white"
        >
          Browse Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <Link
            to="/online-courses"
            className="inline-flex items-center gap-2 text-sm text-gray-300"
          >
            <ArrowLeft size={17} />
            Back to Online Courses
          </Link>

          <div className="mt-10 max-w-4xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black">
              <GraduationCap size={26} />
            </div>

            <p className="mt-7 text-sm font-semibold text-gray-400">
              {course.category}
            </p>

            <h1 className="mt-3 text-4xl font-black md:text-6xl">
              {course.title}
            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-300">
              {course.description}
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-12">
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
  <div className="rounded-2xl border bg-white p-5">
    {icon}

    <p className="mt-4 text-sm text-gray-500">
      {label}
    </p>

    <p className="mt-1 font-bold capitalize">
      {value || "Not specified"}
    </p>
  </div>
);

export default OnlineCourseDetails;