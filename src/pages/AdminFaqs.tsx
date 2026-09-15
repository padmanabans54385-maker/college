import { useEffect, useState, type FormEvent } from "react";
import Navbar from "../components/Navbar";
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
    <div>
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="font-heading text-3xl font-bold">FAQs</h1>
        <form onSubmit={onSubmit} className="mt-6 grid gap-2 rounded-3xl border bg-white p-5">
          <input name="category" required placeholder="Category" className="rounded-xl border px-3 py-2" />
          <input name="question" required placeholder="Question" className="rounded-xl border px-3 py-2" />
          <textarea name="answer" required placeholder="Answer" className="rounded-xl border px-3 py-2" />
          <button className="rounded-xl bg-teal-700 py-2 font-semibold text-white">Add FAQ</button>
        </form>
        <ul className="mt-6 space-y-2">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between rounded-xl border bg-white p-3 text-sm">
              <span>{item.question}</span>
              <button type="button" className="text-rose-600" onClick={() => deleteFaq(item.id).then(reload)}>Delete</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default AdminFaqs;
