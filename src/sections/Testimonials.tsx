import { useEffect, useState } from "react";
import { Quote } from "lucide-react";
import { getPublishedTestimonials } from "../services/testimonialService";
import type { Testimonial } from "../types";

const Testimonials = () => {
  const [items, setItems] = useState<Testimonial[]>([]);

  useEffect(() => {
    getPublishedTestimonials()
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-extrabold">Student stories</h2>
        <p className="mt-2 text-sm text-slate-600">Published only with permission, from real submissions.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="rounded-3xl border border-slate-200 bg-white p-6">
              <Quote className="h-5 w-5 text-teal-700" />
              <p className="mt-3 text-sm leading-6 text-slate-700">
                {item.message || item.testimonial}
              </p>
              <p className="mt-4 font-semibold">{item.name}</p>
              <p className="text-xs text-slate-500">
                {[item.course, item.college, item.year].filter(Boolean).join(" · ")}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
