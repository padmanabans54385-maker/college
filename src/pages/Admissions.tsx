import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { Disclaimer } from "../components/Disclaimer";
import { brand } from "../config/brand";
import { ArrowRight, CheckCircle2, GraduationCap } from "lucide-react";

const Admissions = () => (
  <main className="bg-[#edf4ec] py-12">
    <Seo title="Admission Guidance" description="Navigate TNEA and college admissions in Tamil Nadu with checklists and responsible guidance." path="/admissions" />
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <div className="rounded-3xl border border-[#cdddc9] bg-[#dce8da] p-8 sm:p-10 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#143527]">
          <GraduationCap className="h-3.5 w-3.5 text-[#143527]" />
          Admissions Guide
        </div>

        <h1 className="mt-6 font-heading text-4xl font-extrabold tracking-tight text-[#142e23] sm:text-5xl">
          Admission <span className="font-serif-italic font-normal italic text-[#143527]">guidance</span>
        </h1>

        <p className="mt-4 text-base text-[#465f51] leading-relaxed">
          {brand.description}
        </p>

        <div className="mt-8 rounded-2xl border border-[#cdddc9] bg-white p-6 shadow-xs">
          <h2 className="font-heading text-xl font-bold text-[#142e23]">Step-by-Step Admissions Checklist</h2>
          <div className="mt-5 space-y-3">
            {[
              "Gather marksheets, community certificate and photo ID.",
              "Track official TNEA counselling dates from the authority website.",
              "Build a balanced choice list using historical cut-offs as estimates.",
              "Compare tuition, hostel and transportation fees independently with colleges.",
            ].map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm text-[#142e23]">
                <CheckCircle2 className="h-5 w-5 text-[#143527] shrink-0 mt-0.5" />
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Disclaimer kind="official" />
        </div>

        <div className="mt-8">
          <Link
            to="/counselling"
            className="inline-flex items-center gap-2 rounded-full bg-[#143527] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#0b2017]"
          >
            <span>Get free counselling</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  </main>
);

export default Admissions;
