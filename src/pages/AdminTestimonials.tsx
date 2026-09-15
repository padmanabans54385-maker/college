import { useEffect, useState, type FormEvent } from "react";
import Navbar from "../components/Navbar";
import { createDocument, deleteDocument, getCollection } from "../firebase/firestore";
import type { Testimonial } from "../types";

const AdminTestimonials = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const reload = () => getCollection<Testimonial>("testimonials").then(setItems);
  useEffect(() => { reload(); }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await createDocument("testimonials", {
      name: String(form.get("name")),
      course: String(form.get("course")),
      college: String(form.get("college")),
      year: String(form.get("year")),
      message: String(form.get("message")),
      permissionStatus: true,
      published: form.get("published") === "on",
    });
    event.currentTarget.reset();
    reload();
  };

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="font-heading text-3xl font-bold">Testimonials</h1>
        <p className="mt-2 text-sm text-slate-600">Only publish with permission. Unpublished items stay hidden.</p>
        <form onSubmit={onSubmit} className="mt-6 grid gap-2 rounded-3xl border bg-white p-5">
          <input name="name" required placeholder="Student name" className="rounded-xl border px-3 py-2" />
          <input name="course" placeholder="Course" className="rounded-xl border px-3 py-2" />
          <input name="college" placeholder="College" className="rounded-xl border px-3 py-2" />
          <input name="year" placeholder="Year" className="rounded-xl border px-3 py-2" />
          <textarea name="message" required placeholder="Testimonial" className="rounded-xl border px-3 py-2" />
          <label className="text-sm"><input type="checkbox" name="published" className="mr-2" />Publish</label>
          <button className="rounded-xl bg-teal-700 py-2 font-semibold text-white">Save</button>
        </form>
        <ul className="mt-6 space-y-2">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between rounded-xl border bg-white p-3 text-sm">
              <span>{item.name} {item.published ? "(live)" : "(draft)"}</span>
              <button type="button" className="text-rose-600" onClick={() => deleteDocument("testimonials", item.id).then(reload)}>Delete</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default AdminTestimonials;
