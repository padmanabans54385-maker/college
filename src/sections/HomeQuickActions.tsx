import { Link } from "react-router-dom";
import {
  CalculatorIcon,
  ChalkboardIcon,
  GrowthArrowIcon,
  IconBadge,
  UniversityIcon,
} from "../components/icons/AcademicIcons";

const quickCards = [
  {
    num: "01",
    to: "/colleges",
    title: "College search",
    description: "Verified profiles with fees, cutoffs, and placements.",
    icon: UniversityIcon,
  },
  {
    num: "02",
    to: "/tnea/cutoff",
    title: "Cutoff explorer",
    description: "Historical TNEA cutoffs by branch, community, and year.",
    icon: CalculatorIcon,
  },
  {
    num: "03",
    to: "/tnea/predictor",
    title: "Admission predictor",
    description: "Estimate your chances from your cutoff mark.",
    icon: GrowthArrowIcon,
  },
  {
    num: "04",
    to: "/tnea/choice-list",
    title: "Choice-list builder",
    description: "Build dream, target, and safe lists for counselling.",
    icon: ChalkboardIcon,
  },
];

const HomeQuickActions = () => (
  <section className="bg-[#F5F9FC] py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="font-heading text-3xl font-bold tracking-tight text-[#075B63] sm:text-4xl">
        Start here
      </h2>
      <p className="mt-2 max-w-2xl font-poppins text-sm text-[#5A6E78]">
        Education, guidance, growth, and career — one academic platform.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {quickCards.map((card) => (
          <div key={card.num} className="academic-card group flex flex-col justify-between p-6">
            <div>
              <IconBadge>
                <card.icon size={22} />
              </IconBadge>
              <span className="mt-4 block font-poppins text-xs font-semibold uppercase tracking-wider text-[#168FD0]">
                {card.num}
              </span>
              <h3 className="mt-2 font-heading text-xl font-bold text-[#075B63]">
                {card.title}
              </h3>
              <p className="mt-2 font-poppins text-sm leading-relaxed text-[#5A6E78]">
                {card.description}
              </p>
            </div>
            <Link
              to={card.to}
              className="mt-6 inline-flex items-center gap-1.5 font-poppins text-sm font-semibold text-[#168FD0]"
            >
              Open
              <GrowthArrowIcon size={14} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HomeQuickActions;
