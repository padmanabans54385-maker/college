import { Seo } from "../components/Seo";
import { CounsellingForm } from "../components/CounsellingForm";
import { Disclaimer } from "../components/Disclaimer";

const Counselling = () => (
  <main className="mx-auto max-w-5xl px-4 py-12">
    <Seo title="Admission Counselling" description="Personalized counselling for students and parents on TNEA, courses and college selection." path="/counselling" />
    <h1 className="font-heading text-4xl font-extrabold">Counselling services</h1>
    <p className="mt-3 text-slate-600">Student-first guidance. We do not guarantee seats or placements.</p>
    <div className="mt-8 grid gap-4 md:grid-cols-3">
      <article className="rounded-3xl border bg-white p-5">
        <h2 className="font-heading text-lg font-bold">Personalized counselling</h2>
        <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-slate-600">
          <li>Academic profile analysis</li>
          <li>Course and college selection</li>
          <li>TNEA and choice filling guidance</li>
          <li>Admission process guidance</li>
        </ul>
      </article>
      <article className="rounded-3xl border bg-white p-5">
        <h2 className="font-heading text-lg font-bold">Parent counselling</h2>
        <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-slate-600">
          <li>College comparison</li>
          <li>Fees discussion</li>
          <li>Course opportunities</li>
          <li>Hostel considerations</li>
        </ul>
      </article>
      <article className="rounded-3xl border bg-white p-5">
        <h2 className="font-heading text-lg font-bold">Application support</h2>
        <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-slate-600">
          <li>Application and document checklists</li>
          <li>Important dates</li>
          <li>Reporting guidance</li>
        </ul>
      </article>
    </div>
    <h2 className="mt-10 font-heading text-2xl font-bold">Request counselling</h2>
    <div className="mt-4">
      <CounsellingForm />
    </div>
    <Disclaimer kind="official" />
  </main>
);

export default Counselling;
