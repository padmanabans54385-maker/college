import { useState, type FormEvent } from "react";
import { Seo } from "../components/Seo";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { useSettings } from "../hooks/SettingsContext";
import { createLead } from "../services/leadService";
import { Mail, MapPin, Phone, Clock, Send, MessageSquare } from "lucide-react";

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

  const fieldClass =
    "w-full rounded-2xl border border-[#cdddc9] bg-[#edf4ec]/40 px-4 py-3 text-sm text-[#142e23] outline-none transition focus:border-[#143527] focus:bg-white focus:ring-2 focus:ring-[#143527]/20";

  return (
    <main className="bg-[#edf4ec] py-12">
      <Seo title="Contact Us" description="Talk to the CollegeCrop team about TNEA guidance and college discovery." path="/contact" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#143527]">
          <MessageSquare className="h-3.5 w-3.5" />
          Get in Touch
        </div>

        <h1 className="mt-4 font-heading text-4xl font-extrabold text-[#142e23] sm:text-5xl">
          Contact <span className="font-serif-italic font-normal italic text-[#143527]">us</span>
        </h1>
        <p className="mt-2 text-base text-[#577063]">
          Have questions about TNEA counselling, cutoff marks, or college admissions? We're here to help.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-12">
          {/* Info Card */}
          <div className="rounded-3xl border border-[#cdddc9] bg-[#dce8da] p-8 shadow-sm md:col-span-5">
            <h2 className="font-heading text-2xl font-bold text-[#142e23]">Direct Helpline</h2>
            <p className="mt-2 text-sm text-[#577063]">Reach out to our admission counsellors anytime.</p>

            <div className="mt-8 space-y-5 text-sm text-[#142e23]">
              {contact.phone && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#143527] shadow-xs">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase text-[#577063]">Phone</span>
                    <a href={`tel:${contact.phone}`} className="font-semibold hover:text-[#143527]">
                      {contact.phone}
                    </a>
                  </div>
                </div>
              )}

              {contact.email && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#143527] shadow-xs">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase text-[#577063]">Email</span>
                    <a href={`mailto:${contact.email}`} className="font-semibold hover:text-[#143527]">
                      {contact.email}
                    </a>
                  </div>
                </div>
              )}

              {contact.address && (
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#143527] shadow-xs">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase text-[#577063]">Location</span>
                    <span className="font-semibold">{contact.address}</span>
                  </div>
                </div>
              )}

              {contact.workingHours && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#143527] shadow-xs">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase text-[#577063]">Hours</span>
                    <span className="font-semibold">{contact.workingHours}</span>
                  </div>
                </div>
              )}
            </div>

            {contact.mapsUrl && (
              <div className="mt-6 border-t border-[#cdddc9] pt-5">
                <a
                  href={contact.mapsUrl}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#143527] hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MapPin className="h-4 w-4" /> Open in Google Maps →
                </a>
              </div>
            )}

            <div className="mt-6">
              <WhatsAppButton source="contact" />
            </div>
          </div>

          {/* Form Card */}
          <form onSubmit={onSubmit} className="grid gap-4 rounded-3xl border border-[#cdddc9] bg-white p-8 shadow-md md:col-span-7">
            <h3 className="font-heading text-xl font-bold text-[#142e23]">Send Us a Message</h3>
            <input name="name" required placeholder="Your full name" className={fieldClass} />
            <input name="phone" required placeholder="Phone number" className={fieldClass} />
            <input name="email" type="email" placeholder="Email address" className={fieldClass} />
            <input name="subject" placeholder="Subject / Preferred Course" className={fieldClass} />
            <textarea name="message" required rows={4} placeholder="Your message or query" className={fieldClass} />

            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#143527] py-3.5 font-semibold text-white shadow-md transition hover:bg-[#0b2017]">
              <span>Send message</span>
              <Send size={16} />
            </button>

            {done && <p className="text-sm font-semibold text-emerald-800">✓ Thanks! We will get back to you shortly.</p>}
          </form>
        </div>
      </div>
    </main>
  );
};

export default Contact;
