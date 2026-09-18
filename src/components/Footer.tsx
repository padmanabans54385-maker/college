import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Sprout } from "lucide-react";
import { brand } from "../config/brand";
import { useSettings } from "../hooks/SettingsContext";

const Footer = () => {
  const { contact } = useSettings();

  return (
    <footer className="border-t border-[#cdddc9] bg-[#dce8da] text-[#142e23]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-heading text-xl font-bold tracking-tight text-[#143527]">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#143527] text-white">
                <Sprout className="h-5 w-5" />
              </span>
              <span>{brand.name}</span>
            </Link>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-[#465f51]">
              Independent college-admission guidance for Tamil Nadu students — cutoffs, TNEA cutoffs, predictor, choice-list builder and counselling in one place.
            </p>
          </div>

          {/* Explore Col */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[#143527]">EXPLORE</h4>
            <ul className="mt-4 space-y-2 text-xs font-medium">
              {[
                ["/colleges", "Colleges"],
                ["/courses", "Courses"],
                ["/scholarships", "Scholarships"],
                ["/tnea", "TNEA Hub"],
                ["/compare", "Compare colleges"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-[#465f51] hover:text-[#143527]">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* TNEA Hub Col */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[#143527]">TNEA HUB</h4>
            <ul className="mt-4 space-y-2 text-xs font-medium">
              {[
                ["/tnea/cutoff", "Cutoff explorer"],
                ["/tnea/predictor", "Admission predictor"],
                ["/tnea/choice-list", "Choice-list builder"],
                ["/faq", "FAQ"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-[#465f51] hover:text-[#143527]">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[#143527]">CONTACT</h4>
            <ul className="mt-4 space-y-2.5 text-xs text-[#465f51]">
              {contact.phone && (
                <li className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-[#143527]" />
                  <a href={`tel:${contact.phone}`} className="hover:text-[#143527]">{contact.phone}</a>
                </li>
              )}
              {contact.email && (
                <li className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-[#143527]" />
                  <a href={`mailto:${contact.email}`} className="hover:text-[#143527]">{contact.email}</a>
                </li>
              )}
              {contact.address && (
                <li className="flex items-start gap-2">
                  <MapPin className="h-3.5 w-3.5 text-[#143527] shrink-0 mt-0.5" />
                  <span>{contact.address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-12 border-t border-[#cdddc9] pt-6 text-[11px] text-[#577063]">
          <p className="text-center sm:text-left">
            Independent guidance platform — not affiliated with OTE / TNEA. TNEA, TNEA cutoffs and predicted data is indicative; always confirm on the official TNEA portal.
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-between">
            <p>© {brand.year} {brand.name}. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
              <Link to="/terms" className="hover:underline">Terms of Service</Link>
              <Link to="/about" className="hover:underline">About</Link>
              <Link to="/contact" className="hover:underline">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
