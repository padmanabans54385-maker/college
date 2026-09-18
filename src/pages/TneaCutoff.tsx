import { useState, type FormEvent } from "react";
import { Seo } from "../components/Seo";
import { Disclaimer } from "../components/Disclaimer";
import { EmptyState, LoadingSkeleton } from "../components/ui/States";
import { getAdmissionLikelihood, likelihoodLabel, queryCutoffs, type Likelihood } from "../services/cutoffService";
import type { CutoffRecord } from "../types";
import { Search, Compass } from "lucide-react";

const TneaCutoff = () => {
  const [rows, setRows] = useState<CutoffRecord[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [academic, setAcademic] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setLoading(true);
    try {
      const data = await queryCutoffs({
        year: String(form.get("year") || ""),
        community: String(form.get("community") || ""),
        branch: String(form.get("branch") || ""),
        district: String(form.get("district") || ""),
      });
      setRows(data);
    } finally {
      setLoading(false);
    }
  };

  const mark = Number(academic);
  const inputClass =
    "w-full rounded-2xl border border-[#cdddc9] bg-[#edf4ec]/40 px-4 py-2.5 text-sm text-[#142e23] outline-none transition focus:border-[#143527] focus:bg-white focus:ring-2 focus:ring-[#143527]/20";

  return (
    <main className="bg-[#edf4ec] py-12">
      <Seo title="TNEA Cutoff Explorer" description="Explore historical TNEA cut-offs by community, branch and district." path="/tnea/cutoff" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#143527]">
          <Compass className="h-3.5 w-3.5 text-[#143527]" />
          Cutoff Analytics
        </div>

        <h1 className="mt-4 font-heading text-4xl font-extrabold text-[#142e23] sm:text-5xl">
          TNEA cutoff <span className="font-serif-italic font-normal italic text-[#143527]">explorer</span>
        </h1>
        <p className="mt-2 text-base text-[#577063]">
          Historical cutoff records for engineering colleges across Tamil Nadu communities and branches.
        </p>

        <div className="mt-6">
          <Disclaimer kind="prediction" />
        </div>

        <form onSubmit={onSubmit} className="mt-8 grid gap-3 rounded-3xl border border-[#cdddc9] bg-white p-6 shadow-md sm:grid-cols-3">
          <input name="year" placeholder="Year (e.g. 2025)" className={inputClass} />
          <input name="community" placeholder="Community (OC / BC / BCM / MBC / SC / ST)" className={inputClass} />
          <input
            name="academic"
            placeholder="Your academic cutoff mark"
            value={academic}
            onChange={(event) => setAcademic(event.target.value)}
            className={inputClass}
          />
          <input name="branch" placeholder="Branch (CSE / ECE / Mech...)" className={inputClass} />
          <input name="district" placeholder="District (Chennai / Coimb...)" className={inputClass} />
          <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#143527] px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-[#0b2017]">
            <Search size={16} /> Search Cutoffs
          </button>
        </form>

        {loading && <LoadingSkeleton label="Searching cutoff records" />}
        {rows && rows.length === 0 && (
          <div className="mt-8">
            <EmptyState
              title="No cutoff data found"
              description="Historical cutoff records will appear when added in the admin portal."
            />
          </div>
        )}
        {rows && rows.length > 0 && (
          <div className="mt-8 overflow-x-auto rounded-3xl border border-[#cdddc9] bg-white shadow-md">
            <table className="min-w-[800px] w-full text-sm">
              <thead>
                <tr className="border-b border-[#cdddc9] bg-[#dce8da] text-left font-heading font-bold text-[#142e23]">
                  {["College", "Branch", "Previous cutoff", "Category", "Location", "Admission likelihood"].map((h) => (
                    <th key={h} className="p-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#cdddc9]/60 text-[#142e23]">
                {rows.map((row) => {
                  const likelihood: Likelihood | null = Number.isFinite(mark) && mark > 0
                    ? getAdmissionLikelihood(mark, row.cutoff)
                    : null;
                  return (
                    <tr key={row.id} className="transition hover:bg-[#e6f0e4]/40">
                      <td className="p-4 font-semibold text-[#143527]">{row.collegeName || row.collegeId}</td>
                      <td className="p-4 font-medium">{row.branch}</td>
                      <td className="p-4 font-bold text-[#143527]">{row.cutoff}</td>
                      <td className="p-4">{row.community}</td>
                      <td className="p-4">{row.district || "—"}</td>
                      <td className="p-4">
                        {likelihood ? (
                          <span className="inline-flex items-center gap-1.5 font-semibold">
                            {likelihood === "higher" ? "🟢" : likelihood === "moderate" ? "🟡" : "🔴"}{" "}
                            {likelihoodLabel(likelihood)}
                          </span>
                        ) : (
                          <span className="text-xs text-[#577063]">Enter your cutoff above</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
};

export default TneaCutoff;
