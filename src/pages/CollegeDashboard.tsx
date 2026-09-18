import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  FileText,
  GraduationCap,
  LogOut,
  Mail,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/AuthContext";
import { logoutUser } from "../firebase/auth";
import { getCollegeById } from "../services/collegeService";
import { getCollegeEnquiries } from "../services/enquiryService";
import { getCollegeApplications } from "../services/applicationService";
import type { Application, College, Enquiry } from "../types";

const CollegeDashboard = () => {
  const { profile } = useAuth();

  const [college, setCollege] = useState<College | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      if (!profile?.collegeId) {
        setLoading(false);
        return;
      }

      try {
        const [
          collegeData,
          applicationData,
          enquiryData,
        ] = await Promise.all([
          getCollegeById(profile.collegeId),
          getCollegeApplications(profile.collegeId),
          getCollegeEnquiries(profile.collegeId),
        ]);

        setCollege(collegeData);
        setApplications(applicationData);
        setEnquiries(enquiryData);
      } catch (error) {
        console.error(
          "Failed to load college dashboard:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [profile?.collegeId]);

  const handleLogout = async () => {
    await logoutUser();
  };

  if (!profile?.collegeId) {
    return (
      <div className="min-h-screen bg-[#edf4ec] font-sans text-[#142e23]">
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center px-5">
          <div className="max-w-md text-center">
            <Building2 className="mx-auto h-14 w-14 text-[#577063]" />

            <h1 className="mt-5 font-heading text-3xl font-bold text-[#143527]">
              College account not configured
            </h1>

            <p className="mt-3 text-sm text-[#577063]">
              This college account has not been connected to a
              college profile yet.
            </p>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-6 rounded-full bg-[#143527] px-8 py-3 font-semibold text-white hover:bg-[#0b2017] transition"
            >
              Logout
            </button>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#edf4ec] font-sans text-[#142e23]">
        <Navbar />

        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="h-80 animate-pulse rounded-3xl bg-[#cdddc9]/40" />
        </div>
      </div>
    );
  }

  const submitted = applications.filter(
    (item) => item.status === "submitted"
  ).length;

  const reviewing = applications.filter(
    (item) => item.status === "reviewing"
  ).length;

  const accepted = applications.filter(
    (item) => item.status === "accepted"
  ).length;

  return (
    <div className="min-h-screen bg-[#edf4ec] font-sans text-[#142e23]">
      <Navbar />

      <main>
        <section className="border-b border-[#cdddc9] bg-[#dce8da] py-12">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-4 py-1.5 text-xs font-semibold text-[#143527]">
                  <Building2 className="h-4 w-4 text-[#143527]" />
                  College Portal
                </div>

                <h1 className="font-heading text-3xl font-extrabold tracking-tight text-[#143527] sm:text-4xl">
                  {college?.name || profile.name}
                </h1>

                <p className="mt-2 text-[#577063]">
                  Manage admissions, enquiries and applications.
                </p>
              </div>

              <div className="flex gap-3">
                <Link
                  to={`/colleges/${profile.collegeId}`}
                  className="inline-flex items-center gap-2 rounded-full bg-[#143527] px-6 py-3 font-semibold text-white transition hover:bg-[#0b2017]"
                >
                  View Profile
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-full border border-[#143527] bg-transparent px-5 py-3 font-semibold text-[#143527] transition hover:bg-[#143527] hover:text-white"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
          {/* Stats */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={<Users className="h-5 w-5" />}
              label="Applications"
              value={applications.length}
            />

            <StatCard
              icon={<Clock3 className="h-5 w-5" />}
              label="Pending Review"
              value={submitted}
            />

            <StatCard
              icon={<FileText className="h-5 w-5" />}
              label="Under Review"
              value={reviewing}
            />

            <StatCard
              icon={<CheckCircle2 className="h-5 w-5" />}
              label="Accepted"
              value={accepted}
            />
          </div>

          {/* Applications */}
          <div className="mt-10 rounded-3xl border border-[#cdddc9] bg-white p-7 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading text-2xl font-bold text-[#143527]">
                  Recent Applications
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Review applications submitted to your college.
                </p>
              </div>

              <span className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-semibold">
                {applications.length}
              </span>
            </div>

            {applications.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <GraduationCap className="mx-auto h-10 w-10 text-gray-400" />

                <h3 className="mt-4 font-bold">
                  No applications yet
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Student applications will appear here.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {applications.slice(0, 10).map((application) => (
                  <div
                    key={application.id}
                    className="p-6 transition hover:bg-gray-50"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <h3 className="font-bold">
                          {application.personalDetails.fullName}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {application.courseName}
                        </p>

                        <p className="mt-2 text-xs text-gray-400">
                          {application.personalDetails.email}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <StatusBadge
                          status={application.status}
                        />

                        <Link
                          to={`/college/applications/${application.id}`}
                          className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white"
                        >
                          Review
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Enquiries */}
          <div className="mt-8 rounded-3xl border border-[#cdddc9] bg-white p-7 shadow-xs">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-[#143527]">
                Admission Enquiries
              </h2>

              <p className="mt-1 text-sm text-[#577063]">
                Students who have shown interest in your college.
              </p>
            </div>

            {enquiries.length === 0 ? (
              <div className="px-6 py-14 text-center">
                <Mail className="mx-auto h-10 w-10 text-gray-400" />

                <h3 className="mt-4 font-bold">
                  No enquiries yet
                </h3>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {enquiries.slice(0, 10).map((enquiry) => (
                  <div
                    key={enquiry.id}
                    className="p-6"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-bold">
                          {enquiry.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {enquiry.course ||
                            "General Admission Enquiry"}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {enquiry.email} · {enquiry.phone}
                        </p>
                      </div>

                      <StatusBadge
                        status={
                          enquiry.status === "new"
                            ? "submitted"
                            : enquiry.status === "contacted"
                            ? "reviewing"
                            : "closed"
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-gray-200 bg-white p-6"
    >
      <div className="rounded-xl bg-gray-100 p-3 w-fit">
        {icon}
      </div>

      <p className="mt-6 text-3xl font-bold">
        {value}
      </p>

      <p className="mt-1 text-sm text-gray-500">
        {label}
      </p>
    </motion.div>
  );
};

const StatusBadge = ({
  status,
}: {
  status: string;
}) => {
  const label =
    status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold">
      {label}
    </span>
  );
};

export default CollegeDashboard;