import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer id="contact" className="relative overflow-hidden bg-slate-950 text-slate-300">
      {/* Background radial highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-full max-w-7xl bg-indigo-600/10 blur-[120px] pointer-events-none" />

      {/* Newsletter Banner */}
      <div className="relative border-b border-slate-800/80 bg-slate-900/50 py-12 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-950 p-8 shadow-2xl lg:flex-row">
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-400 border border-indigo-500/20 mb-3">
                <Sparkles className="h-3.5 w-3.5" />
                Stay Ahead in Admission Updates
              </div>
              <h3 className="font-heading text-2xl font-bold text-white tracking-tight">
                Subscribe to TNEA Admission Alerts & Deadlines
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Get notified about upcoming cut-offs, TNEA counselling dates, and exclusive scholarships across Tamil Nadu colleges.
              </p>
            </div>

            {subscribed ? (
              <div className="flex items-center gap-2 rounded-2xl bg-emerald-500/10 px-6 py-4 border border-emerald-500/20 text-emerald-400 font-semibold text-sm">
                <CheckCircle2 className="h-5 w-5" />
                Thank you! You're subscribed to admission updates.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex w-full max-w-md items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="shrink-0 flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500"
                >
                  Subscribe
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-500/30">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div className="flex items-center gap-1.5 font-heading text-xl font-bold text-white tracking-tight">
                <span className="rounded-lg bg-indigo-600 px-2 py-0.5 text-white text-xs font-black">TNEA</span>
                <span>Find Your Right College</span>
              </div>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Tamil Nadu's premier education portal empowering thousands of students to discover top accredited colleges, compare courses, and apply with zero hassle.
            </p>

            <div className="mt-6 flex items-center gap-3 text-xs font-semibold text-slate-400">
              <div className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Verified Colleges
              </div>
              <div className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5">
                <CheckCircle2 className="h-4 w-4 text-indigo-400" />
                TNEA & AICTE Info
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link to="/" className="text-slate-400 transition hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/colleges" className="text-slate-400 transition hover:text-white">Explore Colleges</Link>
              </li>
              <li>
                <Link to="/scholarships" className="text-slate-400 transition hover:text-white">Scholarships</Link>
              </li>
              <li>
                <Link to="/online-courses" className="text-slate-400 transition hover:text-white">Online Courses</Link>
              </li>
              <li>
                <Link to="/login" className="text-slate-400 transition hover:text-white">Student Login</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Top Disciplines
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              {["Engineering (B.E/B.Tech)", "Medicine (MBBS/BDS)", "Pharmacy & Nursing", "MBA & Management", "Arts & Science"].map((item) => (
                <li key={item}>
                  <Link to="/colleges" className="text-slate-400 transition hover:text-white">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Helpline & Contact
            </h4>
            <ul className="mt-4 space-y-3.5 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-white">Admission Helpline</div>
                  <a href="tel:+919894502366" className="block hover:text-indigo-400 transition">+91 98945 02366</a>
                  <a href="tel:+919944103330" className="block hover:text-indigo-400 transition">+91 99441 03330</a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-indigo-400 shrink-0" />
                <a href="mailto:info@tnea-findyourcollege.com" className="hover:text-white">info@tnea-findyourcollege.com</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>Chennai & Coimbatore Hubs, Tamil Nadu, India</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>© 2026 TNEA - Find Your Right College. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Student Code of Conduct</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;