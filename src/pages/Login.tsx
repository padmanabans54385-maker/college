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
  Sprout,
  ShieldCheck,
  Building2,
  GraduationCap,
} from "lucide-react";

import { loginUser, loginWithGoogle, isGoogleAuthEnabled } from "../firebase/auth";
import { brand } from "../config/brand";
import { useAuth } from "../hooks/AuthContext";

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
    <div className="flex min-h-screen bg-[#edf4ec]">
      {/* Left panel - Home Theme Forest Green Surface */}
      <div
        className="relative hidden p-12 text-white lg:flex lg:w-1/2 lg:flex-col lg:justify-between overflow-hidden border-r border-[#cdddc9]/40"
        style={{
          background:
            "linear-gradient(135deg, #143527 0%, #1a4332 50%, #0d251b 100%)",
        }}
      >
        {/* Decorative Background Elements */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#2e694d]/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#dce8da]/10 blur-3xl" />

        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2.5 font-heading text-2xl font-bold tracking-tight text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-md border border-white/15">
              <Sprout className="h-6 w-6 text-[#dce8da]" />
            </span>
            <span>{brand.name}</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#cdddc9]/30 bg-[#e6f0e4]/15 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#dce8da] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a8d5ba]" />
            Welcome back
          </div>

          <h1 className="mt-6 font-heading text-5xl font-extrabold tracking-tight text-white leading-tight">
            Continue your journey <br />
            towards your <span className="font-serif-italic font-normal italic text-[#a8d5ba]">future</span>.
          </h1>

          <p className="mt-6 text-base text-[#c4e0ce] leading-relaxed">
            Discover colleges, explore courses and manage your admission journey seamlessly with TNEA guidance.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-[#a8d5ba]" />
                <span className="font-heading text-xl font-bold text-white">8+</span>
              </div>
              <p className="mt-1 text-xs font-semibold text-[#c4e0ce]">Top Engineering Colleges</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-[#a8d5ba]" />
                <span className="font-heading text-xl font-bold text-white">100%</span>
              </div>
              <p className="mt-1 text-xs font-semibold text-[#c4e0ce]">Free Counselling</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-xs text-[#a8d5ba]/80">
          <p>© {brand.year} {brand.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex w-full items-center justify-center px-5 py-12 lg:w-1/2">
        <div className="w-full max-w-md rounded-3xl border border-[#cdddc9] bg-white p-8 sm:p-10 shadow-xl">
          <div className="mb-8 lg:hidden">
            <Link to="/" className="inline-flex items-center gap-2 font-heading text-xl font-bold text-[#143527]">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#143527] text-white">
                <Sprout className="h-4 w-4 text-[#dce8da]" />
              </span>
              <span>{brand.name}</span>
            </Link>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#143527]">
              <GraduationCap className="h-3.5 w-3.5" />
              Account Login
            </div>

            <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-[#142e23]">
              Welcome back
            </h2>

            <p className="mt-2 text-sm text-[#577063]">
              Log in to access your CollegeCrop dashboard & applications.
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
              <label htmlFor="email" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#142e23]">
                Email address
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-[#cdddc9] bg-[#edf4ec]/40 px-4 transition focus-within:border-[#143527] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#143527]/20">
                <Mail size={18} className="text-[#577063]" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-transparent py-3.5 text-sm text-[#142e23] placeholder-[#577063]/60 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-[#142e23]">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs font-semibold text-[#143527] hover:underline">
                  Forgot password?
                </Link>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-[#cdddc9] bg-[#edf4ec]/40 px-4 transition focus-within:border-[#143527] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#143527]/20">
                <Lock size={18} className="text-[#577063]" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full bg-transparent py-3.5 text-sm text-[#142e23] placeholder-[#577063]/60 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#577063] hover:text-[#143527]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#143527] py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#0b2017] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
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
                className="w-full rounded-full border border-[#cdddc9] bg-[#edf4ec]/60 py-3 text-sm font-semibold text-[#142e23] transition-colors hover:bg-[#dce8da]"
              >
                Continue with Google
              </button>
            )}
          </form>

          <p className="mt-8 text-center text-sm text-[#577063]">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-[#143527] hover:underline"
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
