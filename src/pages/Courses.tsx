import { useEffect, useMemo, useState } from "react";
import { BookOpen, Search } from "lucide-react";
import { Link } from "react-router-dom";

import {
  getCourseCategories,
  getPublishedCourses,
} from "../services/courseService";

import type {
  Course,
  CourseCategory,
} from "../types";

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<CourseCategory[]>([]);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    Promise.all([
      getPublishedCourses(),
      getCourseCategories(),
    ]).then(([courseData, categoryData]) => {
      setCourses(courseData);
      setCategories(categoryData);
    });
  }, []);

  const filteredCourses = useMemo(() => {
    const value = search.toLowerCase().trim();

    return courses.filter((course) => {
      const matchesSearch =
        !value ||
        course.name.toLowerCase().includes(value) ||
        course.categoryName.toLowerCase().includes(value);

      const matchesCategory =
        !categoryId ||
        course.categoryId === categoryId;

      return matchesSearch && matchesCategory;
    });
  }, [courses, search, categoryId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold">
              Explore Courses
            </span>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-gray-950 md:text-6xl">
              Find the right course for your future.
            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Explore courses, eligibility, duration and
              colleges offering them.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 md:flex-row">
            <div className="flex flex-1 items-center rounded-2xl border bg-white px-5 shadow-sm">
              <Search
                size={20}
                className="text-gray-400"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search course..."
                className="w-full bg-transparent px-3 py-4 outline-none"
              />
            </div>

            <select
              value={categoryId}
              onChange={(event) =>
                setCategoryId(event.target.value)
              }
              className="rounded-2xl border bg-white px-5 py-4 outline-none"
            >
              <option value="">
                All Categories
              </option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-7 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {filteredCourses.length} Courses
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              className="group rounded-3xl border bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
                <BookOpen size={21} />
              </div>

              <p className="mt-6 text-sm font-semibold text-gray-500">
                {course.categoryName}
              </p>

              <h3 className="mt-2 text-xl font-bold text-gray-950 group-hover:underline">
                {course.name}
              </h3>

              <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                {course.description ||
                  "Explore this course and discover colleges offering it."}
              </p>

              <div className="mt-6 flex items-center justify-between border-t pt-5 text-sm">
                <span>
                  {course.duration || "Duration varies"}
                </span>

                <span className="font-semibold">
                  View Details →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="rounded-3xl border bg-white p-16 text-center">
            <BookOpen
              className="mx-auto text-gray-300"
              size={48}
            />

            <h3 className="mt-5 text-xl font-bold">
              No courses found
            </h3>

            <p className="mt-2 text-gray-500">
              Try another course name or category.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Courses;