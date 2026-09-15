import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { Disclaimer } from "../components/Disclaimer";
import { EmptyState } from "../components/ui/States";
import { getColleges } from "../services/collegeService";
import { displayValue } from "../utils/display";
import type { College } from "../types";

const Placements = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  useEffect(() => {
    getColleges().then(setColleges).catch(() => setColleges([]));
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <Seo title="College Placement Information" description="Placement figures based on available published information." path="/placements" />
      <h1 className="font-heading text-4xl font-extrabold">Placement information</h1>
      <Disclaimer kind="placement" />
      {colleges.length === 0 ? (
        <div className="mt-8"><EmptyState title="No placement records" description="Placement data appears only when provided in college profiles." /></div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-3xl border bg-white">
          <table className="min-w-[900px] w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                {["College", "Rate", "Average", "Highest", "Median", "Year", "Source"].map((h) => (
                  <th key={h} className="p-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {colleges.map((college) => (
                <tr key={college.id} className="border-b">
                  <td className="p-3"><Link className="font-semibold" to={`/colleges/${college.id}`}>{college.name}</Link></td>
                  <td className="p-3">{displayValue(college.placements?.rate)}</td>
                  <td className="p-3">{displayValue(college.placements?.averagePackage)}</td>
                  <td className="p-3">{displayValue(college.placements?.highestPackage)}</td>
                  <td className="p-3">{displayValue(college.placements?.medianPackage)}</td>
                  <td className="p-3">{displayValue(college.placements?.year)}</td>
                  <td className="p-3">{displayValue(college.placements?.source)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default Placements;
