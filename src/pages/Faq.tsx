import { useEffect, useMemo, useState } from "react";
import { Seo } from "../components/Seo";
import { EmptyState } from "../components/ui/States";
import { getPublishedFaqs } from "../services/faqService";
import type { FaqItem } from "../types";
import { HelpCircle } from "lucide-react";

const fallback: Omit<FaqItem, "id">[] = [
  { question: "What is TNEA?", answer: "TNEA is Tamil Nadu Engineering Admissions, the official counselling process for participating engineering colleges in Tamil Nadu.", category: "TNEA", published: true },
  { question: "How is the TNEA cutoff calculated?", answer: "The official formula converts your Maths, Physics, and Chemistry marks out of 200. Historical cutoff data helps estimate your admission chances.", category: "Cutoffs", published: true },
  { question: "How should I choose colleges?", answer: "Compare location, fees, courses, historical cutoffs, placements, and facilities, then build a balanced choice list.", category: "College Selection", published: true },
  { question: "How many choices can I include in TNEA?", answer: "Follow the official TNEA limit for the current counselling year to maximize your seat allotment chances.", category: "Choice Filling", published: true },
  { question: "Should I choose government or private colleges?", answer: "It depends on your TNEA rank, budget, branch preference, and location. Compare colleges directly on our platform.", category: "College Selection", published: true },
  { question: "How reliable are cutoff predictions?", answer: "Predictors provide estimates based on multi-year historical data. They serve as valuable guidance, not official seat guarantees.", category: "Cutoffs", published: true },
  { question: "How can I get free counselling support?", answer: "Use the counselling request form or WhatsApp helpline button on CollegeCrop to connect with an advisor.", category: "Counselling", published: true },
];

const Faq = () => {
  const [items, setItems] = useState<FaqItem[]>([]);

  useEffect(() => {
    getPublishedFaqs().then(setItems).catch(() => setItems([]));
  }, []);

  const list = items.length > 0 ? items : fallback.map((item, index) => ({ ...item, id: String(index) }));
  const categories = useMemo(() => Array.from(new Set(list.map((item) => item.category))), [list]);

  return (
    <main className="bg-[#edf4ec] py-12">
      <Seo title="Frequently Asked Questions" description="TNEA, cutoffs, fees, scholarships and counselling FAQs." path="/faq" />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#143527]">
          <HelpCircle className="h-3.5 w-3.5 text-[#143527]" />
          Knowledge Base
        </div>

        <h1 className="mt-4 font-heading text-4xl font-extrabold text-[#142e23] sm:text-5xl">
          Frequently asked <span className="font-serif-italic font-normal italic text-[#143527]">questions</span>
        </h1>
        <p className="mt-2 text-base text-[#577063]">
          Clear answers to common questions about TNEA counselling, cutoff calculations, fees, and college discovery.
        </p>

        {list.length === 0 && (
          <div className="mt-8">
            <EmptyState title="No FAQs" description="FAQs will appear when published." />
          </div>
        )}

        {categories.map((category) => (
          <section key={category} className="mt-8">
            <h2 className="font-heading text-xl font-bold text-[#142e23] border-b border-[#cdddc9] pb-2">{category}</h2>
            <div className="mt-4 space-y-3">
              {list.filter((item) => item.category === category).map((item) => (
                <details key={item.id} className="group rounded-2xl border border-[#cdddc9] bg-white p-5 shadow-xs transition hover:border-[#143527]/40">
                  <summary className="cursor-pointer font-heading text-base font-bold text-[#142e23] list-none flex items-center justify-between">
                    <span>{item.question}</span>
                    <span className="ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6f0e4] text-[#143527] transition group-open:rotate-180">
                      ↓
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-[#465f51] leading-relaxed border-t border-[#cdddc9]/60 pt-3">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
};

export default Faq;
