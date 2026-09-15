import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { Disclaimer } from "../components/Disclaimer";
import { brand } from "../config/brand";

const Admissions = () => (
  <main className="mx-auto max-w-4xl px-4 py-12">
    <Seo title="Admission Guidance" description="Navigate TNEA and college admissions in Tamil Nadu with checklists and responsible guidance." path="/admissions" />
    <h1 className="font-heading text-4xl font-extrabold">Admission guidance</h1>
    <p className="mt-4 text-slate-600">{brand.description}</p>
    <ul className="mt-6 list-disc space-y-2 pl-5 text-slate-700">
      <li>Gather marksheets, community certificate and photo ID.</li>
      <li>Track official counselling dates from the authority website.</li>
      <li>Build a balanced choice list using historical cut-offs as estimates.</li>
      <li>Compare fees and hostel independently with the college.</li>
    </ul>
    <Disclaimer kind="official" />
    <Link to="/counselling" className="mt-8 inline-flex rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white">
      Get counselling
    </Link>
  </main>
);

export default Admissions;
