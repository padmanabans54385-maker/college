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
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "saving") return;

    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    const rawPayload = {
      userId: user?.uid ?? null,
      name: String(form.get("name") || "").trim(),
      studentName: String(form.get("studentName") || "").trim(),
      parentName: String(form.get("parentName") || "").trim(),
      phone: String(form.get("phone") || "").trim(),
      email: String(form.get("email") || "").trim(),
      academicQualification: String(form.get("academicQualification") || "").trim(),
      cutoff: String(form.get("cutoff") || "").trim(),
      rank: String(form.get("rank") || "").trim(),
      preferredCourse: String(form.get("preferredCourse") || "").trim(),
      preferredLocation: String(form.get("preferredLocation") || "").trim(),
      preferredCollege: String(form.get("preferredCollege") || params.get("college") || "").trim(),
      message: String(form.get("message") || "").trim(),
      counsellingMode: String(form.get("counsellingMode") || "").trim(),
      preferredDateTime: String(form.get("preferredDateTime") || "").trim(),
    };

    // Remove empty/null/undefined optional fields so Firestore receives clean object
    const payload = Object.fromEntries(
      Object.entries(rawPayload).filter(([_, val]) => val !== null && val !== undefined && val !== "")
    ) as Record<string, any>;

    // Fallback for required studentName
    if (!payload.studentName && payload.name) {
      payload.studentName = payload.name;
    }

    setStatus("saving");
    setErrorMsg("");

    try {
      // 1. Save counselling request to Firestore
      await createCounsellingRequest(payload as any);

      // 2. Non-blocking secondary analytics & lead creation
      try {
        await createLead({
          name: payload.name || payload.studentName || "Student",
          phone: payload.phone || "",
          email: payload.email || "",
          source,
          interest: "Counselling",
          course: payload.preferredCourse,
          college: payload.preferredCollege,
          rank: payload.rank,
          cutoff: payload.cutoff,
        });
        trackEvent("counselling_request", { source });
      } catch (secError) {
        console.warn("Secondary lead tracking issue (non-critical):", secError);
      }

      // 3. Update status & reset form
      setStatus("done");
      formElement.reset();
    } catch (err: any) {
      console.error("Counselling submit error:", err);
      setStatus("error");
      setErrorMsg(err?.message || "Unable to submit request. Please try again.");
    }
  };

  const fieldClass =
    "w-full rounded-xl border border-[#cdddc9] bg-white px-3.5 py-2.5 text-sm text-[#142e23] outline-none transition focus:border-[#143527] focus:ring-2 focus:ring-[#143527]/20";

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-3xl border border-[#cdddc9] bg-white p-6 sm:p-8 shadow-md">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Your name *" className={fieldClass} defaultValue={profile?.name} />
        <input name="studentName" placeholder="Student name" className={fieldClass} />
        <input name="parentName" placeholder="Parent name" className={fieldClass} />
        <input name="phone" required placeholder="Phone *" className={fieldClass} defaultValue={profile?.phone} />
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
        className="rounded-full bg-[#143527] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#0b2017] hover:shadow-lg disabled:opacity-60"
      >
        {status === "saving" ? "Submitting request…" : "Request counselling"}
      </button>
      {status === "done" && (
        <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-sm font-bold text-emerald-800">
          ✓ Counselling request submitted successfully! A counsellor will follow up with you shortly.
        </div>
      )}
      {status === "error" && (
        <div className="rounded-xl border border-rose-300 bg-rose-50 p-4 text-sm font-bold text-rose-700">
          {errorMsg || "Could not submit. Please try again."}
        </div>
      )}
    </form>
  );
};
