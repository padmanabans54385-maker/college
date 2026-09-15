import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { Disclaimer } from "../components/Disclaimer";
import { EmptyState } from "../components/ui/States";
import { getCutoffs } from "../services/cutoffService";
import { getColleges } from "../services/collegeService";
import { buildChoiceBuckets } from "../services/predictorService";
import { trackEvent } from "../services/analytics";
import type { ChoiceListItem } from "../types";

const PredictionBucket = ({ title, items }: { title: string; items: ChoiceListItem[] }) => (
  <section className="surface-card card-interactive shimmer-card p-5">
    <h2 className="font-heading text-lg font-bold text-slate-900">{title}</h2>
    {items.length === 0 && <p className="mt-2 text-sm text-slate-500">No matches in this band yet.</p>}
    <ul className="mt-3 space-y-3">
      {items.slice(0, 8).map((item, index) => (
        <li key={`${item.collegeName}-${item.branch}-${index}`} className="border-b border-slate-100 pb-3 text-sm last:border-0 last:pb-0">
          <p className="font-semibold text-slate-800">{item.collegeName} · {item.branch}</p>
          <p className="mt-1 text-slate-500">{item.reason}</p>
        </li>
      ))}
    </ul>
  </section>
);

const TneaPredictor = () => {
  const [result, setResult] = useState<{
    dream: ChoiceListItem[];
    target: ChoiceListItem[];
    safe: ChoiceListItem[];
  } | null>(null);
  const [empty, setEmpty] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const cutoff = Number(form.get("cutoff"));
    const [cutoffs, colleges] = await Promise.all([getCutoffs(), getColleges()]);
    trackEvent("predictor_used");
    if (cutoffs.length === 0) {
      setEmpty(true);
      setResult(null);
      return;
    }
    setEmpty(false);
    setResult(
      buildChoiceBuckets(cutoffs, colleges, cutoff, {
        branches: String(form.get("branch") || "").split(",").map((s) => s.trim()).filter(Boolean),
        cities: String(form.get("location") || "").split(",").map((s) => s.trim()).filter(Boolean),
        collegeType: String(form.get("collegeType") || ""),
        hostelRequired: form.get("hostel") === "yes",
        budget: String(form.get("budget") || ""),
      })
    );
  };

  /* Legacy inline result card kept below for reference while the reusable card is used.
  const Bucket = ({ title, items }: { title: string; items: ChoiceListItem[] }) => (
    <section className="rounded-3xl border bg-white p-5">
      <h2 className="font-heading text-lg font-bold">{title}</h2>
      {items.length === 0 && <p className="mt-2 text-sm text-slate-500">No matches in this band yet.</p>}
      <ul className="mt-3 space-y-3">
        {items.slice(0, 8).map((item, index) => (
          <li key={`${item.collegeName}-${item.branch}-${index}`} className="text-sm">
            <p className="font-semibold">{item.collegeName} · {item.branch}</p>
            <p className="text-slate-500">{item.reason}</p>
          </li>
        ))}
      </ul>
    </section>
  ); */

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <Seo title="TNEA 2026 College Predictor" description="Estimate dream, target and safe colleges from historical TNEA cut-offs." path="/tnea/predictor" />
      <h1 className="font-heading text-4xl font-extrabold">TNEA college predictor</h1>
      <Disclaimer kind="prediction" />
      <form onSubmit={onSubmit} className="mt-8 grid gap-3 rounded-3xl border bg-white p-5 sm:grid-cols-2">
        <input required name="cutoff" placeholder="Academic marks / cutoff" className="rounded-xl border px-3 py-2.5 text-sm" />
        <input name="community" placeholder="Community" className="rounded-xl border px-3 py-2.5 text-sm" />
        <input name="branch" placeholder="Preferred branch" className="rounded-xl border px-3 py-2.5 text-sm" />
        <input name="location" placeholder="Preferred location" className="rounded-xl border px-3 py-2.5 text-sm" />
        <input name="collegeType" placeholder="College type (Government/Private)" className="rounded-xl border px-3 py-2.5 text-sm" />
        <input name="budget" placeholder="Budget" className="rounded-xl border px-3 py-2.5 text-sm" />
        <select name="hostel" className="rounded-xl border px-3 py-2.5 text-sm">
          <option value="no">Hostel not required</option>
          <option value="yes">Hostel required</option>
        </select>
        <button className="rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white">Predict</button>
      </form>
      {empty && (
        <div className="mt-8">
          <EmptyState title="No cutoff data" description="Add historical cut-off records in admin to generate predictions." />
        </div>
      )}
      {result && (
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <PredictionBucket title="Dream colleges" items={result.dream} />
          <PredictionBucket title="Target colleges" items={result.target} />
          <PredictionBucket title="Safe options" items={result.safe} />
        </div>
      )}
      <Link to="/tnea/choice-list" className="mt-8 inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">
        Create my choice list
      </Link>
    </main>
  );
};

export default TneaPredictor;
