import { brand } from "../config/brand";
import { BooksIcon, GraduationCapIcon, LightbulbIcon } from "../components/icons/AcademicIcons";

const steps = [
  {
    num: "01",
    title: "Discover",
    description: "Search colleges, courses, and scholarships with independent, student-first data.",
    icon: BooksIcon,
  },
  {
    num: "02",
    title: "Plan",
    description: "Compare options, check historical cutoffs, and map a confident choice list.",
    icon: LightbulbIcon,
  },
  {
    num: "03",
    title: "Grow",
    description: "Apply, request counselling, and move from admission to career-ready growth.",
    icon: GraduationCapIcon,
  },
];

const HomeHowItWorks = () => (
  <section className="dark-teal-gradient py-16 text-white">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
        How it works
      </h2>
      <p className="mt-2 max-w-xl font-poppins text-sm text-[#BBE1F5]">
        A clear path from discovery to your elevated future.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.num}
            className="rounded-2xl border border-white/10 bg-white/8 p-6 transition-transform hover:-translate-y-1"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#168FD0] text-white">
              <step.icon size={22} />
            </span>
            <p className="mt-4 font-poppins text-xs font-semibold uppercase tracking-widest text-[#4DB3E8]">
              {step.num}
            </p>
            <h3 className="mt-1 font-heading text-2xl font-bold text-white">{step.title}</h3>
            <p className="mt-2 font-poppins text-sm leading-relaxed text-[#D2E3EA]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
      <p className="sr-only">{brand.name}</p>
    </div>
  </section>
);

export default HomeHowItWorks;
