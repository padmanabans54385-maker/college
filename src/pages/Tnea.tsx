import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { Disclaimer } from "../components/Disclaimer";
import { Compass, Calculator, ListOrdered, HelpCircle } from "lucide-react";

const blocks = [
  ["TNEA Overview", "Tamil Nadu Engineering Admissions (TNEA) is the official single-window counselling process for B.E / B.Tech seats in participating colleges. Always confirm current rules on the official TNEA portal."],
  ["Important Dates", "Official schedule dates, registration timelines, and counselling rounds will be updated here as released by the authority."],
  ["Registration & Verification", "Students register online with 12th marks and community certificates. Certificate verification happens at TNEA Facilitation Centres (TFCs)."],
  ["Rank List & Normalization", "Ranks are published by the counselling authority based on normalized Maths, Physics, and Chemistry cutoffs."],
  ["Counselling Rounds", "Seats are allotted in rounds based on rank ranges. Choice filling and confirmation rules apply strictly for each round."],
  ["Tentative Allotment", "A tentative allotment is issued after choice locking. You can accept, upward request, or decline seat allotment."],
  ["Confirmation & Fee Payment", "Confirm seat allotment and pay tuition fees within the deadline via the official TNEA portal."],
  ["College Reporting", "Report to your allotted college with original documents and certificates as instructed by the admission authority."],
  ["Smart Choice Filling", "Order colleges strategically from high-demand to safety options. Use our cutoff explorer & choice list builder for guidance."],
];

const Tnea = () => (
  <main className="bg-[#F5F9FC] py-12">
    <Seo
      title="TNEA 2026 Admission Guidance"
      description="Understand the Tamil Nadu Engineering Admissions process, important dates, cut-offs, choice filling and college selection."
      path="/tnea"
    />
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <div className="inline-flex items-center gap-2 rounded-full border border-[#E2ECF3] bg-[#F0F8FD] px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#075B63]">
        <Compass className="h-3.5 w-3.5 text-[#075B63]" />
        TNEA Admission Hub
      </div>

      <h1 className="mt-4 font-heading text-4xl font-extrabold text-[#075B63] sm:text-5xl">
        TNEA 2026 <span className="font-serif-italic font-normal italic text-[#075B63]">guidance</span>
      </h1>
      <p className="mt-2 text-base text-[#5A6E78]">
        Comprehensive breakdown of Tamil Nadu Engineering Admissions, cutoff marks, choice filling strategies, and allotments.
      </p>

      <div className="mt-6">
        <Disclaimer kind="official" />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/tnea/cutoff"
          className="inline-flex items-center gap-2 rounded-full bg-[#075B63] px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-[#05434A]"
        >
          <Compass size={16} /> Cutoff explorer
        </Link>
        <Link
          to="/tnea/predictor"
          className="inline-flex items-center gap-2 rounded-full border border-[#075B63] bg-transparent px-5 py-2.5 text-sm font-semibold text-[#075B63] transition hover:bg-[#075B63]/10"
        >
          <Calculator size={16} /> College predictor
        </Link>
        <Link
          to="/tnea/choice-list"
          className="inline-flex items-center gap-2 rounded-full border border-[#075B63] bg-transparent px-5 py-2.5 text-sm font-semibold text-[#075B63] transition hover:bg-[#075B63]/10"
        >
          <ListOrdered size={16} /> Choice list builder
        </Link>
        <Link
          to="/faq"
          className="inline-flex items-center gap-2 rounded-full border border-[#E2ECF3] bg-white px-5 py-2.5 text-sm font-semibold text-[#075B63] transition hover:bg-[#F0F8FD]"
        >
          <HelpCircle size={16} /> TNEA FAQs
        </Link>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {blocks.map(([title, body], idx) => (
          <section key={title} className="rounded-3xl border border-[#E2ECF3] bg-white p-6 shadow-sm transition hover:shadow-md">
            <span className="font-heading text-xs font-bold text-[#075B63] uppercase tracking-wider">
              Step 0{idx + 1}
            </span>
            <h2 className="mt-2 font-heading text-xl font-bold text-[#075B63]">{title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#5A6E78]">{body}</p>
          </section>
        ))}
      </div>
    </div>
  </main>
);

export default Tnea;
