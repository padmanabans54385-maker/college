import Hero from "../sections/Hero";
import HomeQuickActions from "../sections/HomeQuickActions";
import HomeHowItWorks from "../sections/HomeHowItWorks";
import HomeServices from "../sections/HomeServices";
import CoursesSection from "../sections/CoursesSection";
import HomeUpdates from "../sections/HomeUpdates";
import HomeParents from "../sections/HomeParents";
import Testimonials from "../sections/Testimonials";
import CollegeCTA from "../sections/CollegeCTA";
import { Seo } from "../components/Seo";
import { brand } from "../config/brand";
import { ScrollReveal } from "../components/ScrollReveal";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#edf4ec]">
      <Seo
        title={brand.heroHeadline}
        description={brand.heroSubheadline}
        path="/"
      />
      <main>
        <Hero />
        <ScrollReveal><HomeQuickActions /></ScrollReveal>
        <ScrollReveal><HomeHowItWorks /></ScrollReveal>
        <ScrollReveal><HomeServices /></ScrollReveal>
        <ScrollReveal><CoursesSection /></ScrollReveal>
        <ScrollReveal><HomeUpdates /></ScrollReveal>
        <ScrollReveal><HomeParents /></ScrollReveal>
        <ScrollReveal><Testimonials /></ScrollReveal>
        <ScrollReveal><CollegeCTA /></ScrollReveal>
      </main>
    </div>
  );
};

export default Home;
