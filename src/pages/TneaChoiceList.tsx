import { useState, type FormEvent } from "react";
import { Seo } from "../components/Seo";
import { Disclaimer } from "../components/Disclaimer";
import { EmptyState } from "../components/ui/States";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { getCutoffs } from "../services/cutoffService";
import { getColleges } from "../services/collegeService";
import { buildChoiceBuckets } from "../services/predictorService";
import { saveChoiceList } from "../services/choiceListService";
import { createLead } from "../services/leadService";
import { trackEvent } from "../services/analytics";
import { useAuth } from "../hooks/AuthContext";
import type { ChoiceListItem } from "../types";
import { ListOrdered, Save, Printer, Share2, Sparkles } from "lucide-react";

const TneaChoiceList = () => {
  const { user } = useAuth();
  const [lists, setLists] = useState<{ dream: ChoiceListItem[]; target: ChoiceListItem[]; safe: ChoiceListItem[] } | null>(null);
  const [formSnap, setFormSnap] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = Object.fromEntries(form.entries()) as Record<string, string>;
    setFormSnap(values);
    const cutoff = Number(values.cutoff);
    const [cutoffs, colleges] = await Promise.all([getCutoffs(), getColleges()]);
    if (cutoffs.length === 0) {
      setLists({ dream: [], target: [], safe: [] });
      return;
    }
    setLists(
      buildChoiceBuckets(cutoffs, colleges, cutoff, {
        branches: values.branches?.split(",").map((s) => s.trim()),
        cities: values.cities?.split(",").map((s) => s.trim()),
        collegeType: values.collegeType,
        hostelRequired: values.hostel === "yes",
      })
    );
  };

  const onSave = async () => {
    if (!user || !lists) {
      setMessage("Sign in to save your choice list to your profile.");
      return;
    }
    await saveChoiceList({
      userId: user.uid,
      studentName: formSnap.studentName,
      tneaRank: formSnap.rank,
      community: formSnap.community,
      cutoff: formSnap.cutoff,
      preferredBranches: formSnap.branches?.split(","),
      preferredCities: formSnap.cities?.split(","),
      budget: formSnap.budget,
      hostelRequired: formSnap.hostel === "yes",
      collegeTypePreference: formSnap.collegeType,
      placementPreference: formSnap.placement,
      dream: lists.dream,
      target: lists.target,
      safe: lists.safe,
    });
    await createLead({
      name: formSnap.studentName,
      phone: formSnap.phone || "n/a",
      email: user.email || undefined,
      source: "choice-list",
      interest: "Choice list",
      cutoff: formSnap.cutoff,
      rank: formSnap.rank,
    });
    trackEvent("choice_list_created");
    setMessage("✓ Choice list saved to your dashboard!");
  };

  const printList = () => window.print();

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) await navigator.share({ title: "My TNEA choice list", url });
    else await navigator.clipboard.writeText(url);
  };

  const renderBucket = (title: string, items: ChoiceListItem[]) => (
    <section className="rounded-3xl border border-[#cdddc9] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-[#cdddc9] pb-3">
        <h2 className="font-heading text-lg font-bold text-[#142e23]">{title}</h2>
        <span className="rounded-full bg-[#e6f0e4] px-2.5 py-0.5 text-xs font-bold text-[#143527]">
          {items.length} choices
        </span>
      </div>
      <ul className="mt-4 space-y-4">
        {items.map((item, index) => (
          <li key={`${title}-${index}`} className="border-b border-[#cdddc9]/60 pb-3 text-sm last:border-0 last:pb-0">
            <p className="font-heading font-bold text-[#143527]">{item.collegeName} — {item.branch}</p>
            <p className="text-xs text-[#577063] mt-0.5">{item.location}</p>
            <p className="mt-1 text-xs">Historical cutoff: <span className="font-bold text-[#142e23]">{item.historicalCutoff ?? "N/A"}</span></p>
            <p className="text-xs text-[#465f51] mt-1">{item.reason}</p>
          </li>
        ))}
      </ul>
    </section>
  );

  const inputClass =
    "w-full rounded-2xl border border-[#cdddc9] bg-[#edf4ec]/40 px-4 py-2.5 text-sm text-[#142e23] outline-none transition focus:border-[#143527] focus:bg-white focus:ring-2 focus:ring-[#143527]/20";

  return (
    <main className="bg-[#edf4ec] py-12">
      <Seo title="Personalized TNEA Choice List" description="Generate a dream, target and safe college choice list from historical data." path="/tnea/choice-list" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#143527]">
          <ListOrdered className="h-3.5 w-3.5 text-[#143527]" />
          Smart Choice Builder
        </div>

        <h1 className="mt-4 font-heading text-4xl font-extrabold text-[#142e23] sm:text-5xl">
          Personalized <span className="font-serif-italic font-normal italic text-[#143527]">choice list</span>
        </h1>
        <p className="mt-2 text-base text-[#577063]">
          Generate a balanced preference order of engineering colleges across Dream, Target, and Safe categories.
        </p>

        <div className="mt-6">
          <Disclaimer kind="prediction" />
        </div>

        <form onSubmit={onSubmit} className="mt-8 grid gap-4 rounded-3xl border border-[#cdddc9] bg-white p-6 sm:p-8 shadow-md sm:grid-cols-2">
          <input required name="studentName" placeholder="Student full name" className={inputClass} />
          <input name="phone" placeholder="Phone number" className={inputClass} />
          <input name="rank" placeholder="TNEA rank (optional)" className={inputClass} />
          <input name="community" placeholder="Community (OC/BC/MBC/SC...)" className={inputClass} />
          <input required name="cutoff" placeholder="Academic cutoff mark *" className={inputClass} />
          <input name="branches" placeholder="Preferred branches (CSE, ECE...)" className={inputClass} />
          <input name="cities" placeholder="Preferred cities (Chennai, CBE...)" className={inputClass} />
          <input name="budget" placeholder="Budget preference" className={inputClass} />
          <input name="collegeType" placeholder="Government / Private" className={inputClass} />
          <input name="placement" placeholder="Placement expectation" className={inputClass} />
          <select name="hostel" className={inputClass}>
            <option value="no">Hostel not required</option>
            <option value="yes">Hostel required</option>
          </select>

          <div className="sm:col-span-2 mt-2">
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#143527] py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#0b2017]">
              <Sparkles size={16} /> Generate My Choice List
            </button>
          </div>
        </form>

        {lists && lists.dream.length + lists.target.length + lists.safe.length === 0 && (
          <div className="mt-8">
            <EmptyState title="No cutoff records found" description="The choice list generator requires historical cutoff records." />
          </div>
        )}

        {lists && lists.dream.length + lists.target.length + lists.safe.length > 0 && (
          <>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {renderBucket("Dream Choices", lists.dream)}
              {renderBucket("Target Choices", lists.target)}
              {renderBucket("Safe Choices", lists.safe)}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onSave}
                className="inline-flex items-center gap-2 rounded-full bg-[#143527] px-6 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-[#0b2017]"
              >
                <Save size={16} /> Save Choice List
              </button>
              <button
                type="button"
                onClick={printList}
                className="inline-flex items-center gap-2 rounded-full border border-[#cdddc9] bg-white px-5 py-3 text-sm font-semibold text-[#142e23] transition hover:bg-[#e6f0e4]"
              >
                <Printer size={16} /> Export PDF / Print
              </button>
              <button
                type="button"
                onClick={share}
                className="inline-flex items-center gap-2 rounded-full border border-[#cdddc9] bg-white px-5 py-3 text-sm font-semibold text-[#142e23] transition hover:bg-[#e6f0e4]"
              >
                <Share2 size={16} /> Share
              </button>
              <WhatsAppButton source="choice-list" message="Please review my TNEA choice list.">
                Send to counsellor
              </WhatsAppButton>
            </div>

            {message && <p className="mt-4 text-sm font-semibold text-emerald-800">{message}</p>}
          </>
        )}
      </div>
    </main>
  );
};

export default TneaChoiceList;
