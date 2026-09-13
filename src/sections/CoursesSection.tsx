import { motion } from "framer-motion";
import type { ElementType } from "react";
import {
  ArrowUpRight,
  Atom,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Gavel,
  GraduationCap,
  HeartPulse,
  Leaf,
  Microscope,
  Pill,
  Sparkles,
  Stethoscope,
  Syringe,
  Waves,
} from "lucide-react";
import { Link } from "react-router-dom";

type CourseCategoryItem = {
  title: string;
  description: string;
  icon: ElementType;
  query: string;
};

const categories: CourseCategoryItem[] = [
  {
    title: "Engineering & Tech",
    description: "B.E / B.Tech across Computer Science, AI, Robotics, ECE, Mechanical.",
    icon: Building2,
    query: "Engineering",
  },
  {
    title: "Pharmacy",
    description: "B.Pharm, Pharm.D and Pharmaceutical Research Sciences.",
    icon: Pill,
    query: "Pharmacy",
  },
  {
    title: "Nursing & Midwifery",
    description: "B.Sc Nursing, Post Basic Nursing and specialized hospital care.",
    icon: Syringe,
    query: "Nursing",
  },
  {
    title: "Allied Health Sciences",
    description: "Radiology, Cardiac Tech, Dialysis, Lab Technology & Anesthesia.",
    icon: HeartPulse,
    query: "Allied Health Sciences",
  },
  {
    title: "Medical Sciences",
    description: "MBBS, BDS, AYUSH & Clinical Medicine Specializations.",
    icon: Microscope,
    query: "Medicine",
  },
  {
    title: "Physiotherapy",
    description: "BPT, Occupational Therapy & Rehabilitation Sciences.",
    icon: Stethoscope,
    query: "Therapy",
  },
  {
    title: "Agriculture & Food",
    description: "B.Sc Agriculture, Horticulture, Food Tech & Agricultural Engineering.",
    icon: Leaf,
    query: "Agriculture",
  },
  {
    title: "Veterinary Sciences",
    description: "B.V.Sc & Animal Husbandry and Livestock Management.",
    icon: Atom,
    query: "Veterinary",
  },
  {
    title: "Marine & Fisheries",
    description: "B.F.Sc Fisheries Science & Nautical Marine Engineering.",
    icon: Waves,
    query: "Fisheries",
  },
  {
    title: "Arts, Science & Commerce",
    description: "B.Sc, B.A, B.Com, Data Analytics, Economics & Digital Media.",
    icon: BookOpen,
    query: "Arts & Science",
  },
  {
    title: "Education & B.Ed",
    description: "Teacher training, Educational Leadership & Pedagogy.",
    icon: GraduationCap,
    query: "Education",
  },
  {
    title: "Law & Legal Studies",
    description: "BA LL.B, BBA LL.B & Corporate Legal Practice.",
    icon: Gavel,
    query: "Law",
  },
  {
    title: "MBA & Management",
    description: "BBA, MBA, Financial Management, Marketing & HR Tech.",
    icon: BriefcaseBusiness,
    query: "Management",
  },
];

const CoursesSection = () => {
  return (
    <section id="courses" className="relative bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700 border border-indigo-200/60">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
              Academic Disciplines
            </div>

            <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Find the Right Discipline <br className="hidden sm:inline" />
              <span className="gradient-text-indigo">For Your Career Goals</span>
            </h2>

            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Browse top degree programs across accredited universities and colleges in Tamil Nadu. Filter by placement record and accreditation.
            </p>
          </div>

          <Link
            to="/colleges"
            className="group flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
          >
            <span>View All Degree Programs</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.03 }}
              >
                <Link
                  to={`/colleges?q=${encodeURIComponent(cat.query)}`}
                  className="group relative flex h-full flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-heading text-xs font-bold text-slate-300 group-hover:text-indigo-400">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="mt-5 font-heading text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {cat.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-slate-500">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Explore Colleges</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CoursesSection;