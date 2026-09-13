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
} from "lucide-react";

import { registerUser } from "../firebase/auth";
import {
  createUserProfile,
} from "../services/userService";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    setLoading(true);

    try {
      const user =
        await registerUser(
          name,
          email,
          password
        );

      await createUserProfile(
        user.uid,
        {
          name,
          email,
          role: "student",
        }
      );

      navigate("/dashboard");
    } catch (error: unknown) {
      console.error(error);

      const e = error as { code?: string };
      if (
        e.code ===
        "auth/email-already-in-use"
      ) {
        setError(
          "An account with this email already exists."
        );
      } else if (
        e.code ===
        "auth/invalid-email"
      ) {
        setError(
          "Please enter a valid email address."
        );
      } else if (
        e.code ===
        "auth/weak-password"
      ) {
        setError(
          "Please choose a stronger password."
        );
      } else {
        setError(
          "Unable to create your account."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Left */}
      <div
        className="hidden p-12 text-white lg:flex lg:w-1/2 lg:flex-col lg:justify-between"
        style={{
          background:
            "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 80%, #3b0764 100%)",
        }}
      >

        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-sm font-black backdrop-blur-sm">
            C
          </div>
          CollegeCrop
        </Link>

        <div className="max-w-lg">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-300">
            Start today
          </p>

          <h1 className="mt-5 text-5xl font-black tracking-tight">
            Find the right
            <span className="block text-indigo-300">
              path for your future.
            </span>
          </h1>

          <p className="mt-6 leading-7 text-indigo-200">
            Create your free account and start
            discovering colleges, courses and
            admission opportunities.
          </p>

        </div>

        <p className="text-xs text-indigo-400">
          © 2026 CollegeCrop
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

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Create account
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            Join CollegeCrop
          </h2>

          <p className="mt-3 text-sm text-gray-500">
            Create your free student account.
          </p>

          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* Name */}
            <div>

              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Full name
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 focus-within:border-black">

                <UserRound
                  size={18}
                  className="text-gray-400"
                />

                <input
                  id="name"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Your full name"
                  required
                  className="w-full bg-transparent py-3.5 text-sm outline-none"
                />

              </div>

            </div>

            {/* Email */}
            <div>

              <label
                htmlFor="register-email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email address
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 focus-within:border-black">

                <Mail
                  size={18}
                  className="text-gray-400"
                />

                <input
                  id="register-email"
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
                htmlFor="register-password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 focus-within:border-black">

                <Lock
                  size={18}
                  className="text-gray-400"
                />

                <input
                  id="register-password"
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
                  placeholder="At least 6 characters"
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
                  className="text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            {/* Confirm */}
            <div>

              <label
                htmlFor="confirm-password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Confirm password
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 focus-within:border-black">

                <Lock
                  size={18}
                  className="text-gray-400"
                />

                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(
                      event.target.value
                    )
                  }
                  placeholder="Repeat your password"
                  required
                  className="w-full bg-transparent py-3.5 text-sm outline-none"
                />

              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}
            >
              {loading
                ? "Creating account..."
                : "Create account"}

              {!loading && (
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              )}
            </button>

          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-gray-900 hover:underline"
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