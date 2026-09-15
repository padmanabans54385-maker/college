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
      setMessage("Sign in to save your choice list.");
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
    setMessage("Choice list saved.");
  };

  const printList = () => window.print();

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) await navigator.share({ title: "My TNEA choice list", url });
    else await navigator.clipboard.writeText(url);
  };

  const render = (title: string, items: ChoiceListItem[]) => (
    <section className="rounded-3xl border bg-white p-5">
      <h2 className="font-heading text-lg font-bold">{title}</h2>
      <ul className="mt-3 space-y-4">
        {items.map((item, index) => (
          <li key={`${title}-${index}`} className="text-sm">
            <p className="font-semibold">{item.collegeName} — {item.branch}</p>
            <p>{item.location}</p>
            <p>Historical cutoff: {item.historicalCutoff ?? "Information currently unavailable."}</p>
            <p>{item.estimatedCompetitiveness}</p>
            <p>Fees: {item.fees || "Information currently unavailable."}</p>
            <p>Placement: {item.placement || "Information currently unavailable."}</p>
            <p className="text-slate-500">{item.reason}</p>
          </li>
        ))}
      </ul>
    </section>
  );

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <Seo title="Personalized TNEA Choice List" description="Generate a dream, target and safe college choice list from historical data." path="/tnea/choice-list" />
      <h1 className="font-heading text-4xl font-extrabold">Personalized choice list</h1>
      <Disclaimer kind="prediction" />
      <form onSubmit={onSubmit} className="mt-8 grid gap-3 rounded-3xl border bg-white p-5 sm:grid-cols-2">
        <input required name="studentName" placeholder="Student name" className="rounded-xl border px-3 py-2.5 text-sm" />
        <input name="phone" placeholder="Phone" className="rounded-xl border px-3 py-2.5 text-sm" />
        <input name="rank" placeholder="TNEA rank" className="rounded-xl border px-3 py-2.5 text-sm" />
        <input name="community" placeholder="Community" className="rounded-xl border px-3 py-2.5 text-sm" />
        <input required name="cutoff" placeholder="Cutoff" className="rounded-xl border px-3 py-2.5 text-sm" />
        <input name="branches" placeholder="Preferred branches (comma separated)" className="rounded-xl border px-3 py-2.5 text-sm" />
        <input name="cities" placeholder="Preferred cities" className="rounded-xl border px-3 py-2.5 text-sm" />
        <input name="budget" placeholder="Budget" className="rounded-xl border px-3 py-2.5 text-sm" />
        <input name="collegeType" placeholder="Government/private preference" className="rounded-xl border px-3 py-2.5 text-sm" />
        <input name="placement" placeholder="Placement preference" className="rounded-xl border px-3 py-2.5 text-sm" />
        <select name="hostel" className="rounded-xl border px-3 py-2.5 text-sm">
          <option value="no">Hostel not required</option>
          <option value="yes">Hostel required</option>
        </select>
        <button className="rounded-xl bg-teal-700 text-sm font-semibold text-white">Generate list</button>
      </form>
      {lists && lists.dream.length + lists.target.length + lists.safe.length === 0 && (
        <div className="mt-8">
          <EmptyState title="No cutoff data" description="The generator needs historical cut-off records in Firestore." />
        </div>
      )}
      {lists && lists.dream.length + lists.target.length + lists.safe.length > 0 && (
        <>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {render("Dream choices", lists.dream)}
            {render("Target choices", lists.target)}
            {render("Safe choices", lists.safe)}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={onSave} className="rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white">Save choice list</button>
            <button type="button" onClick={printList} className="rounded-full border px-5 py-2.5 text-sm font-semibold">Export PDF</button>
            <button type="button" onClick={share} className="rounded-full border px-5 py-2.5 text-sm font-semibold">Share</button>
            <WhatsAppButton source="choice-list" message="Please review my TNEA choice list.">
              Send to counsellor
            </WhatsAppButton>
          </div>
          <p className="mt-4 text-sm font-semibold">Need help finalizing your choices?</p>
          {message && <p className="mt-2 text-sm text-emerald-700">{message}</p>}
        </>
      )}
    </main>
  );
};

export default TneaChoiceList;
