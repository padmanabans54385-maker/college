import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowLeft,
  BookOpen,
  Edit3,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  createOnlineCourse,
  deleteOnlineCourse,
  getOnlineCourses,
  updateOnlineCourse,
} from "../services/onlineCourseService";

import type {
  OnlineCourse,
} from "../types";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const emptyForm = {
  title: "",
  category: "",
  description: "",
  instructor: "",
  duration: "",
  level:
    "beginner" as OnlineCourse["level"],
  price: "0",
  image: "",
  lessons: "1",
  published: true,
};

const AdminOnlineCourses = () => {
  const [courses, setCourses] =
    useState<OnlineCourse[]>([]);

  const [editing, setEditing] =
    useState<OnlineCourse | null>(null);

  const [form, setForm] =
    useState(emptyForm);

  const [showForm, setShowForm] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const load = async () => {
    setLoading(true);

    try {
      setCourses(
        await getOnlineCourses()
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => { load(); })();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (
    course: OnlineCourse
  ) => {
    setEditing(course);

    setForm({
      title: course.title,
      category: course.category,
      description: course.description,
      instructor: course.instructor,
      duration: course.duration,
      level: course.level,
      price: String(course.price),
      image: course.image ?? "",
      lessons: String(course.lessons),
      published: course.published,
    });

    setShowForm(true);
  };

  const save = async () => {
    if (!form.title.trim()) {
      alert("Course title is required.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      slug: slugify(form.title),
      category: form.category.trim(),
      description:
        form.description.trim(),
      instructor:
        form.instructor.trim(),
      duration:
        form.duration.trim(),
      level: form.level,
      price:
        Number(form.price) || 0,
      image:
        form.image.trim(),
      lessons:
        Number(form.lessons) || 1,
      published:
        form.published,
    };

    if (editing) {
      await updateOnlineCourse(
        editing.id,
        payload
      );
    } else {
      await createOnlineCourse(
        payload
      );
    }

    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);

    await load();
  };

  const remove = async (
    course: OnlineCourse
  ) => {
    if (
      !window.confirm(
        `Delete "${course.title}"?`
      )
    ) {
      return;
    }

    await deleteOnlineCourse(
      course.id
    );

    await load();
  };

  return (
    <div className="min-h-screen bg-[#edf4ec] font-sans text-[#142e23]">
      <Navbar />

      <header className="border-b border-[#cdddc9] bg-[#dce8da]">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#577063] hover:text-[#143527]"
          >
            <ArrowLeft className="h-4 w-4" />
            Admin Dashboard
          </Link>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#143527] text-white">
                <BookOpen size={22} />
              </div>

              <div>
                <h1 className="font-heading text-3xl font-extrabold tracking-tight text-[#143527]">
                  Online Courses
                </h1>

                <p className="mt-1 text-sm text-[#577063]">
                  Manage online learning content
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={openCreate}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#143527] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0b2017] transition"
            >
              <Plus size={18} />
              Add Course
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Stat
            label="Total Courses"
            value={courses.length}
          />

          <Stat
            label="Published"
            value={
              courses.filter(
                (course) =>
                  course.published
              ).length
            }
          />

          <Stat
            label="Drafts"
            value={
              courses.filter(
                (course) =>
                  !course.published
              ).length
            }
          />
        </div>

        {loading ? (
          <div className="rounded-2xl border bg-white p-12 text-center">
            Loading...
          </div>
        ) : (
          <div className="space-y-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="rounded-2xl border bg-white p-6"
              >
                <div className="flex flex-col justify-between gap-5 md:flex-row">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-bold">
                        {course.title}
                      </h2>

                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold">
                        {course.category}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          course.published
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {course.published
                          ? "Published"
                          : "Draft"}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                      {course.instructor}
                    </p>

                    <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">
                      {course.description}
                    </p>

                    <div className="mt-4 flex gap-5 text-sm text-gray-500">
                      <span>
                        {course.lessons} lessons
                      </span>

                      <span>
                        {course.duration}
                      </span>

                      <span>
                        {course.price === 0
                          ? "Free"
                          : `₹${course.price}`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <button
                      onClick={() =>
                        openEdit(course)
                      }
                      className="rounded-xl border p-3"
                    >
                      <Edit3 size={18} />
                    </button>

                    <button
                      onClick={() =>
                        remove(course)
                      }
                      className="rounded-xl border border-red-200 p-3 text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-7">
            <div className="mb-7 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {editing
                  ? "Edit Online Course"
                  : "Add Online Course"}
              </h2>

              <button
                onClick={() =>
                  setShowForm(false)
                }
              >
                <X />
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Course Title"
                value={form.title}
                onChange={(value) =>
                  setForm({
                    ...form,
                    title: value,
                  })
                }
              />

              <Field
                label="Category"
                value={form.category}
                onChange={(value) =>
                  setForm({
                    ...form,
                    category: value,
                  })
                }
              />

              <Field
                label="Instructor"
                value={form.instructor}
                onChange={(value) =>
                  setForm({
                    ...form,
                    instructor: value,
                  })
                }
              />

              <Field
                label="Duration"
                value={form.duration}
                onChange={(value) =>
                  setForm({
                    ...form,
                    duration: value,
                  })
                }
                placeholder="6 Weeks"
              />

              <Field
                label="Lessons"
                value={form.lessons}
                onChange={(value) =>
                  setForm({
                    ...form,
                    lessons: value,
                  })
                }
              />

              <Field
                label="Price"
                value={form.price}
                onChange={(value) =>
                  setForm({
                    ...form,
                    price: value,
                  })
                }
                placeholder="0 for free"
              />

              <Field
                label="Image URL"
                value={form.image}
                onChange={(value) =>
                  setForm({
                    ...form,
                    image: value,
                  })
                }
              />

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Level
                </label>

                <select
                  value={form.level}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      level:
                        event.target
                          .value as OnlineCourse["level"],
                    })
                  }
                  className="w-full rounded-xl border px-4 py-3 outline-none"
                >
                  <option value="beginner">
                    Beginner
                  </option>

                  <option value="intermediate">
                    Intermediate
                  </option>

                  <option value="advanced">
                    Advanced
                  </option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold">
                  Description
                </label>

                <textarea
                  rows={5}
                  value={form.description}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      description:
                        event.target.value,
                    })
                  }
                  className="w-full rounded-xl border px-4 py-3 outline-none"
                />
              </div>

              <label className="flex items-center gap-3 md:col-span-2">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      published:
                        event.target.checked,
                    })
                  }
                />

                <span className="text-sm font-semibold">
                  Publish course
                </span>
              </label>
            </div>

            <div className="mt-7 flex justify-end gap-3">
              <button
                onClick={() =>
                  setShowForm(false)
                }
                className="rounded-xl border px-5 py-3 font-semibold"
              >
                Cancel
              </button>

              <button
                onClick={save}
                className="rounded-xl bg-black px-6 py-3 font-semibold text-white"
              >
                {editing
                  ? "Update Course"
                  : "Create Course"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

const Field = ({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) => (
  <div>
    <label className="mb-2 block text-sm font-semibold text-[#142e23]">
      {label}
    </label>

    <input
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
      placeholder={placeholder}
      className="w-full rounded-2xl border border-[#cdddc9] px-4 py-3 text-sm text-[#142e23] outline-none focus:border-[#143527]"
    />
  </div>
);

const Stat = ({
  label,
  value,
}: {
  label: string;
  value: number;
}) => (
  <div className="rounded-3xl border border-[#cdddc9] bg-white p-6 shadow-xs">
    <p className="text-xs font-semibold uppercase tracking-wider text-[#577063]">
      {label}
    </p>

    <p className="mt-2 font-heading text-3xl font-extrabold text-[#143527]">
      {value}
    </p>
  </div>
);

export default AdminOnlineCourses;