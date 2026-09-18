import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Calculator, Award, ShieldCheck } from "lucide-react";
import { brand } from "../config/brand";

const stats = [
  { value: "8+", label: "COLLEGES PROFILES", icon: Building2 },
  { value: "380+", label: "CUTOFF RECORDS", icon: Calculator },
  { value: "5+", label: "SCHOLARSHIPS TRACKED", icon: Award },
  { value: "100%", label: "FREE COUNSELLING", icon: ShieldCheck },
];

const Hero = () => {
  return (
    <section className="bg-[#dce8da] pt-10 lg:pt-16 pb-12 overflow-hidden border-b border-[#cdddc9]/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#143527]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#143527]" />
              {brand.tagline}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 font-heading text-4xl font-extrabold tracking-tight text-[#142e23] sm:text-6xl sm:leading-[1.1]"
            >
              Your seat in <br className="hidden sm:inline" />
              Tamil Nadu's <span className="font-serif-italic font-normal italic text-[#143527]">best</span> <br className="hidden sm:inline" />
              engineering colleges.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-xl text-base text-[#465f51] sm:text-lg sm:leading-relaxed"
            >
              {brand.heroSubheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <Link
                to="/colleges"
                className="inline-flex items-center gap-2 rounded-full bg-[#143527] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5 hover:bg-[#0b2017]"
              >
                <span>Explore colleges</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/tnea/predictor"
                className="inline-flex items-center rounded-full border border-[#143527] bg-transparent px-6 py-3.5 text-sm font-semibold text-[#143527] transition-all hover:bg-[#143527]/10"
              >
                Predict my admission
              </Link>
            </motion.div>
          </div>

          {/* Right Hero Visual / Campus Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className="relative lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-3xl border border-[#cdddc9] bg-white p-2 shadow-lg">
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-[#143527]/10">
                <img
                  src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000"
                  alt="Engineering Campus"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <span className="rounded-full bg-black/50 backdrop-blur-md px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                    01 — ENGINEERING CAMPUS, CHENNAI
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stat Strip Bar */}
        <div className="mt-14 rounded-2xl border border-[#cdddc9] bg-[#e6f0e4]/80 p-5 shadow-xs backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:divide-x sm:divide-[#cdddc9]">
            {stats.map((stat, idx) => (
              <div key={idx} className={`${idx !== 0 ? "sm:pl-6" : ""} flex flex-col`}>
                <span className="font-heading text-3xl font-extrabold text-[#143527] sm:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-1 text-xs font-bold uppercase tracking-wider text-[#465f51]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
