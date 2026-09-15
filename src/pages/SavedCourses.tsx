import { Link } from "react-router-dom";

const SavedCourses = () => (
  <main className="mx-auto max-w-5xl px-4 py-12">
    <h1 className="font-heading text-3xl font-extrabold">Saved courses</h1>
    <p className="mt-3 text-slate-600">
      Browse published courses and save colleges that offer them from course detail pages.
    </p>
    <Link to="/courses" className="mt-6 inline-flex rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white">
      Explore courses
    </Link>
  </main>
);

export default SavedCourses;
