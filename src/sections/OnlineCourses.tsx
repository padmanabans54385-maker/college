import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock3,
  PlayCircle,
  Star,
  Users,
} from "lucide-react";

type Course = {
  category: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  students: string;
  rating: string;
  price: string;
  image: string;
};

const courses: Course[] = [
  {
    category: "Technology",
    title: "Full Stack Web Development",
    description:
      "Learn modern web development and build real-world applications.",
    instructor: "Industry Expert",
    duration: "12 Weeks",
    students: "2.4K Students",
    rating: "4.9",
    price: "₹2,999",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  },
  {
    category: "Business",
    title: "Digital Marketing Masterclass",
    description:
      "Learn practical strategies to grow brands in the digital world.",
    instructor: "Marketing Expert",
    duration: "8 Weeks",
    students: "1.8K Students",
    rating: "4.8",
    price: "₹1,999",
    image:
      "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=1200&q=80",
  },
  {
    category: "Design",
    title: "UI/UX Design Fundamentals",
    description:
      "Master user experience, visual design and modern design systems.",
    instructor: "Design Expert",
    duration: "10 Weeks",
    students: "1.2K Students",
    rating: "4.9",
    price: "₹2,499",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
  },
];

const OnlineCourses = () => {
  return (
    <section
      id="online-courses"
      className="overflow-hidden bg-white px-5 py-24 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

          <div className="max-w-2xl">

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500"
            >
              Learn Online
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl"
            >
              Master new skills.
              <span className="block text-gray-400">
                Build your future.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-5 max-w-xl text-base leading-7 text-gray-600"
            >
              Learn practical skills from experienced professionals
              and prepare yourself for the opportunities ahead.
            </motion.p>

          </div>

          <button className="group flex w-fit items-center gap-2 rounded-full border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-800 transition hover:border-black hover:bg-black hover:text-white">

            Explore All Courses

            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />

          </button>

        </div>

        {/* Course cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {courses.map((course, index) => (
            <motion.article
              key={course.title}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: "-50px",
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -6,
              }}
              className="group overflow-hidden rounded-3xl border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-xl"
            >

              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">

                <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/20" />

                {/* Category */}
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm">
                  {course.category}
                </span>

                {/* Play */}
                <button
                  aria-label={`Preview ${course.title}`}
                  className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:scale-105"
                >
                  <PlayCircle size={20} />
                </button>

              </div>

              {/* Content */}
              <div className="p-6">

                <div className="flex items-center gap-2 text-xs text-gray-500">

                  <div className="flex items-center gap-1">
                    <Star
                      size={14}
                      className="fill-current"
                    />
                    <span className="font-semibold text-gray-700">
                      {course.rating}
                    </span>
                  </div>

                  <span>•</span>

                  <span>{course.students}</span>

                </div>

                <h3 className="mt-3 text-xl font-bold tracking-tight text-gray-950">
                  {course.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                  {course.description}
                </p>

                {/* Instructor */}
                <div className="mt-5 flex items-center gap-2 text-sm text-gray-600">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-700">
                    {course.instructor.charAt(0)}
                  </div>

                  <span>{course.instructor}</span>
                </div>

                {/* Meta */}
                <div className="mt-5 flex items-center gap-5 border-t border-gray-100 pt-5 text-xs text-gray-500">

                  <div className="flex items-center gap-1.5">
                    <Clock3 size={14} />
                    {course.duration}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Users size={14} />
                    {course.students}
                  </div>

                </div>

                {/* Price / CTA */}
                <div className="mt-6 flex items-center justify-between">

                  <div>
                    <span className="text-xs text-gray-400">
                      Starting from
                    </span>

                    <div className="text-xl font-bold text-gray-950">
                      {course.price}
                    </div>
                  </div>

                  <button className="group/button flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-gray-800">

                    View Course

                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover/button:translate-x-1"
                    />

                  </button>

                </div>

              </div>

            </motion.article>
          ))}

        </div>

      </div>
    </section>
  );
};

export default OnlineCourses;