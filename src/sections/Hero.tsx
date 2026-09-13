import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  GraduationCap,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const stats = [
  { label: "Accredited Colleges", value: "500+", icon: BookOpen, color: "text-indigo-600 bg-indigo-50 border-indigo-200" },
  { label: "Students Guided", value: "25,000+", icon: Users, color: "text-violet-600 bg-violet-50 border-violet-200" },
  { label: "Degree Courses", value: "120+", icon: GraduationCap, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  { label: "TNEA & AICTE Verified", value: "100%", icon: ShieldCheck, color: "text-amber-600 bg-amber-50 border-amber-200" },
];

const quickTags = [
  { label: "B.E / B.Tech", query: "Engineering" },
  { label: "MBBS / Allied", query: "Medical" },
  { label: "MBA & PGDM", query: "Management" },
  { label: "B.Sc Nursing", query: "Nursing" },
  { label: "B.Pharm", query: "Pharmacy" },
];

const Hero = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState("All Districts");

  const handleSearch = (overrideQuery?: string) => {
    const q = overrideQuery ?? search;
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (district !== "All Districts") params.set("district", district);
    navigate(`/colleges?${params.toString()}`);
  };

  return (
    <section id="home" className="relative overflow-hidden bg-slate-50 pt-8 pb-20 lg:pt-14 lg:pb-32 gradient-bg-hero">
      {/* Glow Blur Accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-indigo-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-emerald-500/10 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Header */}
        <div className="mx-auto max-w-4xl text-center">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white/90 px-4 py-2 text-xs font-semibold text-indigo-700 shadow-sm backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span>Tamil Nadu's Most Trusted College Admissions Platform</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-heading text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
          >
            Discover & Apply to Top <br className="hidden sm:inline" />
            <span className="gradient-text-indigo">Colleges in Tamil Nadu</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            Compare course cut-offs, campus facilities, placement packages, and scholarships. Get direct admission guidance with zero application hassle.
          </motion.p>

          {/* Interactive Search Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-10 max-w-3xl"
          >
            <div className="rounded-3xl border border-slate-200/90 bg-white/95 p-3 shadow-2xl shadow-indigo-950/10 backdrop-blur-xl">
              <div className="flex flex-col gap-2.5 sm:flex-row">
                
                {/* Search Input */}
                <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 border border-slate-200/60 px-4 py-3.5 transition-focus focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100">
                  <Search className="h-5 w-5 shrink-0 text-slate-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="Search engineering, medical, management colleges..."
                    className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none font-medium"
                  />
                </div>

                {/* District Select */}
                <div className="flex items-center gap-2.5 rounded-2xl bg-slate-50 border border-slate-200/60 px-3.5 py-3.5 sm:w-48">
                  <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-transparent text-xs font-semibold text-slate-700 outline-none cursor-pointer"
                  >
                    <option>All Districts</option>
                    <option>Chennai</option>
                    <option>Coimbatore</option>
                    <option>Madurai</option>
                    <option>Trichy</option>
                    <option>Salem</option>
                    <option>Namakkal</option>
                    <option>Tirunelveli</option>
                  </select>
                </div>

                {/* Search Button */}
                <button
                  onClick={() => handleSearch()}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:scale-[1.02] hover:shadow-indigo-600/40 active:scale-[0.98]"
                >
                  <Compass className="h-4 w-4" />
                  <span>Search</span>
                </button>
              </div>

              {/* Quick Tag Pills */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 border-t border-slate-100 pt-3">
                <span className="text-xs font-semibold text-slate-400">Popular Searches:</span>
                {quickTags.map((tag) => (
                  <button
                    key={tag.label}
                    onClick={() => handleSearch(tag.query)}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-col justify-center gap-3.5 sm:flex-row"
          >
            <Link
              to="/colleges"
              className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:scale-[1.02]"
            >
              <span>Browse 500+ Colleges</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/colleges"
              className="flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-indigo-300 hover:bg-slate-50"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Apply for Counselling</span>
            </Link>
          </motion.div>

        </div>

        {/* Floating Highlight Cards & Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group flex items-center gap-4 rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-heading text-2xl font-extrabold text-slate-900 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-slate-500">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;