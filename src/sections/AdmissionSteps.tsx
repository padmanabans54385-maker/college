import { motion } from "framer-motion";
import type { ElementType } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Search,
  Sparkles,
  UserRoundPlus,
} from "lucide-react";
import { Link } from "react-router-dom";

type Step = {
  number: string;
  title: string;
  description: string;
  icon: ElementType;
  gradient: string;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Search & Shortlist",
    description:
      "Explore 500+ colleges and accredited degree programs based on your cut-offs, location, and career goals.",
    icon: Search,
    gradient: "from-blue-600 to-indigo-600",
  },
  {
    number: "02",
    title: "Free Profile Creation",
    description:
      "Create your student portal profile in 2 minutes and bookmark your target institutions.",
    icon: UserRoundPlus,
    gradient: "from-indigo-600 to-violet-600",
  },
  {
    number: "03",
    title: "Direct Online Application",
    description:
      "Fill a single streamlined application form for multiple top colleges with automated document verification.",
    icon: ClipboardList,
    gradient: "from-violet-600 to-purple-600",
  },
  {
    number: "04",
    title: "Admission Confirmation",
    description:
      "Track your application status in real-time and secure your seat with expert counselling support.",
    icon: CheckCircle2,
    gradient: "from-purple-600 to-emerald-600",
  },
];

const AdmissionSteps = () => {
  return (
    <section id="admission" className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700 border border-indigo-200/60"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            Seamless 4-Step Process
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl"
          >
            Your Admission Journey, <span className="gradient-text-indigo">Simplified</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            Say goodbye to complex paperwork and multiple college visits. We streamline your entire admission workflow.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 shadow-lg shadow-slate-900/5 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-300 hover:shadow-2xl hover:shadow-indigo-500/10"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr ${step.gradient} text-white shadow-md shadow-indigo-500/20 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="font-heading text-3xl font-black text-slate-200 group-hover:text-indigo-200 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-6 font-heading text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {step.title}
                  </h3>

                  <p className="mt-2.5 text-xs leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
                  <span>Step {step.number}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/colleges"
            className="inline-flex items-center gap-2.5 rounded-full bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white shadow-xl hover:bg-indigo-600 transition hover:scale-105"
          >
            <span>Start Your Admission Application</span>
            <ArrowRight className="h-4 w-4 text-indigo-400" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default AdmissionSteps;