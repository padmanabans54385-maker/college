import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from "lucide-react";

import { loginUser, loginWithGoogle, isGoogleAuthEnabled } from "../firebase/auth";
import { brand } from "../config/brand";
import { useAuth } from "../hooks/AuthContext";
import { LightbulbIcon, UniversityIcon } from "../components/icons/AcademicIcons";

const Login = () => {
  const navigate = useNavigate();
  const { user, profile, loading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading || !user || !profile) return;

    const destination =
      profile.role === "admin"
        ? "/admin"
        : profile.role === "college"
          ? "/college"
          : "/dashboard/student";

    navigate(destination, { replace: true });
  }, [authLoading, navigate, profile, user]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUser(email, password);
    } catch (error: unknown) {
      console.error(error);
      const e = error as { code?: string };
      if (e.code === "auth/invalid-credential") {
        setError("Incorrect email or password.");
      } else if (e.code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError("Unable to login. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
    } catch {
      setError("Google sign-in is not available.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F5F9FC]">
      {/* Left panel - Home Theme Forest Green Surface */}
      <div
        className="relative hidden p-12 text-white lg:flex lg:w-1/2 lg:flex-col lg:justify-between overflow-hidden border-r border-[#E2ECF3]/40"
        style={{
          background:
            "linear-gradient(135deg, #075B63 0%, #05434A 50%, #04363C 100%)",
        }}
      >
        {/* Decorative Background Elements */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#0A6D77]/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#E8F4FA]/10 blur-3xl" />

        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center rounded-xl bg-white px-3 py-2">
            <img src={brand.logoSrc} alt={brand.name} className="h-12 w-auto object-contain" />
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E2ECF3]/30 bg-[#F0F8FD]/15 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#E8F4FA] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4DB3E8]" />
            Welcome back
          </div>

          <h1 className="mt-6 font-heading text-5xl font-extrabold tracking-tight text-white leading-tight">
            Continue your journey <br />
            towards your <span className="font-serif-italic font-normal italic text-[#4DB3E8]">future</span>.
          </h1>

          <p className="mt-6 text-base text-[#BBE1F5] leading-relaxed">
            Discover colleges, explore courses and manage your admission journey seamlessly with TNEA guidance.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <UniversityIcon size={20} className="text-[#4DB3E8]" />
                <span className="font-heading text-xl font-bold text-white">8+</span>
              </div>
              <p className="mt-1 text-xs font-semibold text-[#BBE1F5]">Top Engineering Colleges</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <LightbulbIcon size={20} className="text-[#4DB3E8]" />
                <span className="font-heading text-xl font-bold text-white">100%</span>
              </div>
              <p className="mt-1 text-xs font-semibold text-[#BBE1F5]">Free Counselling</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-xs text-[#4DB3E8]/80">
          <p>© {brand.year} {brand.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex w-full items-center justify-center px-5 py-12 lg:w-1/2">
        <div className="w-full max-w-md rounded-3xl border border-[#E2ECF3] bg-white p-8 sm:p-10 shadow-xl">
          <div className="mb-8 lg:hidden">
            <Link to="/" className="inline-flex items-center">
              <img src={brand.logoSrc} alt={brand.name} className="h-12 w-auto object-contain" />
            </Link>
          </div>

          <div>
            <div className="academic-badge">Account login</div>

            <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-[#075B63]">
              Welcome back
            </h2>

            <p className="mt-2 text-sm text-[#5A6E78]">
              Log in to access your Go2College dashboard & applications.
            </p>
          </div>

          {error && (
            <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#075B63]">
                Email address
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-[#E2ECF3] bg-[#F5F9FC]/40 px-4 transition focus-within:border-[#075B63] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#075B63]/20">
                <Mail size={18} className="text-[#5A6E78]" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-transparent py-3.5 text-sm text-[#075B63] placeholder-[#5A6E78]/60 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-[#075B63]">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs font-semibold text-[#075B63] hover:underline">
                  Forgot password?
                </Link>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-[#E2ECF3] bg-[#F5F9FC]/40 px-4 transition focus-within:border-[#075B63] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#075B63]/20">
                <Lock size={18} className="text-[#5A6E78]" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full bg-transparent py-3.5 text-sm text-[#075B63] placeholder-[#5A6E78]/60 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#5A6E78] hover:text-[#075B63]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>{loading ? "Signing in..." : "Sign in"}</span>
              {!loading && (
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              )}
            </button>

            {isGoogleAuthEnabled && (
              <button
                type="button"
                onClick={handleGoogle}
                disabled={loading}
                className="w-full rounded-full border border-[#E2ECF3] bg-[#F5F9FC]/60 py-3 text-sm font-semibold text-[#075B63] transition-colors hover:bg-[#E8F4FA]"
              >
                Continue with Google
              </button>
            )}
          </form>

          <p className="mt-8 text-center text-sm text-[#5A6E78]">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-[#075B63] hover:underline"
            >
              Create free account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
