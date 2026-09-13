import { type FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  GraduationCap,
  Loader2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getCollegeById } from "../services/collegeService";
import { createEnquiry } from "../services/enquiryService";
import { useAuth } from "../hooks/AuthContext";
import type { College } from "../types";

const CollegeEnquiry = () => {
  const { collegeId } = useParams<{ collegeId: string }>();
  const { user } = useAuth();

  const [college, setCollege] = useState<College | null>(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: user?.displayName ?? "",
    email: user?.email ?? "",
    phone: "",
    course: "",
    message: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const loadCollege = async () => {
      if (!collegeId) {
        setLoading(false);
        return;
      }

      try {
        const data = await getCollegeById(collegeId);

        setCollege(data);
      } catch (err) {
        console.error(err);
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
        name: current.name || user?.displayName || "",
        email: current.email || user?.email || "",
      }));
    })();
  }, [user]);

  const handleChange = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!collegeId || !college) return;

    setError("");

    if (!form.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!form.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!form.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    try {
      setSubmitting(true);

      await createEnquiry({
        userId: user?.uid,
        collegeId: college.id,
        collegeName: college.name,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        course: form.course.trim(),
        message: form.message.trim(),
      });

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(
        "Something went wrong while sending your enquiry. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

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

        <main className="flex min-h-[70vh] items-center justify-center px-5">
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

  if (success) {
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
              <CheckCircle2 className="h-10 w-10 text-black" />
            </div>

            <h1 className="mt-7 text-3xl font-bold tracking-tight">
              Enquiry Sent Successfully
            </h1>

            <p className="mt-4 leading-7 text-gray-600">
              Your admission enquiry has been submitted to{" "}
              <strong>{college.name}</strong>.
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Our admission team can now review your enquiry and
              contact you.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              {user && (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3.5 font-semibold text-white"
                >
                  View Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}

              <Link
                to={`/colleges/${college.id}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-3.5 font-semibold"
              >
                Back to College
              </Link>
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main>
        {/* Header */}
        <section className="bg-black text-white">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
            <Link
              to={`/colleges/${college.id}`}
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to College
            </Link>

            <div className="mt-8 max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                <GraduationCap className="h-4 w-4" />
                Admission Enquiry
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Start your journey with {college.name}
              </h1>

              <p className="mt-5 text-lg leading-8 text-gray-400">
                Fill in your details and submit an enquiry to get
                more information about admissions and courses.
              </p>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9"
            >
              <h2 className="text-2xl font-bold">
                Your Information
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Please provide accurate details so the college can
                contact you.
              </p>

              {error && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Full Name *
                    </label>

                    <input
                      value={form.name}
                      onChange={(e) =>
                        handleChange("name", e.target.value)
                      }
                      placeholder="Enter your full name"
                      className="mt-2 h-13 w-full rounded-xl border border-gray-200 px-4 outline-none transition focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Phone Number *
                    </label>

                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        handleChange("phone", e.target.value)
                      }
                      placeholder="+91 XXXXX XXXXX"
                      className="mt-2 h-13 w-full rounded-xl border border-gray-200 px-4 outline-none transition focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Email Address *
                  </label>

                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      handleChange("email", e.target.value)
                    }
                    placeholder="you@example.com"
                    className="mt-2 h-13 w-full rounded-xl border border-gray-200 px-4 outline-none transition focus:border-black"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Interested Course
                  </label>

                  <select
                    value={form.course}
                    onChange={(e) =>
                      handleChange("course", e.target.value)
                    }
                    className="mt-2 h-13 w-full rounded-xl border border-gray-200 bg-white px-4 outline-none focus:border-black"
                  >
                    <option value="">
                      Select a course
                    </option>

                    {college.courses?.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Message
                  </label>

                  <textarea
                    value={form.message}
                    onChange={(e) =>
                      handleChange("message", e.target.value)
                    }
                    placeholder="Tell us what information you need..."
                    rows={5}
                    className="mt-2 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-black"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-black font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending Enquiry...
                    </>
                  ) : (
                    <>
                      Send Admission Enquiry
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* College card */}
            <aside>
              <div className="sticky top-28 overflow-hidden rounded-3xl border border-gray-200 bg-white">
                <div className="flex h-48 items-center justify-center bg-gray-100">
                  {college.logo ? (
                    <img
                      src={college.logo}
                      alt={college.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <GraduationCap className="h-20 w-20 text-gray-400" />
                  )}
                </div>

                <div className="p-7">
                  {college.verified && (
                    <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold">
                      <BadgeCheck className="h-4 w-4" />
                      Verified College
                    </div>
                  )}

                  <h2 className="text-2xl font-bold">
                    {college.name}
                  </h2>

                  <div className="mt-4 flex gap-3 text-sm text-gray-600">
                    <MapPin className="h-5 w-5 shrink-0 text-gray-400" />

                    <span>
                      {college.location}, {college.district},{" "}
                      {college.state}
                    </span>
                  </div>

                  {college.phone && (
                    <div className="mt-4 flex gap-3 text-sm text-gray-600">
                      <Phone className="h-5 w-5 shrink-0 text-gray-400" />
                      {college.phone}
                    </div>
                  )}

                  {college.email && (
                    <div className="mt-4 flex gap-3 text-sm text-gray-600">
                      <Mail className="h-5 w-5 shrink-0 text-gray-400" />
                      <span className="break-all">
                        {college.email}
                      </span>
                    </div>
                  )}

                  <div className="mt-7 border-t border-gray-200 pt-6">
                    <p className="text-sm font-semibold">
                      Why enquire?
                    </p>

                    <ul className="mt-4 space-y-3 text-sm text-gray-600">
                      <li>✓ Get admission information</li>
                      <li>✓ Learn about available courses</li>
                      <li>✓ Understand eligibility requirements</li>
                      <li>✓ Connect with the admission team</li>
                    </ul>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CollegeEnquiry;