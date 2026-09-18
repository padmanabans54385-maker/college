import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getSiteSettings, updateContactSettings } from "../services/settingsService";
import type { SiteContactSettings } from "../types";

const AdminSettings = () => {
  const [contact, setContact] = useState<SiteContactSettings>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getSiteSettings().then((settings) => setContact(settings.contact));
  }, []);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await updateContactSettings(contact);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const field = (key: keyof SiteContactSettings, label: string) => (
    <label className="grid gap-1.5 text-sm font-semibold text-[#142e23]">
      {label}
      <input
        className="rounded-2xl border border-[#cdddc9] bg-white px-4 py-2.5 text-sm text-[#142e23] outline-none focus:border-[#143527] focus:ring-1 focus:ring-[#143527]"
        value={contact[key] || ""}
        onChange={(event) => setContact({ ...contact, [key]: event.target.value })}
      />
    </label>
  );

  return (
    <div className="min-h-screen bg-[#edf4ec] font-sans text-[#142e23]">
      <Navbar />

      <header className="border-b border-[#cdddc9] bg-[#dce8da]">
        <div className="mx-auto max-w-4xl px-5 py-8 sm:px-6 lg:px-8">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#577063] hover:text-[#143527]"
          >
            <ArrowLeft className="h-4 w-4" />
            Admin Dashboard
          </Link>

          <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-[#143527]">
            Platform Settings
          </h1>
          <p className="mt-1 text-sm text-[#577063]">
            Manage helpline contact details, social links, and office information.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-10 sm:px-6 lg:px-8">
        <form onSubmit={onSubmit} className="rounded-3xl border border-[#cdddc9] bg-white p-6 sm:p-8 shadow-xs space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            {field("phone", "Helpline Phone Number")}
            {field("phoneSecondary", "Secondary Phone Number")}
            {field("whatsapp", "WhatsApp Support Number")}
            {field("email", "Contact Email")}
            {field("workingHours", "Working Hours")}
            {field("instagram", "Instagram Link")}
          </div>

          {field("address", "Office Address")}
          {field("mapsUrl", "Google Maps URL")}

          <div className="pt-4 flex items-center justify-between">
            <button
              type="submit"
              className="rounded-full bg-[#143527] px-8 py-3 font-semibold text-white hover:bg-[#0b2017] transition"
            >
              Save Settings
            </button>
            {saved && <p className="text-sm font-semibold text-emerald-700">✓ Settings saved successfully!</p>}
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default AdminSettings;
