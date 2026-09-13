import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Heart,
  Mail,
  MapPin,
  Search,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useAuth } from "../hooks/AuthContext";

import {
  getUserApplications,
} from "../services/applicationService";

import {
  getUserEnquiries,
} from "../services/enquiryService";


import {
  getColleges,
} from "../services/collegeService";

import {
  getSavedColleges,
  removeSavedCollege,
} from "../services/savedCollegeService";

import {
  getSavedScholarships,
  removeSavedScholarship,
} from "../services/savedScholarshipService";

import type {
  Application,
  College,
  CourseEnrollment,
  Enquiry,
  SavedCollege,
  SavedScholarship,
} from "../types";

const Dashboard = () => {
  const { user, profile } = useAuth();

  const [applications, setApplications] = useState<Application[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [enrollments] = useState<CourseEnrollment[]>([]);

  const [savedColleges, setSavedColleges] = useState<
    SavedCollege[]
  >([]);

  const [savedScholarships, setSavedScholarships] =
    useState<SavedScholarship[]>([]);

  const [recommendedColleges, setRecommendedColleges] =
    useState<College[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadDashboard = async () => {
      setLoading(true);

      try {
        const [
          applicationData,
          enquiryData,
          savedCollegeData,
          savedScholarshipData,
          collegeData,
        ] = await Promise.all([
          getUserApplications(user.uid),
          getUserEnquiries(user.uid),
          getSavedColleges(user.uid),
          getSavedScholarships(user.uid),
          getColleges(),
        ]);

        setApplications(applicationData);
        setEnquiries(enquiryData);
        setSavedColleges(savedCollegeData);
        setSavedScholarships(savedScholarshipData);

        const excludedIds = new Set([
          ...savedCollegeData.map(
            (item) => item.collegeId
          ),
          ...applicationData.map(
            (item) => item.collegeId
          ),
        ]);

        const recommendations = collegeData
          .filter(
            (college) =>
              college.verified &&
              !excludedIds.has(college.id)
          )
          .slice(0, 4);

        setRecommendedColleges(recommendations);
      } catch (error) {
        console.error(
          "Failed to load dashboard:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [user]);

  const profileCompletion = useMemo(() => {
    if (!profile) return 0;

    const fields = [
      profile.name,
      profile.email,
      profile.phone,
      profile.profileImage,
    ];

    const completed = fields.filter(
      (field) => field && field.trim() !== ""
    ).length;

    return Math.round(
      (completed / fields.length) * 100
    );
  }, [profile]);

  const activeApplications = applications.filter(
    (application) =>
      !["accepted", "rejected"].includes(
        application.status
      )
  );


  const removeCollege = async (
    savedCollege: SavedCollege
  ) => {
    if (!user) return;

    try {
      await removeSavedCollege(
        user.uid,
        savedCollege.collegeId
      );

      setSavedColleges((current) =>
        current.filter(
          (item) => item.id !== savedCollege.id
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const removeScholarship = async (
    savedScholarship: SavedScholarship
  ) => {
    if (!user) return;

    try {
      await removeSavedScholarship(
        user.uid,
        savedScholarship.scholarshipId
      );

      setSavedScholarships((current) =>
        current.filter(
          (item) => item.id !== savedScholarship.id
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />

            <p className="mt-4 text-sm text-gray-500">
              Loading your dashboard...
            </p>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                  <Sparkles className="h-4 w-4" />
                  Student Portal
                </div>

                <h1 className="text-3xl font-black tracking-tight text-gray-950 md:text-4xl">
                  Welcome back,{" "}
                  {profile?.name?.split(" ")[0] ||
                    "Student"}
                  !
                </h1>

                <p className="mt-2 max-w-2xl text-gray-600">
                  Track your college applications,
                  discover opportunities, and continue
                  your learning journey.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/colleges"
                  className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  <Search className="h-4 w-4" />
                  Find Colleges
                </Link>

                <Link
                  to="/scholarships"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                >
                  Scholarships
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          {/* Stats */}
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <DashboardStat
              icon={<Heart />}
              label="Saved Colleges"
              value={savedColleges.length}
            />

            <DashboardStat
              icon={<GraduationCap />}
              label="Applications"
              value={applications.length}
            />

            <DashboardStat
              icon={<Mail />}
              label="Enquiries"
              value={enquiries.length}
            />

            <DashboardStat
              icon={<BookOpen />}
              label="Online Courses"
              value={enrollments.length}
            />

            <DashboardStat
              icon={<UserRound />}
              label="Profile"
              value={`${profileCompletion}%`}
            />
          </section>

          {/* Profile completion */}
          {profileCompletion < 100 && (
            <section className="mt-6 rounded-3xl border border-gray-200 bg-white p-6">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-500">
                    Profile completion
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-gray-950">
                    Complete your profile
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    A complete profile makes your
                    admission journey easier.
                  </p>
                </div>

                <div className="w-full md:max-w-sm">
                  <div className="mb-2 flex justify-between text-xs font-semibold">
                    <span>{profileCompletion}% complete</span>
                    <span>
                      {100 - profileCompletion}% remaining
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-black transition-all"
                      style={{
                        width: `${profileCompletion}%`,
                      }}
                    />
                  </div>

                  <Link
                    to="/dashboard"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gray-900"
                  >
                    Update profile
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>
          )}

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
            {/* Applications */}
            <section className="rounded-3xl border border-gray-200 bg-white p-6">
              <SectionHeader
                title="Your Applications"
                subtitle="Track your admission applications"
                href="/dashboard"
                linkText="View all"
              />

              {applications.length === 0 ? (
                <EmptyState
                  icon={<GraduationCap />}
                  title="No applications yet"
                  description="Start your admission journey by finding a college."
                  actionText="Explore Colleges"
                  actionHref="/colleges"
                />
              ) : (
                <div className="mt-6 space-y-4">
                  {applications
                    .slice(0, 4)
                    .map((application) => (
                      <ApplicationItem
                        key={application.id}
                        application={application}
                      />
                    ))}
                </div>
              )}
            </section>

            {/* Quick actions */}
            <section className="rounded-3xl bg-black p-6 text-white">
              <p className="text-sm font-semibold text-gray-400">
                QUICK ACTIONS
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Continue your journey
              </h2>

              <div className="mt-6 space-y-3">
                <QuickAction
                  href="/colleges"
                  icon={<Search />}
                  title="Find a College"
                  description="Explore colleges and courses"
                  dark
                />

                <QuickAction
                  href="/scholarships"
                  icon={<GraduationCap />}
                  title="Find Scholarships"
                  description="Discover funding opportunities"
                  dark
                />

                <QuickAction
                  href="/online-courses"
                  icon={<BookOpen />}
                  title="Learn Online"
                  description="Build skills with online courses"
                  dark
                />
              </div>
            </section>
          </div>

          {/* Saved Colleges */}
          <section className="mt-8 rounded-3xl border border-gray-200 bg-white p-6">
            <SectionHeader
              title="Saved Colleges"
              subtitle="Colleges you want to explore later"
              href="/colleges"
              linkText="Explore more"
            />

            {savedColleges.length === 0 ? (
              <EmptyState
                icon={<Heart />}
                title="No saved colleges"
                description="Save colleges while exploring them to compare later."
                actionText="Explore Colleges"
                actionHref="/colleges"
              />
            ) : (
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {savedColleges
                  .slice(0, 6)
                  .map((college) => (
                    <SavedCollegeItem
                      key={college.id}
                      college={college}
                      onRemove={removeCollege}
                    />
                  ))}
              </div>
            )}
          </section>

          {/* Recommendations */}
          {recommendedColleges.length > 0 && (
            <section className="mt-8 rounded-3xl border border-gray-200 bg-white p-6">
              <SectionHeader
                title="Recommended for You"
                subtitle="Verified colleges you may want to explore"
                href="/colleges"
                linkText="View all"
              />

              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {recommendedColleges.map(
                  (college) => (
                    <RecommendedCollege
                      key={college.id}
                      college={college}
                    />
                  )
                )}
              </div>
            </section>
          )}

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {/* Enquiries */}
            <section className="rounded-3xl border border-gray-200 bg-white p-6">
              <SectionHeader
                title="Admission Enquiries"
                subtitle="Track conversations with colleges"
                href="/colleges"
                linkText="New enquiry"
              />

              {enquiries.length === 0 ? (
                <EmptyState
                  icon={<Mail />}
                  title="No enquiries"
                  description="Send an admission enquiry to a college."
                  actionText="Find Colleges"
                  actionHref="/colleges"
                />
              ) : (
                <div className="mt-6 space-y-3">
                  {enquiries
                    .slice(0, 4)
                    .map((enquiry) => (
                      <EnquiryItem
                        key={enquiry.id}
                        enquiry={enquiry}
                      />
                    ))}
                </div>
              )}
            </section>

            {/* Online courses */}
            <section className="rounded-3xl border border-gray-200 bg-white p-6">
              <SectionHeader
                title="Learning Progress"
                subtitle="Continue your enrolled courses"
                href="/online-courses"
                linkText="Browse courses"
              />

              {enrollments.length === 0 ? (
                <EmptyState
                  icon={<BookOpen />}
                  title="No enrolled courses"
                  description="Start learning with our online courses."
                  actionText="Browse Courses"
                  actionHref="/online-courses"
                />
              ) : (
                <div className="mt-6 space-y-4">
                  {enrollments
                    .slice(0, 4)
                    .map((enrollment) => (
                      <CourseProgressItem
                        key={enrollment.id}
                        enrollment={enrollment}
                      />
                    ))}
                </div>
              )}
            </section>
          </div>

          {/* Scholarships */}
          <section className="mt-8 rounded-3xl border border-gray-200 bg-white p-6">
            <SectionHeader
              title="Saved Scholarships"
              subtitle="Scholarships you've bookmarked"
              href="/scholarships"
              linkText="Find scholarships"
            />

            {savedScholarships.length === 0 ? (
              <EmptyState
                icon={<GraduationCap />}
                title="No bookmarked scholarships"
                description="Bookmark scholarships you may want to apply for."
                actionText="Explore Scholarships"
                actionHref="/scholarships"
              />
            ) : (
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {savedScholarships
                  .slice(0, 6)
                  .map((scholarship) => (
                    <SavedScholarshipItem
                      key={scholarship.id}
                      scholarship={scholarship}
                      onRemove={removeScholarship}
                    />
                  ))}
              </div>
            )}
          </section>

          {/* Empty state for active applications */}
          {activeApplications.length === 0 &&
            applications.length > 0 && (
              <section className="mt-8 rounded-3xl bg-gray-950 p-8 text-white">
                <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-400">
                      <CheckCircle2 className="h-4 w-4" />
                      APPLICATION UPDATE
                    </div>

                    <h2 className="mt-2 text-2xl font-bold">
                      Your applications have been reviewed
                    </h2>

                    <p className="mt-2 max-w-xl text-gray-400">
                      Check each application to see its
                      latest admission status.
                    </p>
                  </div>

                  <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-black"
                  >
                    View Applications
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </section>
            )}
        </div>
      </main>

      <Footer />
    </>
  );
};

const DashboardStat = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
          <span className="h-5 w-5 text-gray-700">
            {icon}
          </span>
        </div>

        <span className="text-2xl font-black text-gray-950">
          {value}
        </span>
      </div>

      <p className="mt-4 text-sm font-medium text-gray-500">
        {label}
      </p>
    </div>
  );
};

const SectionHeader = ({
  title,
  subtitle,
  href,
  linkText,
}: {
  title: string;
  subtitle: string;
  href: string;
  linkText: string;
}) => {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold text-gray-950">
          {title}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {subtitle}
        </p>
      </div>

      <Link
        to={href}
        className="hidden items-center gap-1 text-sm font-semibold text-gray-700 hover:text-black sm:flex"
      >
        {linkText}
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
};

const EmptyState = ({
  icon,
  title,
  description,
  actionText,
  actionHref,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionText: string;
  actionHref: string;
}) => {
  return (
    <div className="mt-6 rounded-2xl bg-gray-50 p-8 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
        <span className="h-5 w-5 text-gray-500">
          {icon}
        </span>
      </div>

      <h3 className="mt-4 font-bold text-gray-950">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
        {description}
      </p>

      <Link
        to={actionHref}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white"
      >
        {actionText}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
};

const ApplicationItem = ({
  application,
}: {
  application: Application;
}) => {
  const status = application.status;

  const statusText = {
    draft: "Draft",
    submitted: "Submitted",
    reviewing: "Under Review",
    accepted: "Accepted",
    rejected: "Rejected",
  }[status];

  return (
    <Link
      to={`/applications/${application.id}`}
      className="block rounded-2xl border border-gray-200 p-4 transition hover:border-gray-400 hover:bg-gray-50"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-bold text-gray-950">
            {application.collegeName}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {application.courseName}
          </p>
        </div>

        <StatusBadge status={status} />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs font-medium text-gray-400">
          Application #{application.id.slice(0, 8)}
        </span>

        <span className="flex items-center gap-1 text-xs font-semibold">
          {statusText}
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
};

const StatusBadge = ({
  status,
}: {
  status: Application["status"];
}) => {
  const text = {
    draft: "Draft",
    submitted: "Submitted",
    reviewing: "Reviewing",
    accepted: "Accepted",
    rejected: "Rejected",
  }[status];

  return (
    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
      {text}
    </span>
  );
};

const EnquiryItem = ({
  enquiry,
}: {
  enquiry: Enquiry;
}) => {
  return (
    <div className="rounded-2xl border border-gray-200 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-bold text-gray-950">
            {enquiry.collegeName}
          </h3>

          {enquiry.course && (
            <p className="mt-1 text-sm text-gray-500">
              {enquiry.course}
            </p>
          )}
        </div>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold capitalize text-gray-700">
          {enquiry.status}
        </span>
      </div>
    </div>
  );
};

const CourseProgressItem = ({
  enrollment,
}: {
  enrollment: CourseEnrollment;
}) => {
  return (
    <Link
      to={`/online-courses/${enrollment.courseId}/learn`}
      className="block rounded-2xl border border-gray-200 p-4 hover:bg-gray-50"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-gray-950">
            {enrollment.courseTitle}
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            {enrollment.status === "completed"
              ? "Completed"
              : "In progress"}
          </p>
        </div>

        <span className="text-sm font-bold text-gray-950">
          {enrollment.progress}%
        </span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-black"
          style={{
            width: `${Math.min(
              100,
              Math.max(0, enrollment.progress)
            )}%`,
          }}
        />
      </div>
    </Link>
  );
};

const SavedCollegeItem = ({
  college,
  onRemove,
}: {
  college: SavedCollege;
  onRemove: (college: SavedCollege) => void;
}) => {
  return (
    <div className="group relative rounded-2xl border border-gray-200 p-4 hover:bg-gray-50">
      <button
        type="button"
        onClick={() => onRemove(college)}
        className="absolute right-3 top-3 rounded-full p-2 text-gray-400 hover:bg-gray-200 hover:text-black"
        aria-label="Remove saved college"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100 text-lg font-bold">
          {college.collegeLogo ? (
            <img
              src={college.collegeLogo}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            college.collegeName.charAt(0)
          )}
        </div>

        <div className="min-w-0 pr-8">
          <h3 className="truncate font-bold text-gray-950">
            {college.collegeName}
          </h3>

          <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
            <MapPin className="h-3.5 w-3.5" />
            {college.location}
          </p>

          <Link
            to={`/colleges/${college.collegeId}`}
            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold"
          >
            View College
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const SavedScholarshipItem = ({
  scholarship,
  onRemove,
}: {
  scholarship: SavedScholarship;
  onRemove: (
    scholarship: SavedScholarship
  ) => void;
}) => {
  return (
    <div className="relative rounded-2xl border border-gray-200 p-5">
      <button
        type="button"
        onClick={() => onRemove(scholarship)}
        className="absolute right-3 top-3 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-black"
        aria-label="Remove scholarship bookmark"
      >
        <X className="h-4 w-4" />
      </button>

      <GraduationCap className="h-6 w-6 text-gray-700" />

      <h3 className="mt-4 pr-6 font-bold text-gray-950">
        {scholarship.scholarshipName}
      </h3>

      {scholarship.provider && (
        <p className="mt-1 text-sm text-gray-500">
          {scholarship.provider}
        </p>
      )}

      {scholarship.amount && (
        <p className="mt-3 text-sm font-semibold text-gray-900">
          {scholarship.amount}
        </p>
      )}

      <Link
        to={`/scholarships/${scholarship.scholarshipId}`}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold"
      >
        View Scholarship
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
};

const RecommendedCollege = ({
  college,
}: {
  college: College;
}) => {
  return (
    <Link
      to={`/colleges/${college.id}`}
      className="group rounded-2xl border border-gray-200 p-5 transition hover:-translate-y-1 hover:border-gray-400 hover:shadow-lg"
    >
      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gray-100 font-bold">
        {college.logo ? (
          <img
            src={college.logo}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          college.name.charAt(0)
        )}
      </div>

      <h3 className="mt-4 line-clamp-2 font-bold text-gray-950">
        {college.name}
      </h3>

      <p className="mt-2 flex items-center gap-1 text-xs text-gray-500">
        <MapPin className="h-3.5 w-3.5" />
        {college.location}
      </p>

      <div className="mt-4 flex items-center gap-1 text-xs font-semibold">
        Explore
        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

const QuickAction = ({
  href,
  icon,
  title,
  description,
  dark = false,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  dark?: boolean;
}) => {
  return (
    <Link
      to={href}
      className={`flex items-center gap-4 rounded-2xl p-4 transition ${
        dark
          ? "bg-white/10 hover:bg-white/15"
          : "bg-gray-50 hover:bg-gray-100"
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          dark ? "bg-white text-black" : "bg-gray-200"
        }`}
      >
        <span className="h-5 w-5">{icon}</span>
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-semibold">
          {title}
        </h3>

        <p
          className={`mt-0.5 text-xs ${
            dark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {description}
        </p>
      </div>

      <ArrowRight className="h-4 w-4 shrink-0" />
    </Link>
  );
};

export default Dashboard;