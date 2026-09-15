import { useState, type FormEvent } from "react";
import { Seo } from "../components/Seo";
import { Disclaimer } from "../components/Disclaimer";
import { EmptyState, LoadingSkeleton } from "../components/ui/States";
import { getAdmissionLikelihood, likelihoodLabel, queryCutoffs, type Likelihood } from "../services/cutoffService";
import type { CutoffRecord } from "../types";

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

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <Seo title="TNEA Cutoff Explorer" description="Explore historical TNEA cut-offs by community, branch and district." path="/tnea/cutoff" />
      <h1 className="font-heading text-4xl font-extrabold">TNEA cutoff explorer</h1>
      <p className="mt-2 text-slate-600">Recommended colleges are based on historical cut-off data, not a guarantee of admission.</p>
      <Disclaimer kind="prediction" />
      <form onSubmit={onSubmit} className="mt-8 grid gap-3 rounded-3xl border bg-white p-5 sm:grid-cols-3">
        <input name="year" placeholder="Year (e.g. 2025)" className="rounded-xl border px-3 py-2.5 text-sm" />
        <input name="community" placeholder="Community" className="rounded-xl border px-3 py-2.5 text-sm" />
        <input
          name="academic"
          placeholder="Your academic cutoff"
          value={academic}
          onChange={(event) => setAcademic(event.target.value)}
          className="rounded-xl border px-3 py-2.5 text-sm"
        />
        <input name="branch" placeholder="Branch" className="rounded-xl border px-3 py-2.5 text-sm" />
        <input name="district" placeholder="District" className="rounded-xl border px-3 py-2.5 text-sm" />
        <button className="rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white">Search</button>
      </form>
      {loading && <LoadingSkeleton />}
      {rows && rows.length === 0 && (
        <div className="mt-8">
          <EmptyState
            title="No cutoff data yet"
            description="Historical cut-off records will appear when added in the admin CMS. Nothing is invented here."
          />
        </div>
      )}
      {rows && rows.length > 0 && (
        <div className="mt-8 overflow-x-auto rounded-3xl border bg-white">
          <table className="min-w-[800px] w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                {["College", "Branch", "Previous cutoff", "Category", "Location", "Admission likelihood"].map((h) => (
                  <th key={h} className="p-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const likelihood: Likelihood | null = Number.isFinite(mark)
                  ? getAdmissionLikelihood(mark, row.cutoff)
                  : null;
                return (
                  <tr key={row.id} className="border-b">
                    <td className="p-3">{row.collegeName || row.collegeId}</td>
                    <td className="p-3">{row.branch}</td>
                    <td className="p-3">{row.cutoff}</td>
                    <td className="p-3">{row.community}</td>
                    <td className="p-3">{row.district || "—"}</td>
                    <td className="p-3">
                      {likelihood ? (
                        <span>
                          {likelihood === "higher" ? "🟢" : likelihood === "moderate" ? "🟡" : "🔴"}{" "}
                          {likelihoodLabel(likelihood)}
                        </span>
                      ) : (
                        "Enter your cutoff"
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default TneaCutoff;
