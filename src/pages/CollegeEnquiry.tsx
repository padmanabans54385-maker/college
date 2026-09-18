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
import { Seo } from "../components/Seo";
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
    setForm((current) => ({
      ...current,
      name: current.name || user?.displayName || "",
      email: current.email || user?.email || "",
    }));
  }, [user]);

  const handleChange = (field: keyof typeof form, value: string) => {
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
      setError("Something went wrong while sending your enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "mt-2 h-13 w-full rounded-2xl border border-[#cdddc9] bg-[#edf4ec]/40 px-4 text-sm text-[#142e23] outline-none transition focus:border-[#143527] focus:bg-white focus:ring-2 focus:ring-[#143527]/20";

  if (loading) {
    return (
      <div className="min-h-screen bg-[#edf4ec]">
        <Navbar />
        <div className="mx-auto max-w-5xl px-5 py-20">
          <div className="h-[600px] animate-pulse rounded-3xl bg-[#dce8da]" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen bg-[#edf4ec]">
        <Navbar />
        <main className="flex min-h-[70vh] items-center justify-center px-5">
          <div className="text-center">
            <GraduationCap className="mx-auto h-14 w-14 text-[#577063]" />
            <h1 className="mt-5 font-heading text-3xl font-bold text-[#142e23]">College not found</h1>
            <Link
              to="/colleges"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#143527] px-6 py-3 font-semibold text-white shadow-md hover:bg-[#0b2017]"
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
      <div className="min-h-screen bg-[#edf4ec]">
        <Navbar />
        <main className="flex min-h-[75vh] items-center justify-center px-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl rounded-3xl border border-[#cdddc9] bg-white p-8 text-center shadow-xl sm:p-12"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e6f0e4] text-[#143527]">
              <CheckCircle2 className="h-10 w-10 text-[#143527]" />
            </div>

            <h1 className="mt-7 font-heading text-3xl font-extrabold tracking-tight text-[#142e23]">
              Enquiry Sent Successfully
            </h1>

            <p className="mt-4 text-base leading-relaxed text-[#577063]">
              Your admission enquiry has been submitted to <strong>{college.name}</strong>.
            </p>

            <p className="mt-2 text-sm text-[#577063]">
              Our counselling team and the college admission office will contact you shortly.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              {user && (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#143527] px-6 py-3.5 font-semibold text-white shadow-md hover:bg-[#0b2017]"
                >
                  View Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}

              <Link
                to={`/colleges/${college.id}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#cdddc9] bg-[#edf4ec] px-6 py-3.5 font-semibold text-[#142e23] hover:bg-[#dce8da]"
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
    <div className="min-h-screen bg-[#edf4ec]">
      <Seo title={`Admission Enquiry - ${college.name}`} description={`Submit an admission enquiry for ${college.name}.`} path={`/colleges/${college.id}/enquiry`} />
      <Navbar />

      <main>
        {/* Header */}
        <section className="border-b border-[#cdddc9]/60 bg-[#dce8da] py-12 text-[#142e23]">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <Link
              to={`/colleges/${college.id}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#143527] hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to College Profile
            </Link>

            <div className="mt-6 max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#143527]">
                <GraduationCap className="h-4 w-4" />
                Admission Enquiry
              </div>

              <h1 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl text-[#142e23]">
                Start your journey with <br className="hidden sm:inline" />
                <span className="font-serif-italic font-normal italic text-[#143527]">{college.name}</span>
              </h1>

              <p className="mt-4 text-base leading-relaxed text-[#465f51]">
                Fill in your details below to submit an enquiry for courses, fees, cutoff marks, and direct admission guidance.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-[#cdddc9] bg-white p-7 shadow-md sm:p-9"
            >
              <h2 className="font-heading text-2xl font-bold text-[#142e23]">
                Your Applicant Information
              </h2>

              <p className="mt-2 text-sm text-[#577063]">
                Please provide accurate details so counsellors can get back to you with the correct course guidance.
              </p>

              {error && (
                <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#142e23]">
                      Full Name *
                    </label>
                    <input
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#142e23]">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#142e23]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#142e23]">
                    Interested Course / Branch
                  </label>
                  <select
                    value={form.course}
                    onChange={(e) => handleChange("course", e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select a course</option>
                    {college.courses?.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#142e23]">
                    Message / Special Requirements
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Ask about cutoff requirements, hostel, or fee structures..."
                    rows={5}
                    className="mt-2 w-full resize-none rounded-2xl border border-[#cdddc9] bg-[#edf4ec]/40 px-4 py-3 text-sm text-[#142e23] outline-none transition focus:border-[#143527] focus:bg-white focus:ring-2 focus:ring-[#143527]/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#143527] font-semibold text-white shadow-md transition hover:bg-[#0b2017] disabled:cursor-not-allowed disabled:opacity-60"
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

            {/* College info card */}
            <aside>
              <div className="sticky top-28 overflow-hidden rounded-3xl border border-[#cdddc9] bg-white shadow-md">
                <div className="flex h-48 items-center justify-center bg-[#dce8da]">
                  {college.logo ? (
                    <img
                      src={college.logo}
                      alt={college.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <GraduationCap className="h-20 w-20 text-[#143527]/40" />
                  )}
                </div>

                <div className="p-7">
                  {college.verified && (
                    <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-3 py-1.5 text-xs font-bold text-[#143527]">
                      <BadgeCheck className="h-4 w-4" />
                      Verified Institution
                    </div>
                  )}

                  <h2 className="font-heading text-2xl font-bold text-[#142e23]">
                    {college.name}
                  </h2>

                  <div className="mt-4 flex gap-3 text-sm text-[#577063]">
                    <MapPin className="h-5 w-5 shrink-0 text-[#143527]" />
                    <span>
                      {college.location}, {college.district},{" "}
                      {college.state}
                    </span>
                  </div>

                  {college.phone && (
                    <div className="mt-4 flex gap-3 text-sm text-[#577063]">
                      <Phone className="h-5 w-5 shrink-0 text-[#143527]" />
                      {college.phone}
                    </div>
                  )}

                  {college.email && (
                    <div className="mt-4 flex gap-3 text-sm text-[#577063]">
                      <Mail className="h-5 w-5 shrink-0 text-[#143527]" />
                      <span className="break-all">{college.email}</span>
                    </div>
                  )}

                  <div className="mt-7 border-t border-[#cdddc9]/60 pt-6">
                    <p className="text-sm font-bold text-[#142e23]">
                      Why enquire through CollegeCrop?
                    </p>

                    <ul className="mt-3 space-y-2 text-sm text-[#465f51]">
                      <li className="flex items-center gap-2">✓ Verified admission information</li>
                      <li className="flex items-center gap-2">✓ Updated course fee breakdowns</li>
                      <li className="flex items-center gap-2">✓ Historical cutoff insights</li>
                      <li className="flex items-center gap-2">✓ Direct support from counsellors</li>
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