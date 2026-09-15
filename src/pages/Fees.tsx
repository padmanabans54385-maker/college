import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { Disclaimer } from "../components/Disclaimer";
import { EmptyState } from "../components/ui/States";
import { getColleges } from "../services/collegeService";
import { displayValue } from "../utils/display";
import type { College } from "../types";

const Fees = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  useEffect(() => {
    getColleges().then(setColleges).catch(() => setColleges([]));
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <Seo title="Engineering College Fees in Tamil Nadu" description="Compare tuition, hostel and estimated yearly costs where data is available." path="/fees" />
      <h1 className="font-heading text-4xl font-extrabold">Fee information</h1>
      <Disclaimer kind="fees" />
      {colleges.length === 0 ? (
        <div className="mt-8"><EmptyState title="No fee records" description="Fee fields will display when added to college profiles." /></div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-3xl border bg-white">
          <table className="min-w-[900px] w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                {["College", "Tuition", "Hostel", "Transport", "Other", "Estimated yearly", "Scholarships"].map((h) => (
                  <th key={h} className="p-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {colleges.map((college) => (
                <tr key={college.id} className="border-b">
                  <td className="p-3"><Link className="font-semibold" to={`/colleges/${college.id}`}>{college.name}</Link></td>
                  <td className="p-3">{displayValue(college.fees?.tuition || college.feeRange)}</td>
                  <td className="p-3">{displayValue(college.fees?.hostel)}</td>
                  <td className="p-3">{displayValue(college.fees?.transport)}</td>
                  <td className="p-3">{displayValue(college.fees?.other)}</td>
                  <td className="p-3">{displayValue(college.fees?.estimatedAnnual)}</td>
                  <td className="p-3">{displayValue(college.scholarshipAvailable)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default Fees;
