import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  GraduationCap,
  Loader2,
  User,
  XCircle,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/AuthContext";
import { getApplicationById } from "../services/applicationService";
import { updateApplicationStatus } from "../services/applicationService";
import type { Application } from "../types";

const CollegeApplicationReview = () => {
  const { applicationId } = useParams<{
    applicationId: string;
  }>();

  const { profile } = useAuth();

  const [application, setApplication] =
    useState<Application | null>(null);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const loadApplication = async () => {
      if (!applicationId) {
        setLoading(false);
        return;
      }

      try {
        const data = await getApplicationById(applicationId);

        if (
          data &&
          profile?.collegeId === data.collegeId
        ) {
          setApplication(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadApplication();
  }, [applicationId, profile?.collegeId]);

  const changeStatus = async (
    status: Application["status"]
  ) => {
    if (!application) return;

    try {
      setUpdating(true);

      await updateApplicationStatus(
        application.id,
        status
      );

      setApplication({
        ...application,
        status,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="mx-auto max-w-5xl px-5 py-20">
          <div className="h-[500px] animate-pulse rounded-3xl bg-gray-200" />
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-[#edf4ec] font-sans text-[#142e23]">
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center px-5">
          <div className="text-center">
            <FileText className="mx-auto h-14 w-14 text-[#577063]" />

            <h1 className="mt-5 font-heading text-3xl font-bold text-[#143527]">
              Application not found
            </h1>

            <Link
              to="/college"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#143527] px-6 py-3 font-semibold text-white hover:bg-[#0b2017] transition"
            >
              <ArrowLeft className="h-4 w-4" />
              College Dashboard
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#edf4ec] font-sans text-[#142e23]">
      <Navbar />

      <main>
        <section className="border-b border-[#cdddc9] bg-[#dce8da] py-10">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <Link
              to="/college"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#577063] hover:text-[#143527]"
            >
              <ArrowLeft className="h-4 w-4" />
              College Dashboard
            </Link>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#577063]">
                Application Review
              </p>

              <h1 className="mt-1 font-heading text-3xl font-extrabold tracking-tight text-[#143527] sm:text-4xl">
                {application.personalDetails.fullName}
              </h1>

              <p className="mt-1 text-sm font-medium text-[#577063]">
                {application.courseName}
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8">
          {/* Status actions */}
          <div className="rounded-3xl border border-gray-200 bg-white p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  Application status
                </p>

                <p className="mt-1 text-2xl font-bold capitalize">
                  {application.status}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  disabled={updating}
                  onClick={() =>
                    changeStatus("reviewing")
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold hover:border-black disabled:opacity-50"
                >
                  <Loader2
                    className={`h-4 w-4 ${
                      updating ? "animate-spin" : "hidden"
                    }`}
                  />
                  Mark Reviewing
                </button>

                <button
                  disabled={updating}
                  onClick={() =>
                    changeStatus("accepted")
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Accept
                </button>

                <button
                  disabled={updating}
                  onClick={() =>
                    changeStatus("rejected")
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 disabled:opacity-50"
                >
                  <XCircle className="h-4 w-4" />
                  Reject
                </button>
              </div>
            </div>
          </div>

          <div className="mt-7 grid gap-7 lg:grid-cols-2">
            {/* Personal */}
            <InfoSection
              title="Personal Information"
              icon={<User className="h-5 w-5" />}
            >
              <InfoRow
                label="Full Name"
                value={
                  application.personalDetails.fullName
                }
              />

              <InfoRow
                label="Email"
                value={application.personalDetails.email}
              />

              <InfoRow
                label="Phone"
                value={application.personalDetails.phone}
              />

              <InfoRow
                label="Date of Birth"
                value={
                  application.personalDetails.dateOfBirth
                }
              />

              <InfoRow
                label="Gender"
                value={
                  application.personalDetails.gender
                }
              />

              <InfoRow
                label="Address"
                value={`${application.personalDetails.address}, ${application.personalDetails.city}, ${application.personalDetails.state} - ${application.personalDetails.pincode}`}
              />
            </InfoSection>

            {/* Academic */}
            <InfoSection
              title="Academic Information"
              icon={<GraduationCap className="h-5 w-5" />}
            >
              <InfoRow
                label="Institution"
                value={
                  application.academicDetails.schoolName
                }
              />

              <InfoRow
                label="Board"
                value={
                  application.academicDetails.board
                }
              />

              <InfoRow
                label="Passing Year"
                value={
                  application.academicDetails.passingYear
                }
              />

              <InfoRow
                label="Percentage / CGPA"
                value={
                  application.academicDetails.percentage
                }
              />

              <InfoRow
                label="Entrance Exam"
                value={
                  application.academicDetails.entranceExam ||
                  "Not provided"
                }
              />

              <InfoRow
                label="Entrance Score"
                value={
                  application.academicDetails.entranceScore ||
                  "Not provided"
                }
              />
            </InfoSection>
          </div>

          {/* Course */}
          <div className="mt-7 rounded-3xl border border-gray-200 bg-white p-7">
            <h2 className="text-xl font-bold">
              Applied Course
            </h2>

            <div className="mt-5 rounded-2xl bg-gray-50 p-5">
              <p className="text-sm text-gray-400">
                Course
              </p>

              <p className="mt-1 font-bold">
                {application.courseName}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const InfoSection = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-7">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-gray-100 p-3">
          {icon}
        </div>

        <h2 className="text-xl font-bold">
          {title}
        </h2>
      </div>

      <div className="mt-6 divide-y divide-gray-100">
        {children}
      </div>
    </section>
  );
};

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="py-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-gray-800">
        {value}
      </p>
    </div>
  );
};

export default CollegeApplicationReview;