import { Seo } from "../components/Seo";
import { brand } from "../config/brand";

const Privacy = () => (
  <main className="mx-auto max-w-3xl px-4 py-12">
    <Seo title="Privacy Policy" description="How Go2College handles account and enquiry information." path="/privacy" />
    <h1 className="font-heading text-4xl font-extrabold">Privacy policy</h1>
    <p className="mt-4 text-sm leading-7 text-slate-600">
      {brand.name} collects only information needed to provide college discovery, counselling requests and account features.
      We do not sell personal data. Contact and academic fields you submit are stored in Firebase for service delivery.
      You may request account deletion by contacting us.
    </p>
  </main>
);

export default Privacy;
