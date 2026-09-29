import { Seo } from "../components/Seo";
import { brand } from "../config/brand";
import { ShieldCheck } from "lucide-react";

const Privacy = () => (
  <main className="bg-[#F5F9FC] py-12 sm:py-16">
    <Seo title="Privacy Policy" description={`How ${brand.name} handles account and enquiry information.`} path="/privacy" />
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      <div className="rounded-3xl border border-[#E2ECF3] bg-white p-8 sm:p-12 shadow-md">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E2ECF3] bg-[#F0F8FD] px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#075B63]">
          <ShieldCheck className="h-3.5 w-3.5" />
          Data Protection
        </div>

        <h1 className="mt-4 font-heading text-4xl font-extrabold text-[#075B63]">Privacy policy</h1>

        <p className="mt-6 text-base leading-relaxed text-[#5A6E78]">
          {brand.name} collects only information essential to provide college discovery, TNEA counselling requests, and account features. We enforce strict data privacy standards and do not sell personal data to third parties. Contact and academic information you submit is stored securely for service delivery. You may request account deletion at any time by contacting our support team.
        </p>
      </div>
    </div>
  </main>
);

export default Privacy;
