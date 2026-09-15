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

const Login = () => {
  const navigate = useNavigate();
  const { user, profile, loading: authLoading } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

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

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await loginUser(email, password);
    } catch (error: unknown) {
      console.error(error);

      const e = error as { code?: string };
      if (
        e.code ===
        "auth/invalid-credential"
      ) {
        setError(
          "Incorrect email or password."
        );
      } else if (
        e.code ===
        "auth/too-many-requests"
      ) {
        setError(
          "Too many attempts. Please try again later."
        );
      } else {
        setError(
          "Unable to login. Please try again."
        );
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
    <div className="flex min-h-screen bg-gray-50">

      {/* Left panel */}
      <div
        className="hidden p-12 text-white lg:flex lg:w-1/2 lg:flex-col lg:justify-between"
        style={{
          background:
            "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 80%, #3b0764 100%)",
        }}
      >

        <div>
          <Link to="/" className="inline-block">
            <img src={brand.logoSrc} alt={brand.name} className="h-16 w-auto rounded-xl bg-white p-2" />
          </Link>
        </div>

        <div className="max-w-lg">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-300">
            Welcome back
          </p>

          <h1 className="mt-5 text-5xl font-black tracking-tight">
            Continue your journey
            <span className="block text-indigo-300">
              towards your future.
            </span>
          </h1>

          <p className="mt-6 max-w-md leading-7 text-indigo-200">
            Discover colleges, explore courses and
            manage your admission journey from one
            place.
          </p>

        </div>

          <p className="text-xs text-indigo-400">
          © {brand.year} {brand.name}
        </p>

      </div>

      {/* Form */}
      <div className="flex w-full items-center justify-center px-5 py-12 lg:w-1/2">

        <div className="w-full max-w-md">

          <div className="mb-10 lg:hidden">
            <Link
              to="/"
              className="text-xl font-bold"
            >
              CollegeCrop
            </Link>
          </div>

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Account
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
              Welcome back
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              Login to continue your CollegeCrop journey.
            </p>

          </div>

          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* Email */}
            <div>

              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email address
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 transition focus-within:border-black">

                <Mail
                  size={18}
                  className="text-gray-400"
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="you@example.com"
                  required
                  className="w-full bg-transparent py-3.5 text-sm outline-none"
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 transition focus-within:border-black">

                <Lock
                  size={18}
                  className="text-gray-400"
                />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  placeholder="Enter your password"
                  required
                  className="w-full bg-transparent py-3.5 text-sm outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="text-gray-400 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}
            >
              {loading
                ? "Signing in..."
                : "Sign in"}

              {!loading && (
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              )}
            </button>

            <Link to="/forgot-password" className="block text-center text-sm font-semibold text-teal-700">
              Forgot password?
            </Link>

            {isGoogleAuthEnabled && (
              <button
                type="button"
                onClick={handleGoogle}
                disabled={loading}
                className="w-full rounded-xl border py-3 text-sm font-semibold"
              >
                Continue with Google
              </button>
            )}

          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-gray-900 hover:underline"
            >
              Create one
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;
