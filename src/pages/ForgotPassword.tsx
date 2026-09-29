import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, KeyRound, Mail, Sprout } from "lucide-react";
import { resetPassword } from "../firebase/auth";
import { brand } from "../config/brand";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await resetPassword(email);
      setDone(true);
    } catch {
      setError("Unable to send reset email. Please check your email address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F9FC] px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-[#E2ECF3] bg-white p-8 sm:p-10 shadow-xl">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2 font-heading text-xl font-bold text-[#075B63]">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#075B63] text-white">
              <Sprout className="h-5 w-5 text-[#E8F4FA]" />
            </span>
            <span>{brand.name}</span>
          </Link>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-[#E2ECF3] bg-[#F0F8FD] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#075B63]">
          <KeyRound className="h-3.5 w-3.5" />
          Password Reset
        </div>

        <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-[#075B63]">
          Forgot your password?
        </h1>

        <p className="mt-2 text-sm text-[#5A6E78]">
          Enter your registered email address and we'll send you instructions to reset your password.
        </p>

        {done && (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-[#075B63]">
            ✓ Password reset email sent! Check your inbox.
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="reset-email" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#075B63]">
              Email address
            </label>
            <div className="flex items-center gap-3 rounded-2xl border border-[#E2ECF3] bg-[#F5F9FC]/40 px-4 transition focus-within:border-[#075B63] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#075B63]/20">
              <Mail size={18} className="text-[#5A6E78]" />
              <input
                id="reset-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent py-3.5 text-sm text-[#075B63] placeholder-[#5A6E78]/60 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#075B63] py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#05434A] hover:shadow-lg disabled:opacity-60"
          >
            {loading ? "Sending link..." : "Send reset link"}
          </button>
        </form>

        <div className="mt-8 border-t border-[#E2ECF3]/60 pt-6 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#075B63] hover:underline"
          >
            <ArrowLeft size={16} />
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
