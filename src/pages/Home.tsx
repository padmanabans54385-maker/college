import Hero from "../sections/Hero";
import HomeQuickActions from "../sections/HomeQuickActions";
import HomeHowItWorks from "../sections/HomeHowItWorks";
import HomeServices from "../sections/HomeServices";
import HomeWhyChoose from "../sections/HomeWhyChoose";
import CoursesSection from "../sections/CoursesSection";
import HomeLocations from "../sections/HomeLocations";
import HomeUpdates from "../sections/HomeUpdates";
import HomeParents from "../sections/HomeParents";
import HomeTrust from "../sections/HomeTrust";
import AdmissionSteps from "../sections/AdmissionSteps";
import CollegeCTA from "../sections/CollegeCTA";
import Testimonials from "../sections/Testimonials";
import { Seo } from "../components/Seo";
import { brand } from "../config/brand";
import { ScrollReveal } from "../components/ScrollReveal";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
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
        <ScrollReveal><HomeWhyChoose /></ScrollReveal>
        <ScrollReveal><CoursesSection /></ScrollReveal>
        <ScrollReveal><HomeLocations /></ScrollReveal>
        <ScrollReveal><HomeUpdates /></ScrollReveal>
        <ScrollReveal><HomeParents /></ScrollReveal>
        <ScrollReveal><HomeTrust /></ScrollReveal>
        <ScrollReveal><AdmissionSteps /></ScrollReveal>
        <ScrollReveal><CollegeCTA /></ScrollReveal>
        <ScrollReveal><Testimonials /></ScrollReveal>
      </main>
    </div>
  );
};

export default Home;
