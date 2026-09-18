import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Phone,
  Sprout,
  User,
  X,
} from "lucide-react";
import { useAuth } from "../hooks/AuthContext";
import { useSettings } from "../hooks/SettingsContext";
import { logoutUser } from "../firebase/auth";
import { brand } from "../config/brand";
import { LanguageSwitcher } from "./LanguageSwitcher";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
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
    { to: "/", label: "Home" },
    { to: "/colleges", label: "Colleges" },
    { to: "/courses", label: "Courses" },
    { to: "/scholarships", label: "Scholarships" },
    { to: "/tnea", label: "TNEA Hub" },
    { to: "/compare", label: "Compare" },
    { to: "/contact", label: "Contact" },
  ];

  const dashboardPath =
    profile?.role === "admin"
      ? "/admin"
      : profile?.role === "college"
        ? "/college"
        : "/dashboard";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#cdddc9]/60 bg-[#dce8da]/90 backdrop-blur-md">
      {(contact.phone || contact.phoneSecondary) && (
        <div className="bg-[#143527] px-4 py-1.5 text-xs text-[#d7e7d5]">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
            <span className="font-medium">
              TNEA admissions guidance helpline
            </span>
            <div className="flex items-center gap-4 font-semibold">
              {contact.phone && (
                <a href={`tel:${contact.phone}`} className="inline-flex items-center gap-1.5 hover:text-white">
                  <Phone className="h-3 w-3" />
                  {contact.phone}
                </a>
              )}
              {contact.phoneSecondary && (
                <a href={`tel:${contact.phoneSecondary}`} className="hover:text-white">
                  {contact.phoneSecondary}
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-heading text-xl font-bold tracking-tight text-[#143527]">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#143527] text-white">
            <Sprout className="h-5 w-5" />
          </span>
          <span>{brand.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#143527] font-semibold text-white"
                    : "text-[#142e23] hover:bg-[#cdddc9]/60"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          {user ? (
            <div className="relative" ref={userRef}>
              <button
                type="button"
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2 rounded-full border border-[#cdddc9] bg-white p-1 pr-3 shadow-xs"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#143527] text-xs text-white">
                  {profile?.name ? profile.name.charAt(0).toUpperCase() : <User className="h-3.5 w-3.5" />}
                </span>
                <span className="text-xs font-semibold text-[#142e23]">{profile?.name || "Account"}</span>
                <ChevronDown size={14} className="text-[#577063]" />
              </button>
              {userDropdown && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-[#cdddc9] bg-white p-2 shadow-xl">
                  <Link
                    to={dashboardPath}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-[#142e23] hover:bg-[#edf4ec]"
                  >
                    <LayoutDashboard className="h-4 w-4 text-[#143527]" /> Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-[#142e23] hover:bg-[#edf4ec]"
                  >
                    <User className="h-4 w-4 text-[#143527]" /> My Profile
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
              <Link to="/login" className="text-sm font-semibold text-[#142e23] hover:text-[#143527]">
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-[#143527] px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-[#0b2017]"
              >
                Register free
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileMenu(!mobileMenu)}
          className="rounded-xl border border-[#cdddc9] p-2 text-[#142e23] md:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenu ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileMenu && (
        <div className="border-t border-[#cdddc9] bg-[#dce8da] px-4 py-4 md:hidden">
          <div className="mb-3">
            <LanguageSwitcher />
          </div>
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-[#142e23] hover:bg-[#cdddc9]"
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <Link to={dashboardPath} className="rounded-xl bg-[#143527] px-3 py-2.5 text-sm font-semibold text-white">
                Dashboard
              </Link>
            ) : (
              <div className="mt-2 flex flex-col gap-2">
                <Link to="/login" className="rounded-xl border border-[#143527] px-3 py-2 text-center text-sm font-semibold text-[#143527]">
                  Login
                </Link>
                <Link to="/register" className="rounded-xl bg-[#143527] px-3 py-2 text-center text-sm font-semibold text-white">
                  Register free
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
