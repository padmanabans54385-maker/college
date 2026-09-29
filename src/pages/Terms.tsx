import { Seo } from "../components/Seo";
import { brand } from "../config/brand";
import { FileText } from "lucide-react";

const Terms = () => (
  <main className="bg-[#F5F9FC] py-12 sm:py-16">
    <Seo title="Terms & Conditions" description={`Terms of use for the ${brand.name} platform.`} path="/terms" />
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      <div className="rounded-3xl border border-[#E2ECF3] bg-white p-8 sm:p-12 shadow-md">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E2ECF3] bg-[#F0F8FD] px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#075B63]">
          <FileText className="h-3.5 w-3.5" />
          User Agreement
        </div>

        <h1 className="mt-4 font-heading text-4xl font-extrabold text-[#075B63]">Terms & conditions</h1>

        <p className="mt-6 text-base leading-relaxed text-[#5A6E78]">
          {brand.name} provides informational tools and counselling guidance based on available published data. Cutoff predictions, rank estimation, and choice lists generated on this platform serve as estimates and do not guarantee official allotment. Users must verify all fee structures, eligibility criteria, and admission schedules directly with institutions and the official counselling authority. Use of this website constitutes acceptance of these terms.
        </p>
      </div>
    </div>
  </main>
);

export default Terms;
