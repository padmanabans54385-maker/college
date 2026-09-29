export const brand = {
  name: "Go2College",
  tagline: "Your Future, Elevated",
  supportingTagline: "Premier Higher Education & Academic Growth Platform",
  description:
    "Discover premier colleges, explore top academic programs, predict admission possibilities, and elevate your future with expert guidance.",
  heroHeadline: "Your Future Starts With the Right College",
  heroSubheadline:
    "Explore top institutions, compare career-oriented courses, get 1-on-1 counseling, and navigate your college admission journey with confidence.",
  logoSrc: "/logo.png",
  colors: {
    darkTeal: "#075B63",
    primaryBlue: "#168FD0",
    lightBlue: "#4DB3E8",
    blueBg: "#F0F8FD",
    bgPage: "#F5F9FC",
    darkText: "#172B35",
    mutedText: "#5A6E78",
  },
  images: {
    capBooks: "/images/img1-cap-books.jpg",
    bookStack: "/images/img2-book-stack.jpg",
    students: "/images/img3-students.jpg",
    writingBooks: "/images/img4-writing-books.jpg",
    campus: "/images/img5-campus.jpg",
    fallback: "/images/img5-campus.jpg",
  },
  year: new Date().getFullYear(),
} as const;

export const unavailableCopy = "Information currently unavailable.";
