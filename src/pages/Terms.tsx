import { Seo } from "../components/Seo";
import { brand } from "../config/brand";

const Terms = () => (
  <main className="mx-auto max-w-3xl px-4 py-12">
    <Seo title="Terms & Conditions" description="Terms of use for the Go2College platform." path="/terms" />
    <h1 className="font-heading text-4xl font-extrabold">Terms & conditions</h1>
    <p className="mt-4 text-sm leading-7 text-slate-600">
      {brand.name} provides informational tools based on available data. Cut-off predictions and choice lists are estimates
      and not official allotment. Always verify with institutions and the counselling authority. Use of this website
      constitutes acceptance of these terms.
    </p>
  </main>
);

export default Terms;
