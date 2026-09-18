import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, HelpCircle, Plus, Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { createFaq, deleteFaq, getAllFaqs } from "../services/faqService";
import type { FaqItem } from "../types";

const AdminFaqs = () => {
  const [items, setItems] = useState<FaqItem[]>([]);
  const reload = () => getAllFaqs().then(setItems).catch(() => setItems([]));
  useEffect(() => { reload(); }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await createFaq({
      question: String(form.get("question")),
      answer: String(form.get("answer")),
      category: String(form.get("category")),
      published: true,
    });
    event.currentTarget.reset();
    reload();
  };

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

          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#143527] text-white">
              <HelpCircle size={22} />
            </div>
            <div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight text-[#143527]">
                FAQ Management
              </h1>
              <p className="mt-1 text-sm text-[#577063]">
                Manage public frequently asked questions and answers.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-10 sm:px-6 lg:px-8">
        <form onSubmit={onSubmit} className="rounded-3xl border border-[#cdddc9] bg-white p-6 shadow-xs space-y-4">
          <h2 className="font-heading text-xl font-bold text-[#143527]">Add New FAQ</h2>
          <input name="category" required placeholder="CATEGORY (e.g. TNEA, Admissions)" className="w-full rounded-2xl border border-[#cdddc9] bg-white px-4 py-2.5 text-sm text-[#142e23] outline-none focus:border-[#143527] focus:ring-1 focus:ring-[#143527]" />
          <input name="question" required placeholder="QUESTION *" className="w-full rounded-2xl border border-[#cdddc9] bg-white px-4 py-2.5 text-sm text-[#142e23] outline-none focus:border-[#143527] focus:ring-1 focus:ring-[#143527]" />
          <textarea name="answer" required placeholder="ANSWER *" rows={4} className="w-full rounded-2xl border border-[#cdddc9] bg-white p-4 text-sm text-[#142e23] outline-none focus:border-[#143527] focus:ring-1 focus:ring-[#143527]" />
          <button className="flex items-center justify-center gap-2 rounded-full bg-[#143527] px-8 py-3 text-sm font-semibold text-white hover:bg-[#0b2017] transition">
            <Plus size={18} />
            Add FAQ Item
          </button>
        </form>

        <div className="mt-8">
          <h2 className="font-heading text-xl font-bold text-[#143527] mb-4">Frequently Asked Questions ({items.length})</h2>
          {items.length === 0 ? (
            <div className="rounded-3xl border border-[#cdddc9] bg-white p-8 text-center text-[#577063]">
              No FAQs added yet.
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.id} className="flex items-start justify-between gap-4 rounded-2xl border border-[#cdddc9] bg-white p-4 shadow-xs">
                  <div>
                    <span className="inline-block rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-2.5 py-0.5 text-xs font-semibold text-[#143527] mb-1">
                      {item.category}
                    </span>
                    <p className="font-bold text-[#143527]">{item.question}</p>
                    <p className="mt-1 text-sm text-[#577063] leading-relaxed">{item.answer}</p>
                  </div>
                  <button
                    type="button"
                    className="rounded-full border border-red-200 p-2 text-rose-600 hover:bg-rose-50 shrink-0"
                    onClick={() => deleteFaq(item.id).then(reload)}
                    title="Delete FAQ"
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

export default AdminFaqs;
