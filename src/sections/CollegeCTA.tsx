import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Search,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const benefits = [
  "Verified AICTE & NAAC accredited college listings",
  "Transparent cut-off trends & fee breakdowns",
  "Direct online admission application with counselling support",
];

const CollegeCTA = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      navigate(`/colleges?q=${encodeURIComponent(query)}`);
    } else {
      navigate("/colleges");
    }
  };

  return (
    <section id="colleges" className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-slate-950 p-8 sm:p-12 lg:p-16 shadow-2xl"
        >
          {/* Radial Highlights */}
          <div className="absolute top-0 right-0 h-96 w-96 bg-indigo-600/20 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 h-80 w-80 bg-emerald-500/15 blur-[100px] pointer-events-none" />

          <div className="relative grid gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>ACCELERATED ADMISSIONS 2026</span>
              </div>

              <h2 className="mt-6 font-heading text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Your Dream College is <br className="hidden sm:inline" />
                <span className="text-indigo-400">Closer Than You Think.</span>
              </h2>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
                Stop jumping between dozens of college websites. Explore accredited Tamil Nadu colleges, compare courses side by side, and apply with confidence.
              </p>

              {/* Benefits */}
              <div className="mt-8 space-y-3.5">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                    <span className="text-sm font-medium text-slate-300">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="mt-10 flex flex-col gap-3.5 sm:flex-row">
                <Link
                  to="/colleges"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500"
                >
                  <span>Explore Colleges Directory</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/colleges"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-900 px-8 py-4 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
                >
                  <Compass className="h-4 w-4 text-indigo-400" />
                  <span>Enquire Admission</span>
                </Link>
              </div>
            </div>

            {/* Right Search Box */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md">
                    <Search className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white">Instant College Search</h3>
                    <p className="text-xs text-slate-400">Search by name, district, or stream</p>
                  </div>
                </div>

                <form onSubmit={handleSearch} className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3.5">
                    <Search className="h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="e.g. SRM, PSG Tech, Engineering"
                      className="w-full bg-transparent text-sm text-white placeholder-slate-500 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
                  >
                    Search Opportunities
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>

                <div className="mt-6 border-t border-slate-800/80 pt-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Top Tamil Nadu Hubs
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem"].map((district) => (
                      <Link
                        key={district}
                        to={`/colleges?district=${district}`}
                        className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-400 transition hover:border-indigo-500/50 hover:text-white"
                      >
                        {district}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CollegeCTA;