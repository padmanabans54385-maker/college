import { Seo } from "../components/Seo";
import { brand } from "../config/brand";
import { Sprout, ShieldCheck, Award, Building2 } from "lucide-react";

const About = () => (
  <main className="bg-[#edf4ec] py-12 sm:py-16">
    <Seo title="About Us" description={`${brand.name} helps students and parents explore Tamil Nadu colleges with transparent, data-aware guidance.`} path="/about" />
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <div className="rounded-3xl border border-[#cdddc9] bg-[#dce8da] p-8 sm:p-12 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#143527]">
          <Sprout className="h-3.5 w-3.5 text-[#143527]" />
          About Our Mission
        </div>

        <h1 className="mt-6 font-heading text-4xl font-extrabold tracking-tight text-[#142e23] sm:text-5xl">
          About <span className="font-serif-italic font-normal italic text-[#143527]">{brand.name}</span>
        </h1>

        <p className="mt-4 font-heading text-xl font-semibold text-[#143527]">
          {brand.supportingTagline}
        </p>

        <p className="mt-6 text-base text-[#465f51] leading-relaxed">
          We are an independent education guidance platform focused on college discovery, TNEA cutoff analytics, and unbiased counselling support for students and parents in Tamil Nadu. We maintain strict compliance with official state counselling rules and transparent admission information.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#cdddc9] bg-white p-5 shadow-xs">
            <Building2 className="h-6 w-6 text-[#143527]" />
            <h3 className="mt-3 font-heading text-lg font-bold text-[#142e23]">Top Colleges</h3>
            <p className="mt-1 text-xs text-[#577063]">Detailed profiles of Anna University & affiliated institutions.</p>
          </div>

          <div className="rounded-2xl border border-[#cdddc9] bg-white p-5 shadow-xs">
            <Award className="h-6 w-6 text-[#143527]" />
            <h3 className="mt-3 font-heading text-lg font-bold text-[#142e23]">Cutoff Records</h3>
            <p className="mt-1 text-xs text-[#577063]">Multi-year community & branch cutoff analytics.</p>
          </div>

          <div className="rounded-2xl border border-[#cdddc9] bg-white p-5 shadow-xs">
            <ShieldCheck className="h-6 w-6 text-[#143527]" />
            <h3 className="mt-3 font-heading text-lg font-bold text-[#142e23]">Free Counselling</h3>
            <p className="mt-1 text-xs text-[#577063]">Guiding students through TNEA choice filling & admissions.</p>
          </div>
        </div>
      </div>
    </div>
  </main>
);

export default About;
