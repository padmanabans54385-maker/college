const steps = [
  {
    num: "1",
    title: "Discover",
    description:
      "Search and filter colleges, courses and scholarships across Tamil Nadu.",
  },
  {
    num: "2",
    title: "Plan",
    description:
      "Compare options, check historical cutoffs and build your choice list.",
  },
  {
    num: "3",
    title: "Apply",
    description:
      "Submit applications, request free counselling and track every status.",
  },
];

const HomeHowItWorks = () => (
  <section className="bg-[#122c21] py-16 text-white">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
        How it works
      </h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.num}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xs transition-transform hover:-translate-y-1"
          >
            <span className="font-heading text-4xl font-extrabold text-[#d7e7d5]">
              {step.num}
            </span>
            <h3 className="mt-4 font-heading text-2xl font-bold text-white">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#a8c7b8]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HomeHowItWorks;
