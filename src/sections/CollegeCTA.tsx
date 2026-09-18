import { Link } from "react-router-dom";

const CollegeCTA = () => {
  return (
    <section className="bg-[#edf4ec] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#122c21] p-8 sm:p-12 lg:p-16 text-center text-white shadow-lg">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-5xl text-white">
            Ready to plan your admission?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-[#a8c7b8]">
            Create a free account to save colleges, build choice lists and submit applications.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-[#143527] transition-transform hover:-translate-y-0.5 hover:bg-[#edf4ec]"
            >
              Register free
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/40 bg-transparent px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollegeCTA;