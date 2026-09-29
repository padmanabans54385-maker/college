import { Link } from "react-router-dom";
import {
  GraduationCap,
  Mail,
  MapPin,
  PhoneCall,
  Send,
  CheckCircle2,
} from "lucide-react";
import { brand } from "../config/brand";

const Footer = () => {
  return (
    <footer className="bg-[#075B63] text-white border-t border-[#05434A]">
      {/* Top CTA Banner */}
      <div className="border-b border-[#0A6D77] bg-[#05434A]/60 py-10 px-4">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 sm:px-6 lg:px-8">
          <div className="text-center md:text-left">
            <h3 className="font-merriweather text-xl sm:text-2xl font-bold text-white">
              Ready to Elevate Your Academic Journey?
            </h3>
            <p className="mt-1 font-poppins text-sm text-[#BBE1F5]">
              Get personalized college recommendations and expert career counseling today.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/colleges"
              className="btn-primary bg-[#168FD0] hover:bg-[#127CB8] text-white font-poppins text-sm px-6 py-3 rounded-lg shadow-md flex items-center gap-2"
            >
              <GraduationCap size={18} />
              Explore Top Colleges
            </Link>
            <Link
              to="/counselling"
              className="bg-transparent text-white border border-[#4DB3E8] hover:bg-[#168FD0]/20 font-poppins font-medium text-sm px-5 py-3 rounded-lg transition-all flex items-center gap-2"
            >
              Book 1‑on‑1 Session
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Sections */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="bg-white p-3 rounded-xl inline-block shadow-sm mb-4">
              <img
                src={brand.logoSrc}
                alt="Go2College - Your Future, Elevated"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="font-poppins text-xs leading-relaxed text-[#D2E3EA] max-w-sm">
              Go2College is your premier higher‑education companion. We empower students with independent university discovery, course selection, cutoff analytics, and personalized guidance to navigate admissions confidently.
            </p>

            <div className="mt-6">
              <h5 className="font-poppins text-xs font-semibold uppercase tracking-wider text-[#4DB3E8] mb-3">
                Subscribe for College Updates
              </h5>
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-[#05434A] border border-[#0A6D77] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-[#94BCCB] focus:border-[#4DB3E8]"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#168FD0] hover:bg-[#4DB3E8] text-white p-2.5 rounded-lg transition-colors shrink-0"
                  aria-label="Subscribe"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-merriweather text-sm font-bold text-white tracking-wide border-b border-[#0A6D77] pb-2">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs font-poppins text-[#D2E3EA]">
              {[
                ["/", "Home"],
                ["/about", "About Us"],
                ["/colleges", "Explore Colleges"],
                ["/courses", "Academic Courses"],
                ["/counselling", "Student Services"],
                ["/contact", "Contact Guidance Team"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-[#4DB3E8] transition-colors inline-flex items-center gap-1.5">
                    <span className="text-[#168FD0]">›</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Programs */}
          <div>
            <h4 className="font-merriweather text-sm font-bold text-white tracking-wide border-b border-[#0A6D77] pb-2">
              Popular Programs
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs font-poppins text-[#D2E3EA]">
              {[
                ["/courses?cat=cs", "Computer Science & AI"],
                ["/courses?cat=business", "Business & Management"],
                ["/courses?cat=eng", "Engineering & Robotics"],
                ["/courses?cat=med", "Medicine & Healthcare"],
                ["/courses?cat=design", "Design & Digital Media"],
                ["/courses?cat=law", "Law & Public Policy"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-[#4DB3E8] transition-colors inline-flex items-center gap-1.5">
                    <span className="text-[#168FD0]">›</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-merriweather text-sm font-bold text-white tracking-wide border-b border-[#0A6D77] pb-2">
              Student Desk
            </h4>
            <ul className="mt-4 space-y-3 text-xs font-poppins text-[#D2E3EA]">
              <li className="flex items-start gap-2.5">
                <PhoneCall className="h-4 w-4 text-[#4DB3E8] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Toll‑Free Helpline</div>
                  <a href="tel:1800572892" className="hover:text-[#4DB3E8]">
                    +1 (800) 572‑8920
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 text-[#4DB3E8] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Admissions Desk</div>
                  <a href="mailto:admissions@go2college.edu" className="hover:text-[#4DB3E8]">
                    admissions@go2college.edu
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#4DB3E8] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Headquarters</div>
                  <span>Academic Park, Tech Boulevard, Suite 500</span>
                </div>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#linkedin"
                className="h-8 w-8 rounded-full bg-[#05434A] border border-[#0A6D77] flex items-center justify-center text-[#D2E3EA] hover:bg-[#168FD0] hover:text-white transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.47 1.47 0 1 0 0 2.94 1.47 1.47 0 0 0 0-2.94Z" />
                </svg>
              </a>
              <a
                href="#twitter"
                className="h-8 w-8 rounded-full bg-[#05434A] border border-[#0A6D77] flex items-center justify-center text-[#D2E3EA] hover:bg-[#168FD0] hover:text-white transition-all"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#facebook"
                className="h-8 w-8 rounded-full bg-[#05434A] border border-[#0A6D77] flex items-center justify-center text-[#D2E3EA] hover:bg-[#168FD0] hover:text-white transition-all"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.5 13.8 5.5c1.1 0 2.25.2 2.25.2v2.47h-1.27c-1.23 0-1.61.77-1.61 1.56V12h2.78l-.44 3h-2.34v6.8c4.56-.93 8-4.96 8-9.8z" />
                </svg>
              </a>
              <a
                href="#instagram"
                className="h-8 w-8 rounded-full bg-[#05434A] border border-[#0A6D77] flex items-center justify-center text-[#D2E3EA] hover:bg-[#168FD0] hover:text-white transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#youtube"
                className="h-8 w-8 rounded-full bg-[#05434A] border border-[#0A6D77] flex items-center justify-center text-[#D2E3EA] hover:bg-[#168FD0] hover:text-white transition-all"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Value Badges */}
        <div className="mt-12 pt-8 border-t border-[#0A6D77] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-poppins text-[#D2E3EA]">
            <CheckCircle2 className="h-4 w-4 text-[#4DB3E8]" />
            <span>100% Independent Guidance</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-poppins text-[#D2E3EA]">
            <CheckCircle2 className="h-4 w-4 text-[#4DB3E8]" />
            <span>Verified Cutoff Records</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-poppins text-[#D2E3EA]">
            <CheckCircle2 className="h-4 w-4 text-[#4DB3E8]" />
            <span>1000+ Top Accredited Institutions</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-poppins text-[#D2E3EA]">
            <CheckCircle2 className="h-4 w-4 text-[#4DB3E8]" />
            <span>1‑on‑1 Academic Counseling</span>
          </div>
        </div>

        {/* Bottom Legal */}
        <div className="mt-10 pt-6 border-t border-[#0A6D77]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-poppins text-[#94BCCB]">
          <p>© {brand.year} {brand.name} — Your Future, Elevated. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-[#4DB3E8]">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#4DB3E8]">Terms of Service</Link>
            <Link to="/faq" className="hover:text-[#4DB3E8]">Student FAQ</Link>
            <Link to="/contact" className="hover:text-[#4DB3E8]">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
