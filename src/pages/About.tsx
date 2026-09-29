import { Seo } from "../components/Seo";
import { brand } from "../config/brand";
import {
  AwardIcon,
  LightbulbIcon,
  UniversityIcon,
} from "../components/icons/AcademicIcons";

const About = () => (
  <main className="bg-[#F5F9FC] py-12 sm:py-16">
    <Seo
      title="About Us"
      description={`${brand.name} helps students discover colleges, select courses, and grow toward a confident academic future.`}
      path="/about"
    />
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <div className="academic-badge">
            <LightbulbIcon size={14} className="text-[#168FD0]" />
            About our mission
          </div>
          <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight text-[#075B63] sm:text-5xl">
            About {brand.name}
          </h1>
          <p className="mt-4 font-heading text-xl font-semibold text-[#075B63]">
            {brand.supportingTagline}
          </p>
          <p className="mt-6 font-poppins text-base leading-relaxed text-[#5A6E78]">
            We are an independent education guidance platform focused on college discovery, course
            selection, cutoff analytics, and unbiased counselling. The path we design is simple:
            education, guidance, growth, career, future.
          </p>
        </div>
        <div className="academic-card overflow-hidden lg:col-span-6">
          <div className="aspect-4/3 overflow-hidden bg-[#F0F8FD]">
            <img
              src={brand.images.campus}
              alt="Academic campus building"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="academic-card p-6">
          <UniversityIcon size={28} className="text-[#168FD0]" />
          <h3 className="mt-3 font-heading text-lg font-bold text-[#075B63]">Top colleges</h3>
          <p className="mt-1 font-poppins text-sm text-[#5A6E78]">
            Detailed profiles of universities and affiliated institutions.
          </p>
        </div>
        <div className="academic-card p-6">
          <AwardIcon size={28} className="text-[#168FD0]" />
          <h3 className="mt-3 font-heading text-lg font-bold text-[#075B63]">Cutoff records</h3>
          <p className="mt-1 font-poppins text-sm text-[#5A6E78]">
            Multi-year community and branch cutoff analytics.
          </p>
        </div>
        <div className="academic-card p-6">
          <LightbulbIcon size={28} className="text-[#168FD0]" />
          <h3 className="mt-3 font-heading text-lg font-bold text-[#075B63]">Free counselling</h3>
          <p className="mt-1 font-poppins text-sm text-[#5A6E78]">
            Guiding students through choice filling and admissions.
          </p>
        </div>
      </div>
    </div>
  </main>
);

export default About;
