import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BookOpen,
  ChevronDown,
  Compass,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Phone,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { useAuth } from "../hooks/AuthContext";
import { logoutUser } from "../firebase/auth";

const coursesList = [
  "Engineering & Technology",
  "Medical & Healthcare",
  "Pharmacy & Life Sciences",
  "Management & MBA",
  "Arts, Science & Commerce",
  "Law & Legal Studies",
  "Agriculture & Veterinary",
  "Diploma & Vocational",
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setCoursesOpen(false);
      }
      if (
        userRef.current &&
        !userRef.current.contains(event.target as Node)
      ) {
        setUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    (async () => {
      setMobileMenu(false);
      setCoursesOpen(false);
      setUserDropdown(false);
    })();
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl transition-all">
      {/* Top Contact Bar */}
      <div className="bg-slate-950 px-4 py-2 text-xs text-slate-300 border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-slate-200">TNEA Admissions & Counselling Helpline 2026</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-5 font-semibold text-slate-200">
            <a href="tel:+919894502366" className="flex items-center gap-1.5 hover:text-indigo-400 transition">
              <Phone className="h-3 w-3 text-emerald-400" />
              <span>+91 98945 02366</span>
            </a>
            <span className="text-slate-700">|</span>
            <a href="tel:+919944103330" className="flex items-center gap-1.5 hover:text-indigo-400 transition">
              <Phone className="h-3 w-3 text-emerald-400" />
              <span>+91 99441 03330</span>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-600 text-white shadow-md shadow-indigo-500/25 transition-transform duration-300 group-hover:scale-105">
            <GraduationCap className="h-6 w-6 text-white" />
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white">
              <Sparkles className="h-2.5 w-2.5 text-white" />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-heading text-lg font-extrabold tracking-tight text-slate-900">
              <span className="rounded-lg bg-indigo-600 px-2 py-0.5 text-white text-xs font-black">TNEA</span>
              <span className="text-slate-900">Find Your Right College</span>
            </div>
            <div className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
              Tamil Nadu College Admission Portal
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            to="/"
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              isActive("/")
                ? "bg-indigo-50 text-indigo-700 font-semibold"
                : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
            }`}
          >
            Home
          </Link>

          <Link
            to="/colleges"
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              isActive("/colleges")
                ? "bg-indigo-50 text-indigo-700 font-semibold"
                : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
            }`}
          >
            Colleges
          </Link>

          {/* Courses Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setCoursesOpen(!coursesOpen)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                coursesOpen
                  ? "bg-indigo-50 text-indigo-700 font-semibold"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
              }`}
            >
              <Compass className="h-4 w-4 opacity-70" />
              Courses
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  coursesOpen ? "rotate-180 text-indigo-600" : ""
                }`}
              />
            </button>

            {coursesOpen && (
              <div className="absolute left-0 top-full mt-2 w-72 rounded-2xl border border-slate-200/80 bg-white p-2.5 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/5">
                <div className="mb-2 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Popular Categories
                </div>
                {coursesList.map((item) => (
                  <Link
                    key={item}
                    to="/colleges"
                    onClick={() => setCoursesOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    <span>{item}</span>
                    <span className="text-[10px] font-semibold text-slate-400">Explore</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/scholarships"
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              isActive("/scholarships")
                ? "bg-indigo-50 text-indigo-700 font-semibold"
                : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
            }`}
          >
            Scholarships
          </Link>

          <Link
            to="/online-courses"
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              isActive("/online-courses")
                ? "bg-indigo-50 text-indigo-700 font-semibold"
                : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
            }`}
          >
            <BookOpen className="h-4 w-4 opacity-70" />
            Online Courses
          </Link>
        </nav>

        {/* Desktop User CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <div className="relative" ref={userRef}>
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50 p-1.5 pr-4 transition hover:bg-slate-100 hover:border-indigo-200"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 font-semibold text-white shadow-sm">
                  {profile?.name ? profile.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                </div>
                <span className="max-w-[120px] truncate text-xs font-semibold text-slate-800">
                  {profile?.name || user.email?.split("@")[0] || "Account"}
                </span>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {userDropdown && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/10">
                  <div className="border-b border-slate-100 px-3 py-2.5">
                    <div className="text-xs font-bold text-slate-900 truncate">{profile?.name || "Student"}</div>
                    <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                  </div>
                  <div className="py-1">
                    <Link
                      to={profile?.role === "admin" ? "/admin" : "/dashboard"}
                      onClick={() => setUserDropdown(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700"
                    >
                      <LayoutDashboard className="h-4 w-4 text-indigo-600" />
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setUserDropdown(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700"
                    >
                      <User className="h-4 w-4 text-indigo-600" />
                      My Profile
                    </Link>
                  </div>
                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-rose-600 transition hover:bg-rose-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:text-indigo-600"
              >
                Sign In
              </Link>

              <Link
                to="/colleges"
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:scale-[1.02] hover:shadow-indigo-500/35 active:scale-[0.98]"
              >
                <Sparkles className="h-4 w-4" />
                Admission Enquiry
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenu ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenu && (
        <div className="border-t border-slate-200/80 bg-white px-4 pb-6 pt-4 lg:hidden">
          <div className="mb-4 flex flex-col gap-2 rounded-2xl bg-slate-900 p-3 text-xs text-white">
            <span className="font-bold text-indigo-400">📞 Admission Helpline:</span>
            <div className="flex items-center justify-between">
              <a href="tel:+919894502366" className="font-semibold underline">+91 98945 02366</a>
              <a href="tel:+919944103330" className="font-semibold underline">+91 99441 03330</a>
            </div>
          </div>

          <nav className="flex flex-col gap-1.5">
            <Link
              to="/"
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-indigo-50 hover:text-indigo-700"
            >
              Home
            </Link>
            <Link
              to="/colleges"
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-indigo-50 hover:text-indigo-700"
            >
              Explore Colleges
            </Link>
            <Link
              to="/scholarships"
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-indigo-50 hover:text-indigo-700"
            >
              Scholarships
            </Link>
            <Link
              to="/online-courses"
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-indigo-50 hover:text-indigo-700"
            >
              Online Courses
            </Link>

            {user ? (
              <div className="mt-3 border-t border-slate-100 pt-3">
                <Link
                  to={profile?.role === "admin" ? "/admin" : "/dashboard"}
                  className="flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-600"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
                <Link
                  to="/login"
                  className="flex items-center justify-center rounded-full border border-slate-200 py-2.5 text-sm font-semibold text-slate-800"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="flex items-center justify-center gap-2 rounded-full bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-md"
                >
                  Get Started
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