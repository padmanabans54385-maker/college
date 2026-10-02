import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Compass,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  PhoneCall,
  User,
  X,
} from "lucide-react";
import { useAuth } from "../hooks/AuthContext";
import { logoutUser } from "../firebase/auth";
import { brand } from "../config/brand";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
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

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/courses", label: "Courses" },
    { to: "/colleges", label: "Colleges" },
    { to: "/counselling", label: "Services" },
    { to: "/contact", label: "Contact" },
  ];

  const dashboardPath =
    profile?.role === "admin"
      ? "/admin"
      : profile?.role === "college"
        ? "/college"
        : "/dashboard";

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#E2ECF3] shadow-xs">
      {/* Top Banner for Academic Support */}
      <div className="bg-[#075B63] px-4 py-1.5 text-xs text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-[#4DB3E8] animate-pulse"></span>
            <span className="font-poppins font-medium tracking-wide">
              Admissions Open 2026-27 | Expert Guidance & College Counseling
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-poppins">
            <a
              href="tel:1800572892"
              className="inline-flex items-center gap-1.5 hover:text-[#4DB3E8] transition-colors"
            >
              <PhoneCall className="h-3 w-3 text-[#4DB3E8]" />
              Helpline: +1 (800) 572-8920
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav Header */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <img
            src={brand.logoSrc}
            alt="Go2College - Your Future, Elevated"
            className="h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
          />
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-poppins font-medium transition-all rounded-lg ${
                  isActive
                    ? "text-[#168FD0] bg-[#F0F8FD] font-semibold"
                    : "text-[#075B63] hover:text-[#168FD0] hover:bg-[#F0F8FD]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <div className="relative" ref={userRef}>
              <button
                type="button"
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2.5 rounded-full border border-[#E2ECF3] bg-[#F5F9FC] p-1.5 pr-4 shadow-xs hover:border-[#4DB3E8] transition-all"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#075B63] text-xs font-bold text-white shadow-xs">
                  {profile?.name ? profile.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                </span>
                <span className="text-xs font-semibold text-[#172B35]">{profile?.name || "Account"}</span>
                <ChevronDown size={14} className="text-[#5A6E78]" />
              </button>

              {userDropdown && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-[#E2ECF3] bg-white p-2 shadow-xl z-50">
                  <Link
                    to={dashboardPath}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-[#172B35] hover:bg-[#F0F8FD] hover:text-[#168FD0] font-medium"
                  >
                    <LayoutDashboard className="h-4 w-4 text-[#168FD0]" /> Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-[#172B35] hover:bg-[#F0F8FD] hover:text-[#168FD0] font-medium"
                  >
                    <User className="h-4 w-4 text-[#168FD0]" /> Student Profile
                  </Link>
                  <div className="my-1 border-t border-[#E2ECF3]"></div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-rose-600 hover:bg-rose-50 font-medium"
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-poppins font-semibold text-[#075B63] hover:text-[#168FD0] transition-colors"
              >
                Login
              </Link>
              <Link
                to="/colleges"
                className="btn-primary text-xs tracking-wide"
              >
                <Compass className="h-4 w-4" />
                Explore Colleges
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenu(!mobileMenu)}
          className="rounded-lg border border-[#E2ECF3] p-2 text-[#075B63] hover:bg-[#F0F8FD] lg:hidden"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenu && (
        <div className="border-t border-[#E2ECF3] bg-white px-4 py-6 lg:hidden animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-base font-poppins font-medium transition-colors ${
                    isActive
                      ? "bg-[#F0F8FD] font-semibold text-[#168FD0]"
                      : "text-[#075B63] hover:bg-[#F5F9FC]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="mt-4 border-t border-[#E2ECF3] pt-4">
              {user ? (
                <Link
                  to={dashboardPath}
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#075B63] px-4 py-3 text-sm font-semibold text-white shadow-xs"
                >
                  <LayoutDashboard size={18} />
                  My Dashboard
                </Link>
              ) : (
                <div className="flex flex-col gap-2.5">
                  <Link
                    to="/colleges"
                    className="btn-primary w-full justify-center text-sm py-3"
                  >
                    <GraduationCap size={18} />
                    Get Started / Explore Colleges
                  </Link>
                  <Link
                    to="/login"
                    className="btn-secondary w-full justify-center text-sm py-3"
                  >
                    Login to Account
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;

