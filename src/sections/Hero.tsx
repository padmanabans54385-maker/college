import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { brand } from "../config/brand";
import { SearchBar } from "../components/SearchBar";
import { useAuth } from "../hooks/AuthContext";
import { useLanguage } from "../hooks/LanguageContext";

const Hero = () => {
  const { user, profile } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [district, setDistrict] = useState("");

  return (
    <section className="hero-surface relative overflow-hidden pb-16 pt-12 lg:pb-28 lg:pt-20">
      <div className="absolute inset-x-0 top-0 h-72 bg-teal-500/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {user && profile?.name && (
            <p className="mb-4 text-sm font-semibold text-teal-800">
              Welcome back, {profile.name}. Based on your preferences, explore colleges that may fit.
            </p>
          )}
          {user && !profile?.preferredCourse && (
            <p className="mb-4 text-sm text-slate-600">
              Tell us what you are looking for.{" "}
              <Link to="/profile" className="font-semibold text-teal-700">
                Create my profile
              </Link>
            </p>
          )}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700"
          >
            {brand.tagline}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl"
          >
            {brand.heroHeadline}
          </motion.h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">{brand.heroSubheadline}</p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/colleges"
            className="button-primary"
            >
              {t.cta.findCollege}
            </Link>
            <Link
              to="/counselling"
            className="button-secondary"
            >
              {t.cta.getCounselling}
            </Link>
          </div>

          <div className="mx-auto mt-8 max-w-2xl text-left">
            <SearchBar size="lg" />
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <select
                value={district}
                onChange={(event) => {
                  setDistrict(event.target.value);
                  if (event.target.value) {
                    navigate(`/colleges?district=${encodeURIComponent(event.target.value)}`);
                  }
                }}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs"
              >
                <option value="">All districts</option>
                {["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem"].map((city) => (
                  <option key={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
