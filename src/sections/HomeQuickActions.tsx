import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const quickCards = [
  {
    num: "01",
    to: "/colleges",
    title: "Explore colleges",
    description: "Verified profiles with fees, cutoffs and placements.",
  },
  {
    num: "02",
    to: "/tnea/cutoff",
    title: "Cutoff explorer",
    description: "Historical TNEA cutoffs by branch, community and year.",
  },
  {
    num: "03",
    to: "/tnea/predictor",
    title: "Admission predictor",
    description: "Estimate your chances from your cutoff mark.",
  },
  {
    num: "04",
    to: "/tnea/choice-list",
    title: "Choice-list builder",
    description: "Build dream, target and safe lists for counselling.",
  },
];

const HomeQuickActions = () => (
  <section className="bg-[#edf4ec] py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-[#142e23] sm:text-4xl">
          Start here
        </h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {quickCards.map((card) => (
          <div
            key={card.num}
            className="group relative flex flex-col justify-between rounded-2xl border border-[#cdddc9] bg-white p-6 shadow-xs transition-all hover:-translate-y-1 hover:border-[#143527] hover:shadow-md"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#577063]">
                {card.num}
              </span>
              <h3 className="mt-3 font-heading text-xl font-bold text-[#142e23] group-hover:text-[#143527]">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#465f51]">
                {card.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#edf4ec]">
              <Link
                to={card.to}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#cdddc9] bg-[#edf4ec] px-4 py-1.5 text-xs font-bold text-[#143527] transition-colors group-hover:bg-[#143527] group-hover:text-white"
              >
                <span>Open</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HomeQuickActions;
