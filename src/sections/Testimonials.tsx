import { motion } from "framer-motion";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Sparkles,
  Star,
} from "lucide-react";

const testimonials = [
  {
    name: "Ananya R",
    role: "B.E Computer Science",
    location: "Chennai Hub",
    message:
      "CollegeCrop made it effortless to compare cut-offs across top engineering colleges in Chennai. I applied online and secured my dream branch within a week!",
    initials: "AR",
    color: "from-indigo-600 to-violet-600",
  },
  {
    name: "Rahul K",
    role: "MBA Management",
    location: "Coimbatore Hub",
    message:
      "The scholarship assistance and transparent course fee structures helped me make a confident decision for my management degree. Highly recommended portal!",
    initials: "RK",
    color: "from-emerald-600 to-teal-600",
  },
  {
    name: "Priya S",
    role: "B.Sc Nursing",
    location: "Madurai Hub",
    message:
      "I was confused about allied health sciences vs nursing. The detailed college profile guides and direct counsellor connect answered all my questions.",
    initials: "PS",
    color: "from-purple-600 to-pink-600",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section id="testimonials" className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700 border border-indigo-200/60">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
              Verified Student Reviews
            </div>

            <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Real Stories from <span className="gradient-text-indigo">Successful Applicants</span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-2">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, index) => {
            const isActive = index === current;

            return (
              <motion.article
                key={t.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => setCurrent(index)}
                className={`relative cursor-pointer rounded-3xl border p-8 transition-all duration-300 ${
                  isActive
                    ? "border-indigo-300 bg-white shadow-2xl shadow-indigo-500/10 scale-[1.02]"
                    : "border-slate-200/80 bg-white/70 hover:border-slate-300 hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr ${t.color} text-white shadow-md`}>
                    <Quote size={20} />
                  </div>

                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-current" />
                    ))}
                  </div>
                </div>

                <p className="mt-6 text-sm leading-relaxed text-slate-600 italic">
                  "{t.message}"
                </p>

                <div className="mt-8 flex items-center gap-3.5 border-t border-slate-100 pt-6">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr ${t.color} font-heading text-sm font-extrabold text-white shadow-sm`}>
                    {t.initials}
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-slate-900">
                      {t.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {t.role} • <span className="text-indigo-600 font-medium">{t.location}</span>
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;