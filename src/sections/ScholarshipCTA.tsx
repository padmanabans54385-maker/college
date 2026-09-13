import {
  ArrowRight,
  GraduationCap,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";

const ScholarshipCTA = () => {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2rem] bg-gray-100 p-8 md:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold">
                <Sparkles size={16} />
                Financial Support
              </div>

              <h2 className="mt-6 max-w-2xl text-4xl font-black tracking-tight text-gray-950 md:text-5xl">
                Don't let fees stop your education.
              </h2>

              <p className="mt-5 max-w-xl text-lg leading-8 text-gray-600">
                Discover scholarships and financial
                assistance opportunities that can help
                make your education more affordable.
              </p>

              <Link
                to="/scholarships"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 font-semibold text-white"
              >
                Explore Scholarships
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="flex justify-center">
              <div className="flex h-48 w-48 items-center justify-center rounded-full bg-black text-white md:h-64 md:w-64">
                <GraduationCap
                  size={80}
                  strokeWidth={1.3}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScholarshipCTA;