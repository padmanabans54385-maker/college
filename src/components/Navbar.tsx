import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Phone,
  User,
  X,
} from "lucide-react";
import { useAuth } from "../hooks/AuthContext";
import { useLanguage } from "../hooks/LanguageContext";
import { useSettings } from "../hooks/SettingsContext";
import { logoutUser } from "../firebase/auth";
import { brand } from "../config/brand";
import { LanguageSwitcher } from "./LanguageSwitcher";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { t } = useLanguage();
  const { contact } = useSettings();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setMobileMenu(false);
    setUserDropdown(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/colleges", label: t.nav.colleges },
    { to: "/courses", label: t.nav.courses },
    { to: "/tnea", label: t.nav.tnea },
    { to: "/compare", label: t.nav.compare },
    { to: "/scholarships", label: t.nav.scholarships },
    { to: "/updates", label: t.nav.updates },
    { to: "/counselling", label: t.nav.counselling },
  ];

  const dashboardPath =
    profile?.role === "admin"
      ? "/admin"
      : profile?.role === "college"
        ? "/college"
        : "/dashboard";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      {(contact.phone || contact.phoneSecondary) && (
        <div className="bg-slate-950 px-4 py-2 text-xs text-slate-300">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
            <span className="font-medium text-slate-200">
              TNEA admissions guidance helpline
            </span>
            <div className="flex items-center gap-4 font-semibold">
              {contact.phone && (
                <a href={`tel:${contact.phone}`} className="inline-flex items-center gap-1.5 hover:text-teal-300">
                  <Phone className="h-3 w-3" />
                  {contact.phone}
                </a>
              )}
              {contact.phoneSecondary && (
                <a href={`tel:${contact.phoneSecondary}`} className="hover:text-teal-300">
                  {contact.phoneSecondary}
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <img
            src={brand.logoSrc}
            alt={brand.name}
            className="h-12 w-auto max-w-[200px] object-contain object-left"
          />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-sm font-medium ${
                  isActive
                    ? "bg-teal-50 font-semibold text-teal-800"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher />
          {user ? (
            <div className="relative" ref={userRef}>
              <button
                type="button"
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1.5 pr-3"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-700 text-white">
                  {profile?.name ? profile.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                </span>
                <ChevronDown size={14} />
              </button>
              {userDropdown && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                  <Link
                    to={dashboardPath}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-teal-50"
                  >
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-teal-50"
                  >
                    <User className="h-4 w-4" /> My Profile
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-rose-600 hover:bg-rose-50"
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold text-slate-700">
                {t.nav.signIn}
              </Link>
              <Link
                to="/colleges"
                className="rounded-full bg-teal-700 px-4 py-2 text-sm font-semibold text-white"
              >
                {t.cta.findCollege}
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileMenu(!mobileMenu)}
          className="rounded-xl border border-slate-200 p-2 lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenu ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileMenu && (
        <div className="border-t bg-white px-4 py-4 lg:hidden">
          <div className="mb-3">
            <LanguageSwitcher />
          </div>
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-teal-50"
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <Link to={dashboardPath} className="rounded-xl bg-teal-50 px-3 py-2.5 text-sm font-semibold text-teal-800">
                Dashboard
              </Link>
            ) : (
              <Link to="/login" className="rounded-xl px-3 py-2.5 text-sm font-semibold">
                {t.nav.signIn}
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
