import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { brand } from "../config/brand";
import {
  AwardIcon,
  CalculatorIcon,
  GraduationCapIcon,
  GrowthArrowIcon,
  UniversityIcon,
} from "../components/icons/AcademicIcons";

const stats = [
  { value: "8+", label: "College profiles", icon: UniversityIcon },
  { value: "380+", label: "Cutoff records", icon: CalculatorIcon },
  { value: "5+", label: "Scholarships tracked", icon: AwardIcon },
  { value: "100%", label: "Free counselling", icon: GraduationCapIcon },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden border-b border-[#E2ECF3] bg-white pt-10 lg:pt-16 pb-12">
      <div className="hero-accent-shape pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="academic-badge"
            >
              <GrowthArrowIcon size={14} className="text-[#168FD0]" />
              {brand.tagline}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="mt-6 font-heading text-4xl font-bold tracking-tight text-[#075B63] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.2]"
            >
              {brand.heroHeadline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="mt-6 max-w-xl font-poppins text-base text-[#5A6E78] sm:text-lg sm:leading-relaxed"
            >
              {brand.heroSubheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Link to="/colleges" className="btn-primary w-full sm:w-auto">
                Explore Colleges
                <GrowthArrowIcon size={16} />
              </Link>
              <Link to="/tnea/predictor" className="btn-secondary w-full sm:w-auto">
                Predict my admission
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative lg:col-span-6"
          >
            <div className="grid gap-4 sm:grid-cols-12">
              <div className="academic-card overflow-hidden sm:col-span-7">
                <div className="aspect-4/3 overflow-hidden bg-[#F0F8FD]">
                  <img
                    src={brand.images.students}
                    alt="Students collaborating on education and career planning"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 sm:col-span-5">
                <div className="academic-card overflow-hidden bg-[#F5F9FC] p-3">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={brand.images.capBooks}
                      alt="Graduation cap on academic books"
                      className="h-full w-full object-contain object-center"
                    />
                  </div>
                </div>
                <div className="academic-card flex flex-1 items-center gap-3 p-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#168FD0] text-white">
                    <UniversityIcon size={20} />
                  </span>
                  <div>
                    <p className="font-poppins text-xs font-semibold uppercase tracking-wide text-[#168FD0]">
                      Campus ready
                    </p>
                    <p className="font-poppins text-sm font-medium text-[#172B35]">
                      Discover institutions that fit your future
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 rounded-2xl border border-[#E2ECF3] bg-[#F5F9FC] p-5 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <stat.icon size={20} className="text-[#168FD0]" />
              <span className="mt-2 font-heading text-2xl font-bold text-[#075B63] sm:text-3xl">
                {stat.value}
              </span>
              <span className="mt-1 font-poppins text-[11px] font-semibold uppercase tracking-wider text-[#5A6E78]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
