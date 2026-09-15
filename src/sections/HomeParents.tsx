import { Link } from "react-router-dom";

const topics = [
  "Fees",
  "Hostel",
  "Safety",
  "Location",
  "Placements",
  "Course selection",
  "College reputation",
  "Scholarship opportunities",
];

const HomeParents = () => (
  <section className="bg-slate-50 py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="font-heading text-3xl font-extrabold">
        Helping Parents Make Confident College Decisions
      </h2>
      <p className="mt-3 max-w-2xl text-slate-600">
        Clear, parent-friendly information so families can compare options without pressure or unrealistic promises.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {topics.map((topic) => (
          <span key={topic} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200">
            {topic}
          </span>
        ))}
      </div>
      <Link
        to="/counselling"
        className="mt-8 inline-flex rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white"
      >
        Talk to a Counsellor
      </Link>
    </div>
  </section>
);

export default HomeParents;
