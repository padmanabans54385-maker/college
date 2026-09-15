import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { Disclaimer } from "../components/Disclaimer";

const blocks = [
  ["TNEA Overview", "Tamil Nadu Engineering Admissions (TNEA) is the counselling process for engineering seats in participating colleges. Confirm current rules with the official TNEA website."],
  ["Important Dates", "Official dates will appear here when published in the admin CMS, with a source link."],
  ["Registration", "Students typically register online with academic marks and community details. Follow official instructions only."],
  ["Rank List", "Ranks are published by the counselling authority. This platform does not generate official ranks."],
  ["Counselling Rounds", "Seats are allotted in rounds. Choice filling and confirmation rules can change each year."],
  ["Tentative Allotment", "A tentative allotment is not a confirmed admission until you complete official confirmation steps."],
  ["Confirmation", "Pay fees and confirm the seat only through official portals."],
  ["Reporting", "Report to the allotted college with original documents as instructed officially."],
  ["Choice Filling", "Order colleges from realistic to preferred. Use our choice-list tool as guidance, not as an official list."],
];

const Tnea = () => (
  <main className="mx-auto max-w-5xl px-4 py-12">
    <Seo
      title="TNEA 2026 Admission Guidance"
      description="Understand the Tamil Nadu Engineering Admissions process, important dates, cut-offs, choice filling and college selection."
      path="/tnea"
    />
    <p className="text-xs font-bold uppercase tracking-widest text-teal-700">Official vs guidance</p>
    <h1 className="mt-2 font-heading text-4xl font-extrabold">TNEA 2026 Admission Guidance</h1>
    <p className="mt-4 text-lg text-slate-600">
      Understand the Tamil Nadu Engineering Admissions process, important dates, cut-offs, choice filling and college selection.
    </p>
    <Disclaimer kind="official" />
    <div className="mt-8 grid gap-4">
      {blocks.map(([title, body]) => (
        <section key={title} className="rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="font-heading text-xl font-bold">{title}</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">{body}</p>
        </section>
      ))}
    </div>
    <div className="mt-8 flex flex-wrap gap-3">
      <Link to="/tnea/cutoff" className="rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white">Cutoff explorer</Link>
      <Link to="/tnea/predictor" className="rounded-full border px-5 py-2.5 text-sm font-semibold">College predictor</Link>
      <Link to="/tnea/choice-list" className="rounded-full border px-5 py-2.5 text-sm font-semibold">Choice list</Link>
      <Link to="/faq" className="rounded-full border px-5 py-2.5 text-sm font-semibold">FAQs</Link>
    </div>
  </main>
);

export default Tnea;
