import { Link } from "react-router-dom";

const cities = [
  "Chennai",
  "Coimbatore",
  "Madurai",
  "Trichy",
  "Salem",
  "Tirunelveli",
  "Erode",
  "Vellore",
  "Thanjavur",
  "Hosur",
];

const HomeLocations = () => (
  <section className="bg-slate-50 py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="font-heading text-3xl font-extrabold">Popular locations</h2>
      <div className="mt-6 flex flex-wrap gap-2">
        {cities.map((city) => (
          <Link
            key={city}
            to={`/colleges?district=${encodeURIComponent(city)}`}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:border-teal-400"
          >
            {city}
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default HomeLocations;
