import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { resetPassword } from "../firebase/auth";
import { brand } from "../config/brand";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    try {
      await resetPassword(email);
      setDone(true);
    } catch {
      setError("Unable to send reset email.");
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <img src={brand.logoSrc} alt="" className="mb-6 h-16 w-auto object-contain" />
      <h1 className="font-heading text-2xl font-bold">Reset password</h1>
      <form onSubmit={onSubmit} className="mt-6 grid gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          className="rounded-xl border px-3 py-2.5"
        />
        <button className="rounded-xl bg-teal-700 py-2.5 font-semibold text-white">Send reset link</button>
      </form>
      {done && <p className="mt-3 text-sm text-emerald-700">Check your inbox.</p>}
      {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}
      <Link to="/login" className="mt-6 text-sm font-semibold text-teal-700">
        Back to sign in
      </Link>
    </div>
  );
};

export default ForgotPassword;
