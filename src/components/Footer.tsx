import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { brand } from "../config/brand";
import { useSettings } from "../hooks/SettingsContext";
import { createLead } from "../services/leadService";

const Footer = () => {
  const { contact } = useSettings();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (event: FormEvent) => {
    event.preventDefault();
    if (!email) return;
    try {
      await createLead({
        name: "Newsletter",
        phone: "",
        email,
        source: "footer-newsletter",
        interest: "Admission updates",
      });
    } catch (error) {
      console.error(error);
    }
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <img src={brand.logoSrc} alt={brand.name} className="h-16 w-auto rounded-xl bg-white p-2" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              {brand.supportingTagline} {brand.description}
            </p>
            <form onSubmit={handleSubscribe} className="mt-6 flex max-w-md gap-2">
              {subscribed ? (
                <p className="text-sm text-emerald-400">You are subscribed to admission alerts.</p>
              ) : (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    placeholder="Email for admission alerts"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white placeholder:text-slate-500"
                  />
                  <button type="submit" className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-teal-500">
                    Subscribe
                  </button>
                </>
              )}
            </form>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                ["/", "Home"],
                ["/colleges", "Colleges"],
                ["/courses", "Courses"],
                ["/tnea", "TNEA 2026"],
                ["/compare", "Compare"],
                ["/scholarships", "Scholarships"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-teal-300">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">Guidance</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                ["/tnea/predictor", "College predictor"],
                ["/tnea/choice-list", "Choice list"],
                ["/counselling", "Counselling"],
                ["/admissions", "Admissions"],
                ["/fees", "Fees"],
                ["/placements", "Placements"],
                ["/blog", "Blog"],
                ["/faq", "FAQ"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-teal-300">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm">
              {contact.phone && (
                <li className="flex gap-2">
                  <Phone className="h-4 w-4 text-teal-400" />
                  <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                </li>
              )}
              {contact.email && (
                <li className="flex gap-2">
                  <Mail className="h-4 w-4 text-teal-400" />
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </li>
              )}
              {contact.address && (
                <li className="flex gap-2">
                  <MapPin className="h-4 w-4 text-teal-400" />
                  <span>{contact.address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:justify-between">
          <p>
            © {brand.year} {brand.name}. {brand.tagline}.
          </p>
          <div className="flex gap-5">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
