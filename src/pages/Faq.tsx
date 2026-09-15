import { useEffect, useMemo, useState } from "react";
import { Seo } from "../components/Seo";
import { EmptyState } from "../components/ui/States";
import { getPublishedFaqs } from "../services/faqService";
import type { FaqItem } from "../types";

const fallback: Omit<FaqItem, "id">[] = [
  { question: "What is TNEA?", answer: "TNEA is Tamil Nadu Engineering Admissions, the counselling process for participating engineering colleges.", category: "TNEA", published: true },
  { question: "How is the TNEA cutoff calculated?", answer: "The official formula is published by the counselling authority. This site does not replace official calculation rules.", category: "Cutoffs", published: true },
  { question: "How should I choose colleges?", answer: "Compare location, fees, courses, historical cut-offs and facilities, then build a balanced choice list.", category: "College Selection", published: true },
  { question: "How many choices can I include?", answer: "Follow the official TNEA limit for the current year.", category: "Choice Filling", published: true },
  { question: "Should I choose government or private colleges?", answer: "It depends on rank, budget, branch and location. Compare options instead of assuming one type is always better.", category: "College Selection", published: true },
  { question: "How reliable are cutoff predictions?", answer: "They are estimates from historical data, not guarantees.", category: "Cutoffs", published: true },
  { question: "How can I get counselling?", answer: "Use the counselling request form or WhatsApp CTA on this website.", category: "Counselling", published: true },
];

const Faq = () => {
  const [items, setItems] = useState<FaqItem[]>([]);

  useEffect(() => {
    getPublishedFaqs().then(setItems).catch(() => setItems([]));
  }, []);

  const list = items.length > 0 ? items : fallback.map((item, index) => ({ ...item, id: String(index) }));
  const categories = useMemo(() => Array.from(new Set(list.map((item) => item.category))), [list]);

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <Seo title="Frequently Asked Questions" description="TNEA, cutoffs, fees, scholarships and counselling FAQs." path="/faq" />
      <h1 className="font-heading text-4xl font-extrabold">Frequently asked questions</h1>
      {list.length === 0 && <EmptyState title="No FAQs" description="FAQs will appear when published." />}
      {categories.map((category) => (
        <section key={category} className="mt-8">
          <h2 className="font-heading text-xl font-bold">{category}</h2>
          <div className="mt-3 space-y-3">
            {list.filter((item) => item.category === category).map((item) => (
              <details key={item.id} className="rounded-2xl border bg-white p-4">
                <summary className="cursor-pointer font-semibold">{item.question}</summary>
                <p className="mt-2 text-sm text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
};

export default Faq;
