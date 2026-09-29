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
import { Calculator, Sparkles, ArrowRight } from "lucide-react";

const PredictionBucket = ({ title, items }: { title: string; items: ChoiceListItem[] }) => (
  <section className="surface-card card-interactive rounded-3xl border border-[#E2ECF3] bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between border-b border-[#E2ECF3] pb-3">
      <h2 className="font-heading text-lg font-bold text-[#075B63]">{title}</h2>
      <span className="rounded-full bg-[#F0F8FD] px-2.5 py-0.5 text-xs font-bold text-[#075B63]">
        {items.length} options
      </span>
    </div>
    {items.length === 0 && <p className="mt-3 text-sm text-[#5A6E78]">No matches in this cutoff band.</p>}
    <ul className="mt-4 space-y-3">
      {items.slice(0, 8).map((item, index) => (
        <li key={`${item.collegeName}-${item.branch}-${index}`} className="border-b border-[#E2ECF3]/60 pb-3 text-sm last:border-0 last:pb-0">
          <p className="font-heading font-bold text-[#075B63]">{item.collegeName} · {item.branch}</p>
          <p className="mt-1 text-xs text-[#5A6E78] leading-relaxed">{item.reason}</p>
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

  const inputClass =
    "w-full rounded-2xl border border-[#E2ECF3] bg-[#F5F9FC]/40 px-4 py-2.5 text-sm text-[#075B63] outline-none transition focus:border-[#075B63] focus:bg-white focus:ring-2 focus:ring-[#075B63]/20";

  return (
    <main className="bg-[#F5F9FC] py-12">
      <Seo title="TNEA 2026 College Predictor" description="Estimate dream, target and safe colleges from historical TNEA cut-offs." path="/tnea/predictor" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E2ECF3] bg-[#F0F8FD] px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#075B63]">
          <Calculator className="h-3.5 w-3.5 text-[#075B63]" />
          Smart Seat Predictor
        </div>

        <h1 className="mt-4 font-heading text-4xl font-extrabold text-[#075B63] sm:text-5xl">
          TNEA college <span className="font-serif-italic font-normal italic text-[#075B63]">predictor</span>
        </h1>
        <p className="mt-2 text-base text-[#5A6E78]">
          Predict dream, target, and safe engineering colleges based on your academic cutoff score.
        </p>

        <div className="mt-6">
          <Disclaimer kind="prediction" />
        </div>

        <form onSubmit={onSubmit} className="mt-8 grid gap-4 rounded-3xl border border-[#E2ECF3] bg-white p-6 sm:p-8 shadow-md sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-[#075B63]">Academic Cutoff (Out of 200)</label>
            <input required name="cutoff" placeholder="e.g. 185.5" className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-[#075B63]">Community</label>
            <input name="community" placeholder="e.g. BC / MBC / OC" className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-[#075B63]">Preferred Branch</label>
            <input name="branch" placeholder="e.g. CSE, ECE" className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-[#075B63]">Preferred District</label>
            <input name="location" placeholder="e.g. Chennai, Coimbatore" className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-[#075B63]">College Type</label>
            <input name="collegeType" placeholder="Government / Private" className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-[#075B63]">Hostel Requirement</label>
            <select name="hostel" className={inputClass}>
              <option value="no">Hostel not required</option>
              <option value="yes">Hostel required</option>
            </select>
          </div>

          <div className="sm:col-span-2 mt-2">
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#075B63] py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#05434A]">
              <Sparkles size={16} /> Predict My Colleges
            </button>
          </div>
        </form>

        {empty && (
          <div className="mt-8">
            <EmptyState title="No cutoff data" description="Add historical cutoff records in admin to generate predictions." />
          </div>
        )}

        {result && (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <PredictionBucket title="Dream Colleges" items={result.dream} />
            <PredictionBucket title="Target Colleges" items={result.target} />
            <PredictionBucket title="Safe Options" items={result.safe} />
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Link
            to="/tnea/choice-list"
            className="inline-flex items-center gap-2 rounded-full bg-[#075B63] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#05434A]"
          >
            <span>Create my TNEA choice list</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default TneaPredictor;
