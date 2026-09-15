import { useEffect, useState, type FormEvent } from "react";
import Navbar from "../components/Navbar";
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
  };

  const field = (key: keyof SiteContactSettings, label: string) => (
    <label className="grid gap-1 text-sm">
      {label}
      <input
        className="rounded-xl border px-3 py-2"
        value={contact[key] || ""}
        onChange={(event) => setContact({ ...contact, [key]: event.target.value })}
      />
    </label>
  );

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="font-heading text-3xl font-bold">Settings</h1>
        <form onSubmit={onSubmit} className="mt-6 grid gap-3">
          {field("phone", "Phone")}
          {field("phoneSecondary", "Secondary phone")}
          {field("whatsapp", "WhatsApp number")}
          {field("email", "Email")}
          {field("address", "Address")}
          {field("mapsUrl", "Google Maps URL")}
          {field("workingHours", "Working hours")}
          {field("instagram", "Instagram")}
          <button className="rounded-xl bg-teal-700 py-2.5 font-semibold text-white">Save</button>
          {saved && <p className="text-sm text-emerald-700">Saved.</p>}
        </form>
      </main>
    </div>
  );
};

export default AdminSettings;
