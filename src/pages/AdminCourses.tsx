import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  Edit3,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

import {
  createCourse,
  createCourseCategory,
  deleteCourse,
  deleteCourseCategory,
  getCourseCategories,
  getCourses,
  updateCourse,
  updateCourseCategory,
} from "../services/courseService";

import { getColleges } from "../services/collegeService";

import type {
  College,
  Course,
  CourseCategory,
} from "../types";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const AdminCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<CourseCategory[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);

  const [search, setSearch] = useState("");

  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const [editingCourse, setEditingCourse] =
    useState<Course | null>(null);

  const [editingCategory, setEditingCategory] =
    useState<CourseCategory | null>(null);

  const [courseForm, setCourseForm] = useState({
    name: "",
    categoryId: "",
    description: "",
    duration: "",
    eligibility: "",
    collegeIds: [] as string[],
    published: true,
  });

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
    icon: "BookOpen",
  });

  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);

    try {
      const [courseData, categoryData, collegeData] =
        await Promise.all([
          getCourses(),
          getCourseCategories(),
          getColleges(),
        ]);

      setCourses(courseData);
      setCategories(categoryData);
      setColleges(collegeData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => { loadData(); })();
  }, []);

  const filteredCourses = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return courses;

    return courses.filter(
      (course) =>
        course.name.toLowerCase().includes(value) ||
        course.categoryName.toLowerCase().includes(value)
    );
  }, [courses, search]);

  const resetCourseForm = () => {
    setCourseForm({
      name: "",
      categoryId: categories[0]?.id ?? "",
      description: "",
      duration: "",
      eligibility: "",
      collegeIds: [],
      published: true,
    });

    setEditingCourse(null);
  };

  const openCreateCourse = () => {
    resetCourseForm();
    setShowCourseForm(true);
  };

  const openEditCourse = (course: Course) => {
    setEditingCourse(course);

    setCourseForm({
      name: course.name,
      categoryId: course.categoryId,
      description: course.description,
      duration: course.duration,
      eligibility: course.eligibility,
      collegeIds: course.collegeIds ?? [],
      published: course.published,
    });

    setShowCourseForm(true);
  };

  const saveCourse = async () => {
    if (!courseForm.name.trim()) {
      alert("Course name is required.");
      return;
    }

    if (!courseForm.categoryId) {
      alert("Please select a category.");
      return;
    }

    const category = categories.find(
      (item) => item.id === courseForm.categoryId
    );

    if (!category) return;

    const payload = {
      name: courseForm.name.trim(),
      slug: slugify(courseForm.name),
      categoryId: category.id,
      categoryName: category.name,
      description: courseForm.description.trim(),
      duration: courseForm.duration.trim(),
      eligibility: courseForm.eligibility.trim(),
      collegeIds: courseForm.collegeIds,
      published: courseForm.published,
    };

    if (editingCourse) {
      await updateCourse(editingCourse.id, payload);
    } else {
      await createCourse(payload);
    }

    setShowCourseForm(false);
    resetCourseForm();
    await loadData();
  };

  const toggleCollege = (collegeId: string) => {
    setCourseForm((current) => ({
      ...current,
      collegeIds: current.collegeIds.includes(collegeId)
        ? current.collegeIds.filter((id) => id !== collegeId)
        : [...current.collegeIds, collegeId],
    }));
  };

  const saveCategory = async () => {
    if (!categoryForm.name.trim()) {
      alert("Category name is required.");
      return;
    }

    const payload = {
      name: categoryForm.name.trim(),
      slug: slugify(categoryForm.name),
      description: categoryForm.description.trim(),
      icon: categoryForm.icon.trim(),
    };

    if (editingCategory) {
      await updateCourseCategory(
        editingCategory.id,
        payload
      );
    } else {
      await createCourseCategory(payload);
    }

    setShowCategoryForm(false);
    setEditingCategory(null);

    setCategoryForm({
      name: "",
      description: "",
      icon: "BookOpen",
    });

    await loadData();
  };

  const openEditCategory = (
    category: CourseCategory
  ) => {
    setEditingCategory(category);

    setCategoryForm({
      name: category.name,
      description: category.description ?? "",
      icon: category.icon ?? "BookOpen",
    });

    setShowCategoryForm(true);
  };

  const removeCourse = async (course: Course) => {
    const confirmed = window.confirm(
      `Delete "${course.name}"?`
    );

    if (!confirmed) return;

    await deleteCourse(course.id);
    await loadData();
  };

  const removeCategory = async (
    category: CourseCategory
  ) => {
    const hasCourses = courses.some(
      (course) => course.categoryId === category.id
    );

    if (hasCourses) {
      alert(
        "This category contains courses. Move or delete those courses first."
      );
      return;
    }

    const confirmed = window.confirm(
      `Delete "${category.name}"?`
    );

    if (!confirmed) return;

    await deleteCourseCategory(category.id);
    await loadData();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
                <BookOpen size={21} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-950">
                  Course Management
                </h1>

                <p className="text-sm text-gray-500">
                  Manage courses and course categories
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setEditingCategory(null);
                setCategoryForm({
                  name: "",
                  description: "",
                  icon: "BookOpen",
                });
                setShowCategoryForm(true);
              }}
              className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold hover:bg-gray-50"
            >
              Categories
            </button>

            <button
              onClick={openCreateCourse}
              className="flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              <Plus size={18} />
              Add Course
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-gray-500">
              Total Courses
            </p>

            <p className="mt-2 text-3xl font-bold">
              {courses.length}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-gray-500">
              Categories
            </p>

            <p className="mt-2 text-3xl font-bold">
              {categories.length}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-gray-500">
              Published
            </p>

            <p className="mt-2 text-3xl font-bold">
              {courses.filter((c) => c.published).length}
            </p>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-3 rounded-2xl border bg-white px-4">
          <Search size={19} className="text-gray-400" />

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search courses..."
            className="w-full bg-transparent py-4 outline-none"
          />
        </div>

        {loading ? (
          <div className="rounded-2xl border bg-white p-12 text-center text-gray-500">
            Loading courses...
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="rounded-2xl border bg-white p-6"
              >
                <div className="flex flex-col justify-between gap-5 md:flex-row">
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-bold">
                        {course.name}
                      </h2>

                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold">
                        {course.categoryName}
                      </span>

                      {course.published ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          Published
                        </span>
                      ) : (
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                          Draft
                        </span>
                      )}
                    </div>

                    <p className="max-w-3xl text-sm leading-6 text-gray-600">
                      {course.description ||
                        "No description added."}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-5 text-sm text-gray-500">
                      <span>
                        Duration:{" "}
                        <strong className="text-gray-800">
                          {course.duration || "Not specified"}
                        </strong>
                      </span>

                      <span>
                        Colleges:{" "}
                        <strong className="text-gray-800">
                          {course.collegeIds?.length ?? 0}
                        </strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <button
                      onClick={() => openEditCourse(course)}
                      className="rounded-xl border p-3 hover:bg-gray-50"
                    >
                      <Edit3 size={18} />
                    </button>

                    <button
                      onClick={() => removeCourse(course)}
                      className="rounded-xl border border-red-200 p-3 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredCourses.length === 0 && (
              <div className="rounded-2xl border bg-white p-12 text-center">
                <BookOpen
                  className="mx-auto text-gray-300"
                  size={40}
                />

                <h3 className="mt-4 font-semibold">
                  No courses found
                </h3>
              </div>
            )}
          </div>
        )}
      </main>

      {/* COURSE MODAL */}

      {showCourseForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-7">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {editingCourse
                    ? "Edit Course"
                    : "Add Course"}
                </h2>

                <p className="text-sm text-gray-500">
                  Add course information and link colleges.
                </p>
              </div>

              <button
                onClick={() => setShowCourseForm(false)}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Course Name
                </label>

                <input
                  value={courseForm.name}
                  onChange={(event) =>
                    setCourseForm({
                      ...courseForm,
                      name: event.target.value,
                    })
                  }
                  placeholder="Example: B.Sc Computer Science"
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Category
                </label>

                <select
                  value={courseForm.categoryId}
                  onChange={(event) =>
                    setCourseForm({
                      ...courseForm,
                      categoryId: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border px-4 py-3 outline-none"
                >
                  <option value="">
                    Select category
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

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Description
                </label>

                <textarea
                  rows={4}
                  value={courseForm.description}
                  onChange={(event) =>
                    setCourseForm({
                      ...courseForm,
                      description: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border px-4 py-3 outline-none"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Duration
                  </label>

                  <input
                    value={courseForm.duration}
                    onChange={(event) =>
                      setCourseForm({
                        ...courseForm,
                        duration: event.target.value,
                      })
                    }
                    placeholder="3 Years"
                    className="w-full rounded-xl border px-4 py-3 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Eligibility
                  </label>

                  <input
                    value={courseForm.eligibility}
                    onChange={(event) =>
                      setCourseForm({
                        ...courseForm,
                        eligibility: event.target.value,
                      })
                    }
                    placeholder="12th Pass"
                    className="w-full rounded-xl border px-4 py-3 outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-sm font-semibold">
                    Available Colleges
                  </label>

                  <span className="text-xs text-gray-500">
                    {courseForm.collegeIds.length} selected
                  </span>
                </div>

                <div className="max-h-64 overflow-y-auto rounded-xl border">
                  {colleges.map((college) => {
                    const selected =
                      courseForm.collegeIds.includes(
                        college.id
                      );

                    return (
                      <button
                        type="button"
                        key={college.id}
                        onClick={() =>
                          toggleCollege(college.id)
                        }
                        className={`flex w-full items-center justify-between border-b px-4 py-3 text-left last:border-0 ${
                          selected
                            ? "bg-gray-100"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <div>
                          <p className="font-medium">
                            {college.name}
                          </p>

                          <p className="text-xs text-gray-500">
                            {college.district},{" "}
                            {college.state}
                          </p>
                        </div>

                        {selected && (
                          <Check size={18} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={courseForm.published}
                  onChange={(event) =>
                    setCourseForm({
                      ...courseForm,
                      published: event.target.checked,
                    })
                  }
                  className="h-4 w-4"
                />

                <span className="text-sm font-medium">
                  Publish this course
                </span>
              </label>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  onClick={() =>
                    setShowCourseForm(false)
                  }
                  className="rounded-xl border px-5 py-3 font-semibold"
                >
                  Cancel
                </button>

                <button
                  onClick={saveCourse}
                  className="rounded-xl bg-black px-6 py-3 font-semibold text-white"
                >
                  {editingCourse
                    ? "Update Course"
                    : "Create Course"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY MODAL */}

      {showCategoryForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-7">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {editingCategory
                    ? "Edit Category"
                    : "Course Categories"}
                </h2>

                <p className="text-sm text-gray-500">
                  Create and manage course categories.
                </p>
              </div>

              <button
                onClick={() =>
                  setShowCategoryForm(false)
                }
              >
                <X />
              </button>
            </div>

            <div className="space-y-5">
              <input
                value={categoryForm.name}
                onChange={(event) =>
                  setCategoryForm({
                    ...categoryForm,
                    name: event.target.value,
                  })
                }
                placeholder="Category name"
                className="w-full rounded-xl border px-4 py-3 outline-none"
              />

              <textarea
                value={categoryForm.description}
                onChange={(event) =>
                  setCategoryForm({
                    ...categoryForm,
                    description: event.target.value,
                  })
                }
                placeholder="Description"
                rows={3}
                className="w-full rounded-xl border px-4 py-3 outline-none"
              />

              <input
                value={categoryForm.icon}
                onChange={(event) =>
                  setCategoryForm({
                    ...categoryForm,
                    icon: event.target.value,
                  })
                }
                placeholder="Lucide icon name"
                className="w-full rounded-xl border px-4 py-3 outline-none"
              />

              <button
                onClick={saveCategory}
                className="w-full rounded-xl bg-black py-3 font-semibold text-white"
              >
                {editingCategory
                  ? "Update Category"
                  : "Create Category"}
              </button>
            </div>

            {!editingCategory && (
              <div className="mt-8 border-t pt-6">
                <h3 className="mb-3 font-semibold">
                  Existing Categories
                </h3>

                <div className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center justify-between rounded-xl border px-4 py-3"
                    >
                      <span className="font-medium">
                        {category.name}
                      </span>

                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            openEditCategory(category)
                          }
                          className="rounded-lg p-2 hover:bg-gray-100"
                        >
                          <Edit3 size={16} />
                        </button>

                        <button
                          onClick={() =>
                            removeCategory(category)
                          }
                          className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCourses;