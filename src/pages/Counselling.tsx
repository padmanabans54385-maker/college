import { Seo } from "../components/Seo";
import { CounsellingForm } from "../components/CounsellingForm";
import { Disclaimer } from "../components/Disclaimer";
import { brand } from "../config/brand";
import {
  AppleIcon,
  ChalkboardIcon,
  LightbulbIcon,
} from "../components/icons/AcademicIcons";

const Counselling = () => (
  <main className="bg-[#F5F9FC] py-12">
    <Seo
      title="Admission Counselling"
      description="Personalized counselling for students and parents on courses, colleges, and career growth."
      path="/counselling"
    />
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <div className="academic-badge">
        <LightbulbIcon size={14} className="text-[#168FD0]" />
        Student services
      </div>

      <h1 className="mt-4 font-heading text-4xl font-bold text-[#075B63] sm:text-5xl">
        Counselling services
      </h1>
      <p className="mt-2 font-poppins text-base text-[#5A6E78]">
        Student-first, transparent guidance. We do not guarantee seats or sell management quotas.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)]">
        <img
          src={brand.images.writingBooks}
          alt="Academic knowledge and writing skills"
          className="mx-auto max-h-56 w-full object-cover object-center"
        />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <article className="academic-card p-6">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0F8FD] text-[#075B63]">
            <LightbulbIcon size={22} />
          </span>
          <h2 className="mt-4 font-heading text-xl font-bold text-[#075B63]">Career guidance</h2>
          <ul className="mt-3 space-y-2 font-poppins text-sm text-[#5A6E78]">
            <li>Cutoff and rank analysis</li>
            <li>Branch and course selection</li>
            <li>Choice filling strategy</li>
            <li>Allotment reporting tips</li>
          </ul>
        </article>

        <article className="academic-card p-6">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0F8FD] text-[#075B63]">
            <AppleIcon size={22} />
          </span>
          <h2 className="mt-4 font-heading text-xl font-bold text-[#075B63]">Student support</h2>
          <ul className="mt-3 space-y-2 font-poppins text-sm text-[#5A6E78]">
            <li>College infrastructure comparison</li>
            <li>Fee breakdown and costs</li>
            <li>Hostel and campus safety</li>
            <li>Long-term career prospects</li>
          </ul>
        </article>

        <article className="academic-card p-6">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0F8FD] text-[#075B63]">
            <ChalkboardIcon size={22} />
          </span>
          <h2 className="mt-4 font-heading text-xl font-bold text-[#075B63]">Application assistance</h2>
          <ul className="mt-3 space-y-2 font-poppins text-sm text-[#5A6E78]">
            <li>Certificate verification help</li>
            <li>Important admission dates</li>
            <li>Scholarship eligibility review</li>
            <li>Direct college enquiry support</li>
          </ul>
        </article>
      </div>

      <div className="mt-12">
        <h2 className="font-heading text-2xl font-bold text-[#075B63]">Request a free counselling callback</h2>
        <p className="mt-1 font-poppins text-sm text-[#5A6E78]">
          Fill in your details and an expert admission counsellor will call you.
        </p>
        <div className="mt-6">
          <CounsellingForm />
        </div>
      </div>

      <div className="mt-8">
        <Disclaimer kind="official" />
      </div>
    </div>
  </main>
);

export default Counselling;
