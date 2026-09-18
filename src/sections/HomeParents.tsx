import { CheckCircle2 } from "lucide-react";

const HomeParents = () => (
  <section className="bg-[#edf4ec] py-16 border-t border-[#cdddc9]/60">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-[#142e23] sm:text-4xl">
            Built for students & parents
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#465f51]">
            Admission decisions involve the whole family. CollegeCrop keeps every step clear, fast and transparent — so parents and students can make confident choices.
          </p>

          <div className="mt-6 space-y-3">
            {[
              "Verified college profiles with source metadata",
              "Free human-first guidance for first-generation learners",
              "Clear labels on historical, estimated and official data",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm font-medium text-[#142e23]">
                <CheckCircle2 className="h-4 w-4 text-[#143527] shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#cdddc9] bg-white p-6 shadow-xs sm:col-span-2">
              <span className="font-heading text-4xl font-extrabold text-[#143527]">
                2,400+
              </span>
              <p className="mt-1 text-xs font-semibold text-[#577063]">
                students guided through TNEA counselling choices since 2023
              </p>
            </div>

            <div className="rounded-2xl border border-[#cdddc9] bg-white p-5 shadow-xs">
              <span className="font-heading text-3xl font-extrabold text-[#143527]">
                32
              </span>
              <p className="mt-1 text-xs font-semibold text-[#577063]">
                districts covered
              </p>
            </div>

            <div className="rounded-2xl border border-[#cdddc9] bg-white p-5 shadow-xs">
              <span className="font-heading text-3xl font-extrabold text-[#143527]">
                4.8/5
              </span>
              <p className="mt-1 text-xs font-semibold text-[#577063]">
                parent satisfaction
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HomeParents;
