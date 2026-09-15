import { useEffect, useState, type FormEvent } from "react";
import Navbar from "../components/Navbar";
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
    <div>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="font-heading text-3xl font-bold">Admission updates</h1>
        <form onSubmit={onSubmit} className="mt-6 grid gap-2 rounded-3xl border bg-white p-5">
          <input name="title" required placeholder="Title" className="rounded-xl border px-3 py-2" />
          <input name="category" required placeholder="Category (TNEA, Scholarships...)" className="rounded-xl border px-3 py-2" />
          <textarea name="summary" required placeholder="Summary" className="rounded-xl border px-3 py-2" />
          <textarea name="content" placeholder="Full content" className="rounded-xl border px-3 py-2" />
          <input name="importantDate" placeholder="Important date" className="rounded-xl border px-3 py-2" />
          <input name="source" placeholder="Official source" className="rounded-xl border px-3 py-2" />
          <input name="sourceUrl" placeholder="Source URL" className="rounded-xl border px-3 py-2" />
          <input name="officialLink" placeholder="Official link" className="rounded-xl border px-3 py-2" />
          <button className="rounded-xl bg-teal-700 py-2 font-semibold text-white">Publish</button>
        </form>
        <ul className="mt-6 space-y-2">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between rounded-xl border bg-white p-3 text-sm">
              <span>{item.title}</span>
              <button type="button" className="text-rose-600" onClick={() => deleteUpdate(item.id).then(reload)}>Delete</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default AdminUpdates;
