import { Link } from "react-router-dom";
import { BookMarked, ArrowRight } from "lucide-react";

const SavedCourses = () => (
  <main className="bg-[#edf4ec] py-12">
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <div className="rounded-3xl border border-[#cdddc9] bg-white p-8 sm:p-10 shadow-md">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#143527]">
          <BookMarked className="h-3.5 w-3.5" />
          Saved Preferences
        </div>

        <h1 className="mt-4 font-heading text-3xl sm:text-4xl font-extrabold text-[#142e23]">
          Saved <span className="font-serif-italic font-normal italic text-[#143527]">courses</span>
        </h1>

        <p className="mt-2 text-base text-[#577063]">
          Browse available engineering courses and bookmark programs to track eligibility and fees.
        </p>

        <div className="mt-8">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 rounded-full bg-[#143527] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#0b2017]"
          >
            <span>Explore courses</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  </main>
);

export default SavedCourses;
