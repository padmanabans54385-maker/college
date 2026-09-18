import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { Disclaimer } from "../components/Disclaimer";
import { EmptyState } from "../components/ui/States";
import { getColleges } from "../services/collegeService";
import { displayValue } from "../utils/display";
import type { College } from "../types";
import { Banknote } from "lucide-react";

const Fees = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  useEffect(() => {
    getColleges().then(setColleges).catch(() => setColleges([]));
  }, []);

  return (
    <main className="bg-[#edf4ec] py-12">
      <Seo title="Engineering College Fees in Tamil Nadu" description="Compare tuition, hostel and estimated yearly costs where data is available." path="/fees" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#143527]">
          <Banknote className="h-3.5 w-3.5 text-[#143527]" />
          Fee Transparency
        </div>

        <h1 className="mt-4 font-heading text-4xl font-extrabold text-[#142e23] sm:text-5xl">
          Fee <span className="font-serif-italic font-normal italic text-[#143527]">information</span>
        </h1>
        <p className="mt-2 text-base text-[#577063]">
          Compare tuition, hostel, and estimated annual expenses for Tamil Nadu engineering colleges.
        </p>

        <div className="mt-6">
          <Disclaimer kind="fees" />
        </div>

        {colleges.length === 0 ? (
          <div className="mt-8">
            <EmptyState title="No fee records found" description="Fee structure data will display when added to college profiles." />
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-3xl border border-[#cdddc9] bg-white shadow-md">
            <table className="min-w-[900px] w-full text-sm">
              <thead>
                <tr className="border-b border-[#cdddc9] bg-[#dce8da] text-left font-heading font-bold text-[#142e23]">
                  {["College", "Tuition", "Hostel", "Transport", "Other", "Estimated yearly", "Scholarships"].map((h) => (
                    <th key={h} className="p-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#cdddc9]/60 text-[#142e23]">
                {colleges.map((college) => (
                  <tr key={college.id} className="transition hover:bg-[#e6f0e4]/40">
                    <td className="p-4 font-semibold text-[#143527]">
                      <Link className="hover:underline" to={`/colleges/${college.id}`}>{college.name}</Link>
                    </td>
                    <td className="p-4">{displayValue(college.fees?.tuition || college.feeRange)}</td>
                    <td className="p-4">{displayValue(college.fees?.hostel)}</td>
                    <td className="p-4">{displayValue(college.fees?.transport)}</td>
                    <td className="p-4">{displayValue(college.fees?.other)}</td>
                    <td className="p-4 font-bold text-[#143527]">{displayValue(college.fees?.estimatedAnnual)}</td>
                    <td className="p-4">{displayValue(college.scholarshipAvailable)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
};

export default Fees;
