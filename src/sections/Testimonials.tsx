import { useEffect, useState } from "react";
import { Quote } from "lucide-react";
import { getPublishedTestimonials } from "../services/testimonialService";
import type { Testimonial } from "../types";

const Testimonials = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedTestimonials()
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="bg-[#edf4ec] py-16 border-t border-[#cdddc9]/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-[#142e23] sm:text-4xl">
          Student stories
        </h2>

        {loading ? null : items.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-[#cdddc9] bg-white p-8 text-center">
            <p className="text-sm font-semibold text-[#142e23]">No student stories in Firebase database yet.</p>
            <p className="mt-1 text-xs text-[#577063]">Published student testimonials from Firebase Firestore will display here.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <article
                key={item.id}
                className="flex flex-col justify-between rounded-2xl border border-[#cdddc9] bg-white p-6 shadow-xs transition-transform hover:-translate-y-1"
              >
                <div>
                  <Quote className="h-5 w-5 text-emerald-800" />
                  <p className="mt-3 text-xs leading-relaxed text-[#142e23]">
                    "{item.message || item.testimonial}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#edf4ec]">
                  <p className="font-heading text-sm font-bold text-[#143527]">{item.name}</p>
                  <p className="text-[11px] text-[#577063]">
                    {[item.course, item.college, item.year].filter(Boolean).join(" · ")}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
