import {
  useState,
  type FormEvent,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  UserRound,
  Sprout,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import { registerUser } from "../firebase/auth";
import { createUserProfile } from "../services/userService";
import { brand } from "../config/brand";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const user = await registerUser(name, email, password);

      await createUserProfile(user.uid, {
        name,
        email,
        role: "student",
      });

      navigate("/dashboard");
    } catch (error: unknown) {
      console.error(error);
      const e = error as { code?: string };
      if (e.code === "auth/email-already-in-use") {
        setError("An account with this email already exists.");
      } else if (e.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (e.code === "auth/weak-password") {
        setError("Please choose a stronger password.");
      } else {
        setError("Unable to create your account.");
      }
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
        {/* Background Gradients */}
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
            Start today
          </div>

          <h1 className="mt-6 font-heading text-5xl font-extrabold tracking-tight text-white leading-tight">
            Find the right <br />
            path for your <span className="font-serif-italic font-normal italic text-[#a8d5ba]">future</span>.
          </h1>

          <p className="mt-6 text-base text-[#c4e0ce] leading-relaxed">
            Create your free student account to explore top Tamil Nadu engineering colleges, calculate cutoffs, and get expert counselling.
          </p>

          <div className="mt-8 space-y-3">
            {[
              "Personalized TNEA Cutoff & Rank Predictor",
              "Direct Engineering College Applications",
              "Exclusive Scholarship Guidance & Tracking",
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm text-[#dce8da]">
                <CheckCircle2 className="h-5 w-5 text-[#a8d5ba] shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-xs text-[#a8d5ba]/80">
          <p>© {brand.year} {brand.name}. Free Student Portal.</p>
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
              <Sparkles className="h-3.5 w-3.5" />
              Create Account
            </div>

            <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-[#142e23]">
              Join {brand.name}
            </h2>

            <p className="mt-2 text-sm text-[#577063]">
              Register your free student account in 1 minute.
            </p>
          </div>

          {error && (
            <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#142e23]">
                Full name
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-[#cdddc9] bg-[#edf4ec]/40 px-4 transition focus-within:border-[#143527] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#143527]/20">
                <UserRound size={18} className="text-[#577063]" />
                <input
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your full name"
                  required
                  className="w-full bg-transparent py-3 text-sm text-[#142e23] placeholder-[#577063]/60 outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="register-email" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#142e23]">
                Email address
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-[#cdddc9] bg-[#edf4ec]/40 px-4 transition focus-within:border-[#143527] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#143527]/20">
                <Mail size={18} className="text-[#577063]" />
                <input
                  id="register-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-transparent py-3 text-sm text-[#142e23] placeholder-[#577063]/60 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="register-password" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#142e23]">
                Password
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-[#cdddc9] bg-[#edf4ec]/40 px-4 transition focus-within:border-[#143527] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#143527]/20">
                <Lock size={18} className="text-[#577063]" />
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 6 characters"
                  required
                  className="w-full bg-transparent py-3 text-sm text-[#142e23] placeholder-[#577063]/60 outline-none"
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

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirm-password" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#142e23]">
                Confirm password
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-[#cdddc9] bg-[#edf4ec]/40 px-4 transition focus-within:border-[#143527] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#143527]/20">
                <Lock size={18} className="text-[#577063]" />
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Repeat your password"
                  required
                  className="w-full bg-transparent py-3 text-sm text-[#142e23] placeholder-[#577063]/60 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#143527] py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#0b2017] hover:shadow-lg disabled:opacity-60"
            >
              <span>{loading ? "Creating account..." : "Create account"}</span>
              {!loading && (
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#577063]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-[#143527] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;