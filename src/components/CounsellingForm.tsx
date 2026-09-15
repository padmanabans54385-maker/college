import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { createCounsellingRequest } from "../services/counsellingService";
import { createLead } from "../services/leadService";
import { trackEvent } from "../services/analytics";
import { useAuth } from "../hooks/AuthContext";

export const CounsellingForm = ({ source = "counselling" }: { source?: string }) => {
  const { user, profile } = useAuth();
  const [params] = useSearchParams();
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      userId: user?.uid,
      name: String(form.get("name") || ""),
      studentName: String(form.get("studentName") || ""),
      parentName: String(form.get("parentName") || ""),
      phone: String(form.get("phone") || ""),
      email: String(form.get("email") || ""),
      academicQualification: String(form.get("academicQualification") || ""),
      cutoff: String(form.get("cutoff") || ""),
      rank: String(form.get("rank") || ""),
      preferredCourse: String(form.get("preferredCourse") || ""),
      preferredLocation: String(form.get("preferredLocation") || ""),
      preferredCollege: String(form.get("preferredCollege") || params.get("college") || ""),
      message: String(form.get("message") || ""),
      counsellingMode: String(form.get("counsellingMode") || ""),
      preferredDateTime: String(form.get("preferredDateTime") || ""),
    };
    setStatus("saving");
    try {
      await createCounsellingRequest(payload);
      await createLead({
        name: payload.name || payload.studentName,
        phone: payload.phone,
        email: payload.email,
        source,
        interest: "Counselling",
        course: payload.preferredCourse,
        college: payload.preferredCollege,
        rank: payload.rank,
        cutoff: payload.cutoff,
      });
      trackEvent("counselling_request", { source });
      setStatus("done");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  };

  const fieldClass =
    "w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-600";

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Your name" className={fieldClass} defaultValue={profile?.name} />
        <input name="studentName" required placeholder="Student name" className={fieldClass} />
        <input name="parentName" placeholder="Parent name" className={fieldClass} />
        <input name="phone" required placeholder="Phone" className={fieldClass} defaultValue={profile?.phone} />
        <input name="email" type="email" placeholder="Email" className={fieldClass} defaultValue={profile?.email} />
        <input name="academicQualification" placeholder="Academic qualification" className={fieldClass} />
        <input name="cutoff" placeholder="Cutoff" className={fieldClass} defaultValue={profile?.cutoff} />
        <input name="rank" placeholder="TNEA rank" className={fieldClass} defaultValue={profile?.tneaRank} />
        <input name="preferredCourse" placeholder="Preferred course" className={fieldClass} />
        <input name="preferredLocation" placeholder="Preferred location" className={fieldClass} />
        <input
          name="preferredCollege"
          placeholder="Preferred college"
          className={fieldClass}
          defaultValue={params.get("college") || ""}
        />
        <select name="counsellingMode" className={fieldClass} defaultValue="phone">
          <option value="phone">Phone</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="in-person">In person</option>
        </select>
        <input name="preferredDateTime" type="datetime-local" className={fieldClass} />
      </div>
      <textarea name="message" rows={4} placeholder="Message" className={fieldClass} />
      <button
        type="submit"
        disabled={status === "saving"}
        className="rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {status === "saving" ? "Submitting…" : "Request counselling"}
      </button>
      {status === "done" && <p className="text-sm text-emerald-700">Request received. A counsellor will follow up.</p>}
      {status === "error" && <p className="text-sm text-rose-600">Could not submit. Please try again.</p>}
    </form>
  );
};
