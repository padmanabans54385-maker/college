import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Star, Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
    <div className="min-h-screen bg-[#F5F9FC] font-sans text-[#075B63]">
      <Navbar />

      <header className="border-b border-[#E2ECF3] bg-[#E8F4FA]">
        <div className="mx-auto max-w-4xl px-5 py-8 sm:px-6 lg:px-8">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#5A6E78] hover:text-[#075B63]"
          >
            <ArrowLeft className="h-4 w-4" />
            Admin Dashboard
          </Link>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#075B63] text-white">
              <Star size={22} />
            </div>
            <div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight text-[#075B63]">
                Student Testimonials
              </h1>
              <p className="mt-1 text-sm text-[#5A6E78]">
                Only publish genuine student reviews with verified consent.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-10 sm:px-6 lg:px-8">
        <form onSubmit={onSubmit} className="rounded-3xl border border-[#E2ECF3] bg-white p-6 shadow-xs space-y-4">
          <h2 className="font-heading text-xl font-bold text-[#075B63]">Add Student Testimonial</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="name" required placeholder="STUDENT NAME *" className="rounded-2xl border border-[#E2ECF3] bg-white px-4 py-2.5 text-sm text-[#075B63] outline-none focus:border-[#075B63] focus:ring-1 focus:ring-[#075B63]" />
            <input name="course" placeholder="COURSE (e.g. B.E CSE)" className="rounded-2xl border border-[#E2ECF3] bg-white px-4 py-2.5 text-sm text-[#075B63] outline-none focus:border-[#075B63] focus:ring-1 focus:ring-[#075B63]" />
            <input name="college" placeholder="COLLEGE ADMITTED TO" className="rounded-2xl border border-[#E2ECF3] bg-white px-4 py-2.5 text-sm text-[#075B63] outline-none focus:border-[#075B63] focus:ring-1 focus:ring-[#075B63]" />
            <input name="year" placeholder="YEAR OF ADMISSION" className="rounded-2xl border border-[#E2ECF3] bg-white px-4 py-2.5 text-sm text-[#075B63] outline-none focus:border-[#075B63] focus:ring-1 focus:ring-[#075B63]" />
          </div>
          <textarea name="message" required placeholder="TESTIMONIAL CONTENT *" rows={4} className="w-full rounded-2xl border border-[#E2ECF3] bg-white p-4 text-sm text-[#075B63] outline-none focus:border-[#075B63] focus:ring-1 focus:ring-[#075B63]" />
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="published" defaultChecked className="h-5 w-5 rounded-md border-[#E2ECF3] text-[#075B63] focus:ring-[#075B63]" />
            <span className="text-sm font-medium text-[#075B63]">Publish immediately on home page</span>
          </label>
          <button className="flex items-center justify-center gap-2 rounded-full bg-[#075B63] px-8 py-3 text-sm font-semibold text-white hover:bg-[#05434A] transition">
            <Plus size={18} />
            Save Testimonial
          </button>
        </form>

        <div className="mt-8">
          <h2 className="font-heading text-xl font-bold text-[#075B63] mb-4">Saved Testimonials ({items.length})</h2>
          {items.length === 0 ? (
            <div className="rounded-3xl border border-[#E2ECF3] bg-white p-8 text-center text-[#5A6E78]">
              No testimonials added yet.
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.id} className="flex items-center justify-between rounded-2xl border border-[#E2ECF3] bg-white p-4 shadow-xs">
                  <div>
                    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold mr-2 ${item.published ? "border-[#E2ECF3] bg-[#F0F8FD] text-[#075B63]" : "border-amber-200 bg-amber-50 text-amber-800"}`}>
                      {item.published ? "LIVE" : "DRAFT"}
                    </span>
                    <span className="font-bold text-[#075B63]">{item.name}</span>
                    {item.college && <span className="text-[#5A6E78] text-xs"> · {item.college}</span>}
                    <p className="mt-1 text-xs text-[#5A6E78] line-clamp-2">{item.message}</p>
                  </div>
                  <button
                    type="button"
                    className="rounded-full border border-red-200 p-2 text-rose-600 hover:bg-rose-50 shrink-0"
                    onClick={() => deleteDocument("testimonials", item.id).then(reload)}
                    title="Delete testimonial"
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

export default AdminTestimonials;
