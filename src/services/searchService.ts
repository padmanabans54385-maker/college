import { getCollection } from "../firebase/firestore";
import type { AdmissionUpdate, BlogPost, College, Course } from "../types";

export interface SearchHit {
  type: "college" | "course" | "city" | "update" | "blog";
  id: string;
  title: string;
  subtitle?: string;
  href: string;
}

export const globalSearch = async (term: string): Promise<SearchHit[]> => {
  const q = term.trim().toLowerCase();
  if (q.length < 2) return [];

  const [colleges, courses, updates, blogs] = await Promise.all([
    getCollection<College>("colleges"),
    getCollection<Course>("courses"),
    getCollection<AdmissionUpdate>("admission_updates"),
    getCollection<BlogPost>("blogs"),
  ]);

  const hits: SearchHit[] = [];

  colleges.forEach((college) => {
    const blob = [college.name, college.location, college.district, college.city, college.university]
      .join(" ")
      .toLowerCase();
    if (blob.includes(q)) {
      hits.push({
        type: "college",
        id: college.id,
        title: college.name,
        subtitle: college.location,
        href: `/colleges/${college.id}`,
      });
    }
    const city = college.city || college.district;
    if (city && city.toLowerCase().includes(q)) {
      hits.push({
        type: "city",
        id: `city-${city}`,
        title: city,
        subtitle: "Location",
        href: `/colleges?district=${encodeURIComponent(city)}`,
      });
    }
  });

  courses
    .filter((course) => !("published" in course) || course.published)
    .forEach((course) => {
      if (
        course.name.toLowerCase().includes(q) ||
        course.categoryName?.toLowerCase().includes(q)
      ) {
        hits.push({
          type: "course",
          id: course.id,
          title: course.name,
          subtitle: course.categoryName,
          href: `/courses/${course.id}`,
        });
      }
    });

  updates
    .filter((item) => item.published)
    .forEach((item) => {
      if (item.title.toLowerCase().includes(q) || item.category?.toLowerCase().includes(q)) {
        hits.push({
          type: "update",
          id: item.id,
          title: item.title,
          subtitle: item.category,
          href: `/updates`,
        });
      }
    });

  blogs
    .filter((item) => item.published)
    .forEach((item) => {
      if (item.title.toLowerCase().includes(q)) {
        hits.push({
          type: "blog",
          id: item.id,
          title: item.title,
          subtitle: item.category,
          href: `/blog/${item.slug}`,
        });
      }
    });

  const unique = new Map<string, SearchHit>();
  hits.forEach((hit) => unique.set(`${hit.type}-${hit.id}`, hit));
  return Array.from(unique.values()).slice(0, 12);
};
