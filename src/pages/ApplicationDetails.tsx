import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Building2,
  CheckCircle2,
  Clock3,
  FileText,
  GraduationCap,
  Loader2,
  MapPin,
  User,
  XCircle,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getApplicationById } from "../services/applicationService";
import { useAuth } from "../hooks/AuthContext";
import type { Application } from "../types";

const statusConfig: Record<
  Application["status"],
  { label: string; color: string; icon: React.ReactNode }
> = {
  draft: {
    label: "Draft",
    color: "bg-gray-100 text-gray-700",
    icon: <FileText className="h-4 w-4" />,
  },
  submitted: {
    label: "Submitted",
    color: "bg-blue-50 text-blue-700",
    icon: <Clock3 className="h-4 w-4" />,
  },
  reviewing: {
    label: "Under Review",
    color: "bg-amber-50 text-amber-700",
    icon: <Clock3 className="h-4 w-4" />,
  },
  accepted: {
    label: "Accepted",
    color: "bg-green-50 text-green-700",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  rejected: {
    label: "Rejected",
    color: "bg-red-50 text-red-700",
    icon: <XCircle className="h-4 w-4" />,
  },
};

const ApplicationDetails = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const { user } = useAuth();

  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!applicationId) {
        setLoading(false);
        return;
      }

      try {
        const data = await getApplicationById(applicationId);
        if (!data) {
          setError("Application not found.");
        } else if (user && data.userId !== user.uid) {
          setError("You are not authorised to view this application.");
        } else {
          setApplication(data);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load application.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [applicationId, user]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-[70vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        </div>
        <Footer />
      </>
    );
  }

  if (error || !application) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-5 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-950">
            {error || "Application not found"}
          </h1>
          <Link
            to="/dashboard/student"
            className="mt-2 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const status = statusConfig[application.status];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 px-5 py-10 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Back */}
          <Link
            to="/dashboard/student"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          {/* Header */}
          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Building2 className="h-4 w-4" />
                  <span className="font-medium">{application.collegeName}</span>
                </div>
                <h1 className="mt-2 text-2xl font-bold text-gray-950">
                  {application.courseName}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Application ID: <span className="font-mono font-medium">{application.id}</span>
                </p>
              </div>

              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ${status.color}`}
              >
                {status.icon}
                {status.label}
              </span>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* Personal Details */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
                <User className="h-5 w-5 text-indigo-600" />
                <h2 className="text-base font-bold text-gray-950">Personal Details</h2>
              </div>
              <dl className="mt-4 space-y-3">
                <DetailRow label="Full Name" value={application.personalDetails.fullName} />
                <DetailRow label="Email" value={application.personalDetails.email} />
                <DetailRow label="Phone" value={application.personalDetails.phone} />
                <DetailRow label="Date of Birth" value={application.personalDetails.dateOfBirth} />
                <DetailRow label="Gender" value={application.personalDetails.gender} />
              </dl>
            </div>

            {/* Address */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
                <MapPin className="h-5 w-5 text-indigo-600" />
                <h2 className="text-base font-bold text-gray-950">Address</h2>
              </div>
              <dl className="mt-4 space-y-3">
                <DetailRow label="Address" value={application.personalDetails.address} />
                <DetailRow label="City" value={application.personalDetails.city} />
                <DetailRow label="State" value={application.personalDetails.state} />
                <DetailRow label="Pincode" value={application.personalDetails.pincode} />
              </dl>
            </div>

            {/* Academic Details */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
                <GraduationCap className="h-5 w-5 text-indigo-600" />
                <h2 className="text-base font-bold text-gray-950">Academic Details</h2>
              </div>
              <dl className="mt-4 space-y-3">
                <DetailRow label="School" value={application.academicDetails.schoolName} />
                <DetailRow label="Board" value={application.academicDetails.board} />
                <DetailRow label="Passing Year" value={application.academicDetails.passingYear} />
                <DetailRow label="Percentage" value={`${application.academicDetails.percentage}%`} />
                {application.academicDetails.entranceExam && (
                  <DetailRow label="Entrance Exam" value={application.academicDetails.entranceExam} />
                )}
                {application.academicDetails.entranceScore && (
                  <DetailRow label="Entrance Score" value={application.academicDetails.entranceScore} />
                )}
              </dl>
            </div>

            {/* Course & Status */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
                <BookOpen className="h-5 w-5 text-indigo-600" />
                <h2 className="text-base font-bold text-gray-950">Application Info</h2>
              </div>
              <dl className="mt-4 space-y-3">
                <DetailRow label="College" value={application.collegeName} />
                <DetailRow label="Course" value={application.courseName} />
                <DetailRow label="Status" value={status.label} />
                {application.collegeRemarks && (
                  <DetailRow label="College Remarks" value={application.collegeRemarks} />
                )}
              </dl>

              {/* Status History */}
              {application.statusHistory && application.statusHistory.length > 0 && (
                <div className="mt-5 border-t border-gray-100 pt-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Status History
                  </p>
                  <div className="space-y-3">
                    {application.statusHistory.map((history, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
                        <div>
                          <p className="text-sm font-semibold capitalize text-gray-800">
                            {history.status}
                          </p>
                          {history.message && (
                            <p className="text-xs text-gray-500">{history.message}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end">
            <Link
              to="/dashboard/student"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-400"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start justify-between gap-4">
    <dt className="shrink-0 text-sm text-gray-500">{label}</dt>
    <dd className="text-right text-sm font-medium text-gray-900">{value || "—"}</dd>
  </div>
);

export default ApplicationDetails;
