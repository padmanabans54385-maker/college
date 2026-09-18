import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Bell, Plus, Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { createUpdate, deleteUpdate, getAllUpdates } from "../services/admissionUpdateService";
import { slugify } from "../utils/display";
import type { AdmissionUpdate } from "../types";

const AdminUpdates = () => {
  const [items, setItems] = useState<AdmissionUpdate[]>([]);
  const reload = () => getAllUpdates().then(setItems).catch(() => setItems([]));
  useEffect(() => { reload(); }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title"));
    await createUpdate({
      title,
      slug: slugify(title),
      category: String(form.get("category")),
      summary: String(form.get("summary")),
      content: String(form.get("content")),
      importantDate: String(form.get("importantDate")),
      source: String(form.get("source")),
      sourceUrl: String(form.get("sourceUrl")),
      officialLink: String(form.get("officialLink")),
      published: true,
    });
    event.currentTarget.reset();
    reload();
  };

  return (
    <div className="min-h-screen bg-[#edf4ec] font-sans text-[#142e23]">
      <Navbar />

      <header className="border-b border-[#cdddc9] bg-[#dce8da]">
        <div className="mx-auto max-w-5xl px-5 py-8 sm:px-6 lg:px-8">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#577063] hover:text-[#143527]"
          >
            <ArrowLeft className="h-4 w-4" />
            Admin Dashboard
          </Link>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#143527] text-white">
              <Bell size={22} />
            </div>
            <div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight text-[#143527]">
                Admission News & Updates
              </h1>
              <p className="mt-1 text-sm text-[#577063]">
                Publish official TNEA news alerts, deadlines, and notifications.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8">
        <form onSubmit={onSubmit} className="rounded-3xl border border-[#cdddc9] bg-white p-6 shadow-xs space-y-4">
          <h2 className="font-heading text-xl font-bold text-[#143527]">Publish New Update</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="title" required placeholder="TITLE *" className="rounded-2xl border border-[#cdddc9] bg-white px-4 py-2.5 text-sm text-[#142e23] outline-none focus:border-[#143527] focus:ring-1 focus:ring-[#143527]" />
            <input name="category" required placeholder="CATEGORY (e.g. TNEA, Counseling)" className="rounded-2xl border border-[#cdddc9] bg-white px-4 py-2.5 text-sm text-[#142e23] outline-none focus:border-[#143527] focus:ring-1 focus:ring-[#143527]" />
          </div>
          <textarea name="summary" required placeholder="SHORT SUMMARY *" rows={2} className="w-full rounded-2xl border border-[#cdddc9] bg-white p-4 text-sm text-[#142e23] outline-none focus:border-[#143527] focus:ring-1 focus:ring-[#143527]" />
          <textarea name="content" placeholder="FULL CONTENT (OPTIONAL)" rows={4} className="w-full rounded-2xl border border-[#cdddc9] bg-white p-4 text-sm text-[#142e23] outline-none focus:border-[#143527] focus:ring-1 focus:ring-[#143527]" />
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="importantDate" placeholder="IMPORTANT DATE" className="rounded-2xl border border-[#cdddc9] bg-white px-4 py-2.5 text-sm text-[#142e23] outline-none focus:border-[#143527] focus:ring-1 focus:ring-[#143527]" />
            <input name="source" placeholder="OFFICIAL SOURCE NAME" className="rounded-2xl border border-[#cdddc9] bg-white px-4 py-2.5 text-sm text-[#142e23] outline-none focus:border-[#143527] focus:ring-1 focus:ring-[#143527]" />
            <input name="sourceUrl" placeholder="SOURCE URL" className="rounded-2xl border border-[#cdddc9] bg-white px-4 py-2.5 text-sm text-[#142e23] outline-none focus:border-[#143527] focus:ring-1 focus:ring-[#143527]" />
            <input name="officialLink" placeholder="OFFICIAL LINK" className="rounded-2xl border border-[#cdddc9] bg-white px-4 py-2.5 text-sm text-[#142e23] outline-none focus:border-[#143527] focus:ring-1 focus:ring-[#143527]" />
          </div>
          <button className="flex items-center justify-center gap-2 rounded-full bg-[#143527] px-8 py-3 text-sm font-semibold text-white hover:bg-[#0b2017] transition">
            <Plus size={18} />
            Publish Update
          </button>
        </form>

        <div className="mt-8">
          <h2 className="font-heading text-xl font-bold text-[#143527] mb-4">Published Updates ({items.length})</h2>
          {items.length === 0 ? (
            <div className="rounded-3xl border border-[#cdddc9] bg-white p-8 text-center text-[#577063]">
              No updates published yet.
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.id} className="flex items-center justify-between rounded-2xl border border-[#cdddc9] bg-white p-4 shadow-xs">
                  <div>
                    <span className="inline-block rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-2.5 py-0.5 text-xs font-semibold text-[#143527] mr-2">
                      {item.category}
                    </span>
                    <span className="font-semibold text-[#142e23]">{item.title}</span>
                  </div>
                  <button
                    type="button"
                    className="rounded-full border border-red-200 p-2 text-rose-600 hover:bg-rose-50"
                    onClick={() => deleteUpdate(item.id).then(reload)}
                    title="Delete update"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminUpdates;
