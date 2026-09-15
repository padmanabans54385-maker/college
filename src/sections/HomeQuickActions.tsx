import { Link } from "react-router-dom";
import {
  Building2,
  Calculator,
  IndianRupee,
  ListChecks,
  Target,
  Trophy,
} from "lucide-react";

const cards = [
  { to: "/colleges", label: "Find Colleges", icon: Building2 },
  { to: "/tnea/cutoff", label: "Check Cutoffs", icon: Calculator },
  { to: "/tnea/predictor", label: "Predict Your College", icon: Target },
  { to: "/tnea/choice-list", label: "Build Choice List", icon: ListChecks },
  { to: "/fees", label: "Compare Fees", icon: IndianRupee },
  { to: "/placements", label: "Compare Placements", icon: Trophy },
];

const HomeQuickActions = () => (
  <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
      {cards.map((card) => (
        <Link
          key={card.to}
          to={card.to}
          className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold shadow-sm hover:border-teal-300"
        >
          <card.icon className="h-5 w-5 text-teal-700" />
          {card.label}
        </Link>
      ))}
    </div>
  </section>
);

export default HomeQuickActions;
