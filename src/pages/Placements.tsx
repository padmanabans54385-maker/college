import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { Disclaimer } from "../components/Disclaimer";
import { EmptyState } from "../components/ui/States";
import { getColleges } from "../services/collegeService";
import { displayValue } from "../utils/display";
import type { College } from "../types";
import { TrendingUp } from "lucide-react";

const Placements = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  useEffect(() => {
    getColleges().then(setColleges).catch(() => setColleges([]));
  }, []);

  return (
    <main className="bg-[#edf4ec] py-12">
      <Seo title="College Placement Information" description="Placement figures based on available published information." path="/placements" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#143527]">
          <TrendingUp className="h-3.5 w-3.5 text-[#143527]" />
          Career & Placements
        </div>

        <h1 className="mt-4 font-heading text-4xl font-extrabold text-[#142e23] sm:text-5xl">
          Placement <span className="font-serif-italic font-normal italic text-[#143527]">information</span>
        </h1>
        <p className="mt-2 text-base text-[#577063]">
          Placement records, average packages, and top recruiter insights for Tamil Nadu engineering colleges.
        </p>

        <div className="mt-6">
          <Disclaimer kind="placement" />
        </div>

        {colleges.length === 0 ? (
          <div className="mt-8">
            <EmptyState title="No placement records" description="Placement data appears only when provided in college profiles." />
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-3xl border border-[#cdddc9] bg-white shadow-md">
            <table className="min-w-[900px] w-full text-sm">
              <thead>
                <tr className="border-b border-[#cdddc9] bg-[#dce8da] text-left font-heading font-bold text-[#142e23]">
                  {["College", "Rate", "Average", "Highest", "Median", "Year", "Source"].map((h) => (
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
                    <td className="p-4">{displayValue(college.placements?.rate)}</td>
                    <td className="p-4 font-bold text-[#143527]">{displayValue(college.placements?.averagePackage)}</td>
                    <td className="p-4">{displayValue(college.placements?.highestPackage)}</td>
                    <td className="p-4">{displayValue(college.placements?.medianPackage)}</td>
                    <td className="p-4">{displayValue(college.placements?.year)}</td>
                    <td className="p-4">{displayValue(college.placements?.source)}</td>
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

export default Placements;
