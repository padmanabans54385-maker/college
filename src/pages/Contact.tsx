import { useState, type FormEvent } from "react";
import { Seo } from "../components/Seo";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { useSettings } from "../hooks/SettingsContext";
import { createLead } from "../services/leadService";

const Contact = () => {
  const { contact } = useSettings();
  const [done, setDone] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await createLead({
      name: String(form.get("name")),
      phone: String(form.get("phone")),
      email: String(form.get("email")),
      source: "contact",
      interest: String(form.get("subject")),
      message: String(form.get("message")),
    });
    setDone(true);
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <Seo title="Contact Us" description="Talk to the Go2College team about TNEA guidance and college discovery." path="/contact" />
      <h1 className="font-heading text-4xl font-extrabold">Contact us</h1>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="space-y-3 text-sm text-slate-700">
          {contact.phone && <p>Phone: {contact.phone}</p>}
          {contact.email && <p>Email: {contact.email}</p>}
          {contact.address && <p>Address: {contact.address}</p>}
          {contact.workingHours && <p>Hours: {contact.workingHours}</p>}
          {contact.mapsUrl && (
            <a href={contact.mapsUrl} className="text-teal-700 font-semibold" target="_blank" rel="noreferrer">
              Open in Google Maps
            </a>
          )}
          <WhatsAppButton source="contact" />
        </div>
        <form onSubmit={onSubmit} className="grid gap-3 rounded-3xl border bg-white p-6">
          <input name="name" required placeholder="Name" className="rounded-xl border px-3 py-2.5 text-sm" />
          <input name="phone" required placeholder="Phone" className="rounded-xl border px-3 py-2.5 text-sm" />
          <input name="email" type="email" placeholder="Email" className="rounded-xl border px-3 py-2.5 text-sm" />
          <input name="subject" placeholder="Subject" className="rounded-xl border px-3 py-2.5 text-sm" />
          <textarea name="message" required rows={4} placeholder="Message" className="rounded-xl border px-3 py-2.5 text-sm" />
          <button className="rounded-xl bg-teal-700 py-2.5 text-sm font-semibold text-white">Send</button>
          {done && <p className="text-sm text-emerald-700">Thanks. We will get back to you.</p>}
        </form>
      </div>
    </main>
  );
};

export default Contact;
