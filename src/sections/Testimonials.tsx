import { useEffect, useState } from "react";
import { getPublishedTestimonials } from "../services/testimonialService";
import type { Testimonial } from "../types";
import { GraduationCapIcon } from "../components/icons/AcademicIcons";

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
    <section className="bg-[#F5F9FC] py-16 border-t border-[#E2ECF3]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-[#075B63] sm:text-4xl">
          Student stories
        </h2>

        {loading ? null : items.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-[#E2ECF3] bg-white p-8 text-center">
            <p className="font-poppins text-sm font-semibold text-[#075B63]">
              No student stories in Firebase database yet.
            </p>
            <p className="mt-1 font-poppins text-xs text-[#5A6E78]">
              Published student testimonials from Firebase Firestore will display here.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <article key={item.id} className="academic-card flex flex-col justify-between p-6">
                <div>
                  <GraduationCapIcon size={22} className="text-[#168FD0]" />
                  <p className="mt-3 font-poppins text-sm leading-relaxed text-[#172B35]">
                    "{item.message || item.testimonial}"
                  </p>
                </div>
                <div className="mt-6 border-t border-[#E2ECF3] pt-4">
                  <p className="font-heading text-sm font-bold text-[#075B63]">{item.name}</p>
                  <p className="font-poppins text-[11px] text-[#5A6E78]">
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
