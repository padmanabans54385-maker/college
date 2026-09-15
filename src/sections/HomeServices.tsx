import { Link } from "react-router-dom";

const services = [
  ["TNEA Counselling", "/tnea"],
  ["Engineering College Selection", "/colleges"],
  ["College Comparison", "/compare"],
  ["Cut-off Analysis", "/tnea/cutoff"],
  ["Choice Filling Guidance", "/tnea/choice-list"],
  ["Course Selection", "/courses"],
  ["Scholarship Guidance", "/scholarships"],
  ["Admission Support", "/admissions"],
];

const HomeServices = () => (
  <section className="bg-slate-50 py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="font-heading text-3xl font-extrabold">Popular services</h2>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {services.map(([label, to]) => (
          <Link
            key={label}
            to={to}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-6 font-semibold hover:border-teal-300"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default HomeServices;
