import { Seo } from "../components/Seo";
import { brand } from "../config/brand";

const About = () => (
  <main className="mx-auto max-w-3xl px-4 py-12">
    <Seo title="About Us" description="Go2College helps students and parents explore Tamil Nadu colleges with transparent, data-aware guidance." path="/about" />
    <img src={brand.logoSrc} alt={brand.name} className="mb-6 h-24 w-auto" />
    <h1 className="font-heading text-4xl font-extrabold">About {brand.name}</h1>
    <p className="mt-4 text-slate-600">{brand.supportingTagline}</p>
    <p className="mt-4 text-slate-600">
      We are an independent education platform focused on college discovery, TNEA guidance and counselling support for
      students and parents in Tamil Nadu. We do not sell guaranteed admission or guaranteed placement.
    </p>
  </main>
);

export default About;
