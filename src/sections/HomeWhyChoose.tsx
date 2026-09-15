const reasons = [
  ["Personalized Guidance", "Recommendations based on your academic profile and preferences."],
  ["Data-Driven Decisions", "Compare colleges using cut-off, fees, courses, placements and other relevant information."],
  ["Student First", "Designed to simplify confusing admission decisions."],
  ["Parent Friendly", "Clear information that helps students and parents make informed choices."],
  ["Transparent Information", "Present available information clearly and distinguish estimates from official data."],
];

const HomeWhyChoose = () => (
  <section className="bg-white py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="font-heading text-3xl font-extrabold">Why choose us</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reasons.map(([title, body]) => (
          <article key={title} className="rounded-3xl border border-slate-200 p-6">
            <h3 className="font-heading text-lg font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default HomeWhyChoose;
