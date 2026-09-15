import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { WhatsAppFab } from "../components/WhatsAppButton";
import { PageTransition } from "../components/PageTransition";

const PublicLayout = () => (
  <div className="min-h-screen bg-slate-50">
    <Navbar />
    <PageTransition><Outlet /></PageTransition>
    <Footer />
    <WhatsAppFab />
  </div>
);

export default PublicLayout;
