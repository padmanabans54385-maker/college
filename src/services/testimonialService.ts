import {
  getCollection,
  where,
} from "../firebase/firestore";

import type { Testimonial } from "../types";

export const getPublishedTestimonials =
  async () => {
    return await getCollection<Testimonial>(
      "testimonials",
      [
        where(
          "published",
          "==",
          true
        ),
      ]
    );
  };