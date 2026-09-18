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
    <div className="min-h-screen bg-[#edf4ec] font-sans text-[#142e23]">
      <Navbar />

      <main>
        <section className="border-b border-[#cdddc9] bg-[#dce8da] py-12">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-4 py-1.5 text-xs font-semibold text-[#143527]">
                  <GraduationCap className="h-4 w-4 text-[#143527]" />
                  Admin Portal
                </div>

                <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-[#143527]">
                  Platform Overview
                </h1>

                <p className="mt-2 text-[#577063]">
                  Manage the Go2College admission platform.
                </p>
              </div>

              <button
                type="button"
                onClick={() => logoutUser()}
                className="inline-flex items-center gap-2 rounded-full border border-[#143527] bg-transparent px-5 py-2.5 text-sm font-semibold text-[#143527] transition hover:bg-[#143527] hover:text-white"
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
            <AdminMenu icon={<Building2 className="h-6 w-6" />} title="Cutoffs" description="Historical TNEA cut-off records." link="/admin/cutoffs" />
            <AdminMenu icon={<FileText className="h-6 w-6" />} title="Updates" description="Admission news and TNEA alerts." link="/admin/admissions" />
            <AdminMenu icon={<FileText className="h-6 w-6" />} title="Blog" description="Publish education articles." link="/admin/blog" />
            <AdminMenu icon={<Mail className="h-6 w-6" />} title="Leads" description="WhatsApp, forms and counselling leads." link="/admin/leads" />
            <AdminMenu icon={<Users className="h-6 w-6" />} title="Counselling" description="Manage counselling requests." link="/admin/counselling" />
            <AdminMenu icon={<CheckCircle2 className="h-6 w-6" />} title="Settings" description="WhatsApp number and contact details." link="/admin/settings" />
            <AdminMenu icon={<FileText className="h-6 w-6" />} title="FAQs" description="Public frequently asked questions." link="/admin/faqs" />
            <AdminMenu icon={<Users className="h-6 w-6" />} title="Testimonials" description="Approve genuine student stories." link="/admin/testimonials" />
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
  <div className="rounded-3xl border border-[#cdddc9] bg-white p-6 shadow-xs">
    <div className="w-fit rounded-2xl bg-[#e6f0e4] p-3 text-[#143527]">
      {icon}
    </div>

    <p className="mt-6 font-heading text-3xl font-extrabold text-[#143527]">
      {loading ? "—" : value}
    </p>

    <p className="mt-1 text-sm font-medium text-[#577063]">
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
    className="block rounded-3xl border border-[#cdddc9] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#143527] hover:shadow-lg hover:shadow-[#143527]/5"
  >
    <div className="w-fit rounded-2xl bg-[#e6f0e4] p-3 text-[#143527]">
      {icon}
    </div>

    <h2 className="mt-5 font-heading text-xl font-bold text-[#143527]">
      {title}
    </h2>

    <p className="mt-2 text-sm leading-6 text-[#577063]">
      {description}
    </p>
  </Link>
);

export default AdminDashboard;