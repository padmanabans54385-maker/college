import { Seo } from "../components/Seo";
import { CounsellingForm } from "../components/CounsellingForm";
import { Disclaimer } from "../components/Disclaimer";
import { ShieldCheck, UserCheck, Users, ClipboardList } from "lucide-react";

const Counselling = () => (
  <main className="bg-[#edf4ec] py-12">
    <Seo title="Admission Counselling" description="Personalized counselling for students and parents on TNEA, courses and college selection." path="/counselling" />
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <div className="inline-flex items-center gap-2 rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#143527]">
        <ShieldCheck className="h-3.5 w-3.5 text-[#143527]" />
        Free TNEA Guidance
      </div>

      <h1 className="mt-4 font-heading text-4xl font-extrabold text-[#142e23] sm:text-5xl">
        Counselling <span className="font-serif-italic font-normal italic text-[#143527]">services</span>
      </h1>
      <p className="mt-2 text-base text-[#577063]">
        Student-first, transparent guidance. We do not guarantee seats or sell management quotas.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <article className="rounded-3xl border border-[#cdddc9] bg-white p-6 shadow-sm transition hover:shadow-md">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e6f0e4] text-[#143527]">
            <UserCheck className="h-5 w-5" />
          </div>
          <h2 className="mt-4 font-heading text-xl font-bold text-[#142e23]">Student Guidance</h2>
          <ul className="mt-3 space-y-2 text-sm text-[#465f51]">
            <li className="flex items-center gap-2">• Cutoff & rank analysis</li>
            <li className="flex items-center gap-2">• Engineering branch selection</li>
            <li className="flex items-center gap-2">• TNEA choice filling strategy</li>
            <li className="flex items-center gap-2">• Allotment reporting tips</li>
          </ul>
        </article>

        <article className="rounded-3xl border border-[#cdddc9] bg-white p-6 shadow-sm transition hover:shadow-md">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e6f0e4] text-[#143527]">
            <Users className="h-5 w-5" />
          </div>
          <h2 className="mt-4 font-heading text-xl font-bold text-[#142e23]">Parent Counselling</h2>
          <ul className="mt-3 space-y-2 text-sm text-[#465f51]">
            <li className="flex items-center gap-2">• College infrastructure comparison</li>
            <li className="flex items-center gap-2">• Fee breakdown & hidden costs</li>
            <li className="flex items-center gap-2">• Hostel & campus safety analysis</li>
            <li className="flex items-center gap-2">• Long-term career prospects</li>
          </ul>
        </article>

        <article className="rounded-3xl border border-[#cdddc9] bg-white p-6 shadow-sm transition hover:shadow-md">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e6f0e4] text-[#143527]">
            <ClipboardList className="h-5 w-5" />
          </div>
          <h2 className="mt-4 font-heading text-xl font-bold text-[#142e23]">Application Support</h2>
          <ul className="mt-3 space-y-2 text-sm text-[#465f51]">
            <li className="flex items-center gap-2">• Certificate verification help</li>
            <li className="flex items-center gap-2">• Important TNEA key dates</li>
            <li className="flex items-center gap-2">• Scholarship eligibility review</li>
            <li className="flex items-center gap-2">• Direct college enquiry support</li>
          </ul>
        </article>
      </div>

      <div className="mt-12">
        <h2 className="font-heading text-2xl font-bold text-[#142e23]">Request Free Counselling Callback</h2>
        <p className="mt-1 text-sm text-[#577063]">Fill in your details below and an expert admission counsellor will call you.</p>
        <div className="mt-6">
          <CounsellingForm />
        </div>
      </div>

      <div className="mt-8">
        <Disclaimer kind="official" />
      </div>
    </div>
  </main>
);

export default Counselling;
