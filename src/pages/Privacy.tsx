import { Seo } from "../components/Seo";
import { brand } from "../config/brand";
import { ShieldCheck } from "lucide-react";

const Privacy = () => (
  <main className="bg-[#edf4ec] py-12 sm:py-16">
    <Seo title="Privacy Policy" description={`How ${brand.name} handles account and enquiry information.`} path="/privacy" />
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      <div className="rounded-3xl border border-[#cdddc9] bg-white p-8 sm:p-12 shadow-md">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#143527]">
          <ShieldCheck className="h-3.5 w-3.5" />
          Data Protection
        </div>

        <h1 className="mt-4 font-heading text-4xl font-extrabold text-[#142e23]">Privacy policy</h1>

        <p className="mt-6 text-base leading-relaxed text-[#465f51]">
          {brand.name} collects only information essential to provide college discovery, TNEA counselling requests, and account features. We enforce strict data privacy standards and do not sell personal data to third parties. Contact and academic information you submit is stored securely for service delivery. You may request account deletion at any time by contacting our support team.
        </p>
      </div>
    </div>
  </main>
);

export default Privacy;
