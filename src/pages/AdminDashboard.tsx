import { useEffect, useState } from "react";
import {
  Building2,
  CheckCircle2,
  FileText,
  GraduationCap,
  LogOut,
  Mail,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { logoutUser } from "../firebase/auth";
import { getCollection } from "../firebase/firestore";

const AdminDashboard = () => {
  const [students, setStudents] = useState(0);
  const [colleges, setColleges] = useState(0);
  const [applications, setApplications] = useState(0);
  const [enquiries, setEnquiries] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [
          usersData,
          collegesData,
          applicationsData,
          enquiriesData,
        ] = await Promise.all([
          getCollection("users"),
          getCollection("colleges"),
          getCollection("applications"),
          getCollection("enquiries"),
        ]);

        setStudents(
          usersData.filter(
            (item) => item.role === "student"
          ).length
        );

        setColleges(collegesData.length);
        setApplications(applicationsData.length);
        setEnquiries(enquiriesData.length);
      } catch (error) {
        console.error(
          "Failed to load admin statistics:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main>
        <section className="bg-gradient-to-r from-indigo-900 to-violet-900 text-white">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-indigo-200">
                  <GraduationCap className="h-4 w-4" />
                  Admin Portal
                </div>

                <h1 className="text-4xl font-black">
                  Platform Overview
                </h1>

                <p className="mt-3 text-indigo-200">
                  Manage the CollegeCrop admission platform.
                </p>
              </div>

              <button
                onClick={() => logoutUser()}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 font-semibold transition hover:bg-white/20"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <AdminStat
              icon={<Users className="h-5 w-5" />}
              label="Students"
              value={students}
              loading={loading}
            />

            <AdminStat
              icon={<Building2 className="h-5 w-5" />}
              label="Colleges"
              value={colleges}
              loading={loading}
            />

            <AdminStat
              icon={<FileText className="h-5 w-5" />}
              label="Applications"
              value={applications}
              loading={loading}
            />

            <AdminStat
              icon={<Mail className="h-5 w-5" />}
              label="Enquiries"
              value={enquiries}
              loading={loading}
            />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AdminMenu
              icon={<Building2 className="h-6 w-6" />}
              title="Manage Colleges"
              description="Add, edit and verify college profiles."
              link="/admin/colleges"
            />

            <AdminMenu
              icon={<Users className="h-6 w-6" />}
              title="Manage Students"
              description="View registered student accounts."
              link="/admin/students"
            />

            <AdminMenu
              icon={<FileText className="h-6 w-6" />}
              title="Applications"
              description="Monitor platform-wide applications."
              link="/admin/applications"
            />

            <AdminMenu
              icon={<Mail className="h-6 w-6" />}
              title="Enquiries"
              description="Review admission enquiries."
              link="/admin/enquiries"
            />

            <AdminMenu
              icon={<GraduationCap className="h-6 w-6" />}
              title="Courses"
              description="Manage course categories and courses."
              link="/admin/courses"
            />

            <AdminMenu
              icon={<CheckCircle2 className="h-6 w-6" />}
              title="Scholarships"
              description="Manage scholarships and financial aid."
              link="/admin/scholarships"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const AdminStat = ({
  icon,
  label,
  value,
  loading,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  loading: boolean;
}) => (
  <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
    <div
      className="w-fit rounded-xl p-3 text-indigo-600"
      style={{ background: "linear-gradient(135deg, #ede9fe, #e0e7ff)" }}
    >
      {icon}
    </div>

    <p className="mt-6 text-3xl font-black">
      {loading ? "—" : value}
    </p>

    <p className="mt-1 text-sm text-gray-500">
      {label}
    </p>
  </div>
);

const AdminMenu = ({
  icon,
  title,
  description,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
}) => (
  <Link
    to={link ?? "/admin"}
    className="block rounded-3xl border border-gray-200 bg-white p-7 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50"
  >
    <div
      className="w-fit rounded-xl p-3 text-indigo-600"
      style={{ background: "linear-gradient(135deg, #ede9fe, #e0e7ff)" }}
    >
      {icon}
    </div>

    <h2 className="mt-5 text-xl font-bold">
      {title}
    </h2>

    <p className="mt-2 text-sm leading-6 text-gray-500">
      {description}
    </p>
  </Link>
);

export default AdminDashboard;