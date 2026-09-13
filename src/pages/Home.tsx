import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Hero from "../sections/Hero";
import CoursesSection from "../sections/CoursesSection";
import AdmissionSteps from "../sections/AdmissionSteps";
import CollegeCTA from "../sections/CollegeCTA";
import OnlineCourses from "../sections/OnlineCourses";
import Testimonials from "../sections/Testimonials";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <Hero />
        <CoursesSection />
        <AdmissionSteps />
        <CollegeCTA />
        <OnlineCourses />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
};

export default Home;