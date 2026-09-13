import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  GraduationCap,
  Loader2,
  User,
  BookOpen,
  School,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getCollegeById } from "../services/collegeService";
import { createApplication } from "../services/applicationService";
import { useAuth } from "../hooks/AuthContext";
import type { College } from "../types";

type Step = 1 | 2 | 3 | 4;

const CollegeApplication = () => {
  const { collegeId } = useParams<{ collegeId: string }>();

  const { user, profile } = useAuth();

  const [college, setCollege] = useState<College | null>(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [step, setStep] = useState<Step>(1);

  const [applicationId, setApplicationId] = useState("");

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    courseName: "",

    fullName: profile?.name || user?.displayName || "",
    email: user?.email || "",
    phone: profile?.phone || "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: "",

    schoolName: "",
    board: "",
    passingYear: "",
    percentage: "",
    entranceExam: "",
    entranceScore: "",
  });

  useEffect(() => {
    const loadCollege = async () => {
      if (!collegeId) {
        setLoading(false);
        return;
      }

      try {
        const data = await getCollegeById(collegeId);
        setCollege(data);

        if (data?.courses?.length) {
          setForm((current) => ({
            ...current,
            courseName: current.courseName || data.courses![0],
          }));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadCollege();
  }, [collegeId]);

  useEffect(() => {
    (async () => {
      setForm((current) => ({
        ...current,
        fullName:
          current.fullName ||
          profile?.name ||
          user?.displayName ||
          "",
        email: current.email || user?.email || "",
        phone: current.phone || profile?.phone || "",
      }));
    })();
  }, [user, profile]);

  const updateField = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const validateStep = () => {
    setError("");

    if (step === 1 && !form.courseName) {
      setError("Please select a course.");
      return false;
    }

    if (step === 2) {
      if (!form.fullName.trim()) {
        setError("Please enter your full name.");
        return false;
      }

      if (!form.email.trim()) {
        setError("Please enter your email.");
        return false;
      }

      if (!form.phone.trim()) {
        setError("Please enter your phone number.");
        return false;
      }

      if (!form.dateOfBirth) {
        setError("Please enter your date of birth.");
        return false;
      }

      if (!form.gender) {
        setError("Please select your gender.");
        return false;
      }

      if (!form.address.trim()) {
        setError("Please enter your address.");
        return false;
      }

      if (!form.city.trim()) {
        setError("Please enter your city.");
        return false;
      }

      if (!form.state.trim()) {
        setError("Please enter your state.");
        return false;
      }

      if (!form.pincode.trim()) {
        setError("Please enter your pincode.");
        return false;
      }
    }

    if (step === 3) {
      if (!form.schoolName.trim()) {
        setError("Please enter your school or college name.");
        return false;
      }

      if (!form.board.trim()) {
        setError("Please enter your board.");
        return false;
      }

      if (!form.passingYear.trim()) {
        setError("Please enter your passing year.");
        return false;
      }

      if (!form.percentage.trim()) {
        setError("Please enter your percentage or CGPA.");
        return false;
      }
    }

    return true;
  };

  const nextStep = () => {
    if (!validateStep()) return;

    setStep((current) =>
      Math.min(current + 1, 4) as Step
    );
  };

  const previousStep = () => {
    setError("");

    setStep((current) =>
      Math.max(current - 1, 1) as Step
    );
  };

  const submitApplication = async () => {
    if (!college || !collegeId || !user) return;

    setError("");

    try {
      setSubmitting(true);

      const result = await createApplication({
        userId: user.uid,

        collegeId: college.id,
        collegeName: college.name,

        courseName: form.courseName,

        status: "submitted",

        personalDetails: {
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          dateOfBirth: form.dateOfBirth,
          gender: form.gender,
          address: form.address.trim(),
          city: form.city.trim(),
          state: form.state.trim(),
          pincode: form.pincode.trim(),
        },

        academicDetails: {
          schoolName: form.schoolName.trim(),
          board: form.board.trim(),
          passingYear: form.passingYear.trim(),
          percentage: form.percentage.trim(),
          entranceExam: form.entranceExam.trim(),
          entranceScore: form.entranceScore.trim(),
        },
      });

      setApplicationId(result.id);

      setStep(4);
    } catch (error) {
      console.error(error);

      setError(
        "We couldn't submit your application. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center px-5">
          <div className="max-w-md text-center">
            <GraduationCap className="mx-auto h-14 w-14 text-gray-400" />

            <h1 className="mt-5 text-3xl font-bold">
              Login required
            </h1>

            <p className="mt-3 text-gray-500">
              Please login to your student account before applying
              to a college.
            </p>

            <Link
              to="/login"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 font-semibold text-white"
            >
              Login
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="mx-auto max-w-5xl px-5 py-20">
          <div className="h-[600px] animate-pulse rounded-3xl bg-gray-200" />
        </div>

        <Footer />
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <GraduationCap className="mx-auto h-14 w-14 text-gray-400" />

            <h1 className="mt-5 text-3xl font-bold">
              College not found
            </h1>

            <Link
              to="/colleges"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 font-semibold text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Colleges
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (step === 4 && applicationId) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="flex min-h-[75vh] items-center justify-center px-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-xl sm:p-12"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <h1 className="mt-7 text-3xl font-bold">
              Application Submitted
            </h1>

            <p className="mt-4 leading-7 text-gray-600">
              Your application to{" "}
              <strong>{college.name}</strong> has been submitted
              successfully.
            </p>

            <div className="mt-6 rounded-2xl bg-gray-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Application ID
              </p>

              <p className="mt-2 break-all font-mono text-lg font-bold">
                {applicationId}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to={`/applications/${applicationId}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3.5 font-semibold text-white"
              >
                Track Application
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-6 py-3.5 font-semibold"
              >
                Dashboard
              </Link>
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    );
  }

  const steps = [
    {
      number: 1,
      title: "Course",
      icon: BookOpen,
    },
    {
      number: 2,
      title: "Personal",
      icon: User,
    },
    {
      number: 3,
      title: "Academic",
      icon: School,
    },
    {
      number: 4,
      title: "Review",
      icon: FileText,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main>
        {/* Header */}
        <section className="bg-black text-white">
          <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
            <Link
              to={`/colleges/${college.id}`}
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to College
            </Link>

            <div className="mt-7">
              <p className="text-sm font-medium text-gray-400">
                Applying to
              </p>

              <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                {college.name}
              </h1>
            </div>
          </div>
        </section>

        {/* Progress */}
        <section className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-5xl px-5 py-7">
            <div className="flex items-center justify-between">
              {steps.map((item, index) => {
                const Icon = item.icon;

                const active = step >= item.number;
                const current = step === item.number;

                return (
                  <div
                    key={item.number}
                    className="flex flex-1 items-center"
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold transition ${
                          active
                            ? "border-black bg-black text-white"
                            : "border-gray-200 bg-white text-gray-400"
                        }`}
                      >
                        {active && step > item.number ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <Icon className="h-4 w-4" />
                        )}
                      </div>

                      <span
                        className={`mt-2 hidden text-xs font-semibold sm:block ${
                          current
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>

                    {index < steps.length - 1 && (
                      <div
                        className={`mx-3 h-px flex-1 ${
                          step > item.number
                            ? "bg-black"
                            : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-10">
            {error && (
              <div className="mb-7 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* STEP 1 */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-2xl font-bold">
                  Select your course
                </h2>

                <p className="mt-2 text-gray-500">
                  Choose the course you want to apply for.
                </p>

                <div className="mt-8 grid gap-4">
                  {college.courses?.map((course) => (
                    <button
                      key={course}
                      type="button"
                      onClick={() =>
                        updateField("courseName", course)
                      }
                      className={`flex items-center justify-between rounded-2xl border p-5 text-left transition ${
                        form.courseName === course
                          ? "border-black bg-black text-white"
                          : "border-gray-200 hover:border-black"
                      }`}
                    >
                      <div>
                        <p className="font-semibold">
                          {course}
                        </p>

                        <p
                          className={`mt-1 text-sm ${
                            form.courseName === course
                              ? "text-gray-400"
                              : "text-gray-500"
                          }`}
                        >
                          Undergraduate programme
                        </p>
                      </div>

                      {form.courseName === course && (
                        <CheckCircle2 className="h-6 w-6" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-2xl font-bold">
                  Personal information
                </h2>

                <p className="mt-2 text-gray-500">
                  Tell us about yourself.
                </p>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Full Name *"
                    value={form.fullName}
                    onChange={(value) =>
                      updateField("fullName", value)
                    }
                    placeholder="Enter your full name"
                  />

                  <Input
                    label="Email *"
                    type="email"
                    value={form.email}
                    onChange={(value) =>
                      updateField("email", value)
                    }
                    placeholder="you@example.com"
                  />

                  <Input
                    label="Phone *"
                    type="tel"
                    value={form.phone}
                    onChange={(value) =>
                      updateField("phone", value)
                    }
                    placeholder="+91 XXXXX XXXXX"
                  />

                  <Input
                    label="Date of Birth *"
                    type="date"
                    value={form.dateOfBirth}
                    onChange={(value) =>
                      updateField("dateOfBirth", value)
                    }
                  />

                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Gender *
                    </label>

                    <select
                      value={form.gender}
                      onChange={(e) =>
                        updateField("gender", e.target.value)
                      }
                      className="mt-2 h-13 w-full rounded-xl border border-gray-200 bg-white px-4 outline-none focus:border-black"
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <Input
                    label="City *"
                    value={form.city}
                    onChange={(value) =>
                      updateField("city", value)
                    }
                    placeholder="Your city"
                  />

                  <Input
                    label="State *"
                    value={form.state}
                    onChange={(value) =>
                      updateField("state", value)
                    }
                    placeholder="Your state"
                  />

                  <Input
                    label="Pincode *"
                    value={form.pincode}
                    onChange={(value) =>
                      updateField("pincode", value)
                    }
                    placeholder="6 digit pincode"
                  />

                  <div className="sm:col-span-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Address *
                    </label>

                    <textarea
                      value={form.address}
                      onChange={(e) =>
                        updateField("address", e.target.value)
                      }
                      rows={4}
                      placeholder="Enter your full address"
                      className="mt-2 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-2xl font-bold">
                  Academic information
                </h2>

                <p className="mt-2 text-gray-500">
                  Add your latest academic details.
                </p>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <Input
                    label="School / College Name *"
                    value={form.schoolName}
                    onChange={(value) =>
                      updateField("schoolName", value)
                    }
                    placeholder="Institution name"
                  />

                  <Input
                    label="Board / University *"
                    value={form.board}
                    onChange={(value) =>
                      updateField("board", value)
                    }
                    placeholder="CBSE / State Board / University"
                  />

                  <Input
                    label="Passing Year *"
                    value={form.passingYear}
                    onChange={(value) =>
                      updateField("passingYear", value)
                    }
                    placeholder="2026"
                  />

                  <Input
                    label="Percentage / CGPA *"
                    value={form.percentage}
                    onChange={(value) =>
                      updateField("percentage", value)
                    }
                    placeholder="85% / 8.5 CGPA"
                  />

                  <Input
                    label="Entrance Exam"
                    value={form.entranceExam}
                    onChange={(value) =>
                      updateField("entranceExam", value)
                    }
                    placeholder="JEE / NEET / TNEA etc."
                  />

                  <Input
                    label="Entrance Score"
                    value={form.entranceScore}
                    onChange={(value) =>
                      updateField("entranceScore", value)
                    }
                    placeholder="Enter score"
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-2xl font-bold">
                  Review your application
                </h2>

                <p className="mt-2 text-gray-500">
                  Check your information before submitting.
                </p>

                <div className="mt-8 space-y-5">
                  <ReviewSection
                    title="Course"
                    icon={<BookOpen className="h-5 w-5" />}
                  >
                    <ReviewRow
                      label="College"
                      value={college.name}
                    />

                    <ReviewRow
                      label="Course"
                      value={form.courseName}
                    />
                  </ReviewSection>

                  <ReviewSection
                    title="Personal Information"
                    icon={<User className="h-5 w-5" />}
                  >
                    <ReviewRow
                      label="Name"
                      value={form.fullName}
                    />

                    <ReviewRow
                      label="Email"
                      value={form.email}
                    />

                    <ReviewRow
                      label="Phone"
                      value={form.phone}
                    />

                    <ReviewRow
                      label="Date of Birth"
                      value={form.dateOfBirth}
                    />

                    <ReviewRow
                      label="Gender"
                      value={form.gender}
                    />

                    <ReviewRow
                      label="Address"
                      value={`${form.address}, ${form.city}, ${form.state} - ${form.pincode}`}
                    />
                  </ReviewSection>

                  <ReviewSection
                    title="Academic Information"
                    icon={<School className="h-5 w-5" />}
                  >
                    <ReviewRow
                      label="Institution"
                      value={form.schoolName}
                    />

                    <ReviewRow
                      label="Board"
                      value={form.board}
                    />

                    <ReviewRow
                      label="Passing Year"
                      value={form.passingYear}
                    />

                    <ReviewRow
                      label="Percentage / CGPA"
                      value={form.percentage}
                    />

                    {form.entranceExam && (
                      <ReviewRow
                        label="Entrance Exam"
                        value={form.entranceExam}
                      />
                    )}

                    {form.entranceScore && (
                      <ReviewRow
                        label="Entrance Score"
                        value={form.entranceScore}
                      />
                    )}
                  </ReviewSection>
                </div>

                <div className="mt-7 rounded-2xl bg-gray-50 p-5 text-sm leading-6 text-gray-600">
                  By submitting this application, you confirm that
                  the information provided is accurate and complete.
                </div>
              </motion.div>
            )}

            {/* Navigation */}
            <div className="mt-10 flex flex-col-reverse gap-3 border-t border-gray-100 pt-7 sm:flex-row sm:justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={previousStep}
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 font-semibold transition hover:border-black"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </button>
              ) : (
                <Link
                  to={`/colleges/${college.id}`}
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 font-semibold"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Cancel
                </Link>
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-black px-7 font-semibold text-white transition hover:bg-gray-800"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submitApplication}
                  disabled={submitting}
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-black px-7 font-semibold text-white transition hover:bg-gray-800 disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <Check className="h-4 w-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) => {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 h-13 w-full rounded-xl border border-gray-200 px-4 outline-none transition focus:border-black"
      />
    </div>
  );
};

const ReviewSection = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="rounded-2xl border border-gray-200 p-5">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-gray-100 p-2">
          {icon}
        </div>

        <h3 className="font-bold">{title}</h3>
      </div>

      <div className="mt-5 divide-y divide-gray-100">
        {children}
      </div>
    </div>
  );
};

const ReviewRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="grid gap-1 py-3 sm:grid-cols-[180px_1fr] sm:gap-4">
      <span className="text-sm text-gray-400">
        {label}
      </span>

      <span className="text-sm font-medium text-gray-800">
        {value || "—"}
      </span>
    </div>
  );
};

export default CollegeApplication;