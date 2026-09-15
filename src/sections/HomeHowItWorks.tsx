const steps = [
  "Enter Your Details",
  "Explore Suitable Colleges",
  "Compare Your Options",
  "Create Your Choice List",
  "Get Expert Guidance",
];

const HomeHowItWorks = () => (
  <section className="bg-white py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="font-heading text-3xl font-extrabold text-slate-900">How it works</h2>
      <ol className="mt-8 grid gap-4 md:grid-cols-5">
        {steps.map((step, index) => (
          <li key={step} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-teal-700">Step {index + 1}</p>
            <p className="mt-2 font-semibold text-slate-900">{step}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default HomeHowItWorks;
