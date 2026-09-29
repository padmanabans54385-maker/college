import { useMemo, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  X,
  Scale,
} from "lucide-react";
import { getCollegeById } from "../services/collegeService";
import { Seo } from "../components/Seo";
import { LoadingSkeleton } from "../components/ui/States";
import type { College } from "../types";

const CollegeCompare = () => {
  const [searchParams] = useSearchParams();

  const ids = useMemo(
    () =>
      searchParams
        .get("ids")
        ?.split(",")
        .filter(Boolean) ?? [],
    [searchParams]
  );

  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const results = await Promise.all(
          ids.slice(0, 4).map((id) => getCollegeById(id))
        );
        setColleges(results.filter((college): college is College => college !== null));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (ids.length > 0) {
      load();
    } else {
      (async () => setLoading(false))();
    }
  }, [ids]);

  if (loading) return <LoadingSkeleton label="Loading college comparison" />;

  return (
    <main className="min-h-screen bg-[#F5F9FC] py-10">
      <Seo title="Compare Engineering Colleges" description="Compare up to four Tamil Nadu engineering colleges side by side." path="/compare" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/colleges"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#075B63] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Colleges
        </Link>

        <div className="mt-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E2ECF3] bg-[#F0F8FD] px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#075B63]">
            <Scale className="h-3.5 w-3.5" />
            Side-by-Side Comparison
          </div>
          <h1 className="mt-3 font-heading text-3xl font-extrabold text-[#075B63] sm:text-4xl">
            Compare <span className="font-serif-italic font-normal italic text-[#075B63]">colleges</span>
          </h1>
          <p className="mt-2 text-sm text-[#5A6E78]">
            Compare up to 4 engineering colleges side-by-side on fees, cutoffs, placements, and facilities.
          </p>
        </div>

        {colleges.length < 2 ? (
          <div className="mt-8 rounded-3xl border border-[#E2ECF3] bg-white p-12 text-center shadow-md">
            <h2 className="font-heading text-xl font-bold text-[#075B63]">
              Select at least two colleges
            </h2>
            <p className="mt-2 text-sm text-[#5A6E78]">
              Return to the college directory and select colleges to compare.
            </p>
            <Link
              to="/colleges"
              className="mt-6 inline-flex rounded-full bg-[#075B63] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#05434A]"
            >
              Explore Colleges Directory
            </Link>
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-3xl border border-[#E2ECF3] bg-white shadow-md">
            <table className="w-full min-w-[800px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="w-48 border-b border-r border-[#E2ECF3] bg-[#E8F4FA] p-5 text-left font-heading font-bold text-[#075B63]">
                    Comparison Feature
                  </th>
                  {colleges.map((college) => (
                    <th key={college.id} className="border-b border-[#E2ECF3] bg-[#E8F4FA] p-5 text-left align-top">
                      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white text-2xl font-black text-[#075B63] border border-[#E2ECF3]">
                        {college.logo ? (
                          <img src={college.logo} alt="" className="h-full w-full object-cover" />
                        ) : (
                          college.name.charAt(0)
                        )}
                      </div>
                      <h2 className="mt-3 font-heading text-base font-bold text-[#075B63]">{college.name}</h2>
                      {college.verified && (
                        <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-[#F0F8FD] px-2.5 py-0.5 text-xs font-bold text-[#075B63]">
                          <ShieldCheck className="h-3.5 w-3.5" /> Verified
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E2ECF3]/60">
                <CompareRow
                  label="Location"
                  colleges={colleges}
                  render={(college) => (
                    <div className="flex items-start gap-1.5 text-[#075B63]">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#075B63]" />
                      {college.location}
                    </div>
                  )}
                />
                <CompareRow label="District" colleges={colleges} render={(c) => c.district || "—"} />
                <CompareRow label="State" colleges={colleges} render={(c) => c.state || "—"} />
                <CompareRow
                  label="Verification"
                  colleges={colleges}
                  render={(c) =>
                    c.verified ? (
                      <span className="inline-flex items-center gap-1 font-bold text-[#075B63]">
                        <CheckCircle2 className="h-4 w-4" /> Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[#5A6E78]">
                        <X className="h-4 w-4" /> Unverified
                      </span>
                    )
                  }
                />
                <CompareRow
                  label="Courses Offered"
                  colleges={colleges}
                  render={(c) => (
                    <div className="flex flex-wrap gap-1.5">
                      {(c.courses ?? []).length > 0 ? (
                        (c.courses ?? []).map((course) => (
                          <span key={course} className="rounded-full border border-[#E2ECF3] bg-[#F0F8FD]/60 px-2.5 py-1 text-xs font-medium text-[#075B63]">
                            {course}
                          </span>
                        ))
                      ) : (
                        <span className="text-[#5A6E78]">Information unavailable</span>
                      )}
                    </div>
                  )}
                />
                <CompareRow label="University" colleges={colleges} render={(c) => c.university || "—"} />
                <CompareRow label="College Type" colleges={colleges} render={(c) => c.collegeType || "—"} />
                <CompareRow label="TNEA Code" colleges={colleges} render={(c) => c.tneaCode || "—"} />
                <CompareRow label="Tuition Fees" colleges={colleges} render={(c) => c.fees?.tuition || c.feeRange || "—"} />
                <CompareRow label="Hostel Fees" colleges={colleges} render={(c) => c.fees?.hostel || c.hostel?.fees || "—"} />
                <CompareRow label="Placement Average" colleges={colleges} render={(c) => c.placements?.averagePackage || c.placements?.rate || "—"} />
                <CompareRow label="Accreditation" colleges={colleges} render={(c) => c.accreditation || c.naacGrade || "—"} />
                <CompareRow
                  label="Actions"
                  colleges={colleges}
                  render={(c) => (
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/colleges/${c.id}`}
                        className="rounded-full bg-[#075B63] px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-[#05434A]"
                      >
                        View Details
                      </Link>
                      <Link
                        to={`/colleges/${c.id}/apply`}
                        className="rounded-full border border-[#E2ECF3] bg-[#F5F9FC] px-4 py-2 text-xs font-semibold text-[#075B63] transition hover:bg-[#E8F4FA]"
                      >
                        Apply
                      </Link>
                    </div>
                  )}
                />
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
};

const CompareRow = ({
  label,
  colleges,
  render,
}: {
  label: string;
  colleges: College[];
  render: (college: College) => React.ReactNode;
}) => (
  <tr className="transition hover:bg-[#F0F8FD]/30">
    <td className="border-r border-[#E2ECF3] bg-[#F5F9FC]/60 p-4 font-heading font-bold text-[#075B63]">
      {label}
    </td>
    {colleges.map((college) => (
      <td key={college.id} className="p-4 text-sm text-[#5A6E78]">
        {render(college)}
      </td>
    ))}
  </tr>
);

export default CollegeCompare;