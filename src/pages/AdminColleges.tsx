import { type FormEvent, useEffect, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  Check,
  Edit3,
  Mail,
  MapPin,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  createCollege,
  deleteCollege,
  getColleges,
  updateCollege,
} from "../services/collegeService";

import type { College } from "../types";

const emptyForm = {
  name: "",
  location: "",
  district: "",
  state: "Tamil Nadu",
  description: "",
  website: "",
  phone: "",
  email: "",
  courses: "",
  verified: false,
};

const AdminColleges = () => {
  const [colleges, setColleges] = useState<College[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(
    null
  );

  const [form, setForm] = useState(emptyForm);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const loadColleges = async () => {
    try {
      setLoading(true);

      const data = await getColleges();

      setColleges(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load colleges.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => { loadColleges(); })();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    setError("");
  };

  const openCreateForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
    setError("");
  };

  const openEditForm = (college: College) => {
    setForm({
      name: college.name || "",
      location: college.location || "",
      district: college.district || "",
      state: college.state || "Tamil Nadu",
      description: college.description || "",
      website: college.website || "",
      phone: college.phone || "",
      email: college.email || "",
      courses: college.courses?.join(", ") || "",
      verified: college.verified || false,
    });

    setEditingId(college.id);
    setShowForm(true);
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleChange = (
    field: keyof typeof form,
    value: string | boolean
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent
  ) => {
    event.preventDefault();

    setError("");

    if (!form.name.trim()) {
      setError("College name is required.");
      return;
    }

    if (!form.location.trim()) {
      setError("Location is required.");
      return;
    }

    if (!form.district.trim()) {
      setError("District is required.");
      return;
    }

    if (!form.description.trim()) {
      setError("Description is required.");
      return;
    }

    try {
      setSaving(true);

      const courses = form.courses
        .split(",")
        .map((course) => course.trim())
        .filter(Boolean);

      const slug = form.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const collegeData = {
        name: form.name.trim(),
        slug,
        location: form.location.trim(),
        district: form.district.trim(),
        state: form.state.trim(),
        description: form.description.trim(),
        website: form.website.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        courses,
        logo: "",
        images: [],
        verified: form.verified,
      };

      if (editingId) {
        await updateCollege(
          editingId,
          collegeData
        );
      } else {
        await createCollege(collegeData);
      }

      await loadColleges();

      resetForm();
    } catch (error) {
      console.error(error);

      setError(
        "Something went wrong while saving the college."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (
    college: College
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${college.name}"?`
    );

    if (!confirmed) return;

    try {
      await deleteCollege(college.id);

      setColleges((current) =>
        current.filter(
          (item) => item.id !== college.id
        )
      );
    } catch (error) {
      console.error(error);

      setError(
        "Failed to delete the college."
      );
    }
  };

  const toggleVerification = async (
    college: College
  ) => {
    try {
      await updateCollege(college.id, {
        verified: !college.verified,
      });

      setColleges((current) =>
        current.map((item) =>
          item.id === college.id
            ? {
                ...item,
                verified: !item.verified,
              }
            : item
        )
      );
    } catch (error) {
      console.error(error);
      setError(
        "Failed to update verification."
      );
    }
  };

  const filteredColleges = colleges.filter(
    (college) => {
      const term = search
        .trim()
        .toLowerCase();

      if (!term) return true;

      return (
        college.name
          ?.toLowerCase()
          .includes(term) ||
        college.location
          ?.toLowerCase()
          .includes(term) ||
        college.district
          ?.toLowerCase()
          .includes(term)
      );
    }
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main>
        {/* Header */}
        <section className="bg-black text-white">
          <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Admin Dashboard
            </Link>

            <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-gray-300">
                  <Building2 className="h-4 w-4" />
                  College Management
                </div>

                <h1 className="text-4xl font-bold">
                  Manage Colleges
                </h1>

                <p className="mt-3 text-gray-400">
                  Add, edit, verify and manage college
                  profiles.
                </p>
              </div>

              <button
                onClick={openCreateForm}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-black"
              >
                <Plus className="h-5 w-5" />
                Add College
              </button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
          {/* Form */}
          {showForm && (
            <motion.section
              initial={{
                opacity: 0,
                y: -15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mb-8 rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {editingId
                      ? "Edit College"
                      : "Add New College"}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Enter the college information below.
                  </p>
                </div>

                <button
                  onClick={resetForm}
                  className="rounded-xl border border-gray-200 p-2"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {error && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-6"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="College Name *"
                    value={form.name}
                    onChange={(value) =>
                      handleChange("name", value)
                    }
                    placeholder="ABC Engineering College"
                  />

                  <Input
                    label="Location *"
                    value={form.location}
                    onChange={(value) =>
                      handleChange(
                        "location",
                        value
                      )
                    }
                    placeholder="Chennai"
                  />

                  <Input
                    label="District *"
                    value={form.district}
                    onChange={(value) =>
                      handleChange(
                        "district",
                        value
                      )
                    }
                    placeholder="Chennai"
                  />

                  <Input
                    label="State *"
                    value={form.state}
                    onChange={(value) =>
                      handleChange("state", value)
                    }
                    placeholder="Tamil Nadu"
                  />

                  <Input
                    label="Phone"
                    value={form.phone}
                    onChange={(value) =>
                      handleChange("phone", value)
                    }
                    placeholder="+91 9000000000"
                  />

                  <Input
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(value) =>
                      handleChange("email", value)
                    }
                    placeholder="admissions@college.com"
                  />

                  <Input
                    label="Website"
                    value={form.website}
                    onChange={(value) =>
                      handleChange(
                        "website",
                        value
                      )
                    }
                    placeholder="https://college.com"
                  />

                  <Input
                    label="Courses"
                    value={form.courses}
                    onChange={(value) =>
                      handleChange(
                        "courses",
                        value
                      )
                    }
                    placeholder="B.E CSE, B.E ECE, B.E Mechanical"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Description *
                  </label>

                  <textarea
                    value={form.description}
                    onChange={(event) =>
                      handleChange(
                        "description",
                        event.target.value
                      )
                    }
                    rows={5}
                    placeholder="Describe the college..."
                    className="mt-2 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black"
                  />
                </div>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4">
                  <input
                    type="checkbox"
                    checked={form.verified}
                    onChange={(event) =>
                      handleChange(
                        "verified",
                        event.target.checked
                      )
                    }
                    className="h-5 w-5"
                  />

                  <div>
                    <p className="font-semibold">
                      Verified College
                    </p>

                    <p className="text-sm text-gray-500">
                      Mark this college as verified.
                    </p>
                  </div>
                </label>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-xl border border-gray-200 px-6 py-3 font-semibold"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-7 py-3 font-semibold text-white disabled:opacity-50"
                  >
                    {saving ? (
                      "Saving..."
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        {editingId
                          ? "Update College"
                          : "Create College"}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.section>
          )}

          {/* Search */}
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {colleges.length} total colleges
              </p>

              <h2 className="text-2xl font-bold">
                College Directory
              </h2>
            </div>

            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search colleges..."
                className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-12 pr-4 outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Error */}
          {error && !showForm && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="h-72 animate-pulse rounded-3xl bg-gray-200"
                  />
                )
              )}
            </div>
          ) : filteredColleges.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center">
              <Building2 className="mx-auto h-12 w-12 text-gray-400" />

              <h3 className="mt-5 text-xl font-bold">
                No colleges found
              </h3>

              <p className="mt-2 text-gray-500">
                Add your first college to get started.
              </p>

              <button
                onClick={openCreateForm}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 font-semibold text-white"
              >
                <Plus className="h-4 w-4" />
                Add College
              </button>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredColleges.map((college) => (
                <motion.article
                  key={college.id}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="rounded-3xl border border-gray-200 bg-white p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                      <Building2 className="h-6 w-6" />
                    </div>

                    {college.verified && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold">
                        <BadgeCheck className="h-4 w-4" />
                        Verified
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 line-clamp-2 text-xl font-bold">
                    {college.name}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4 shrink-0" />
                    {college.location},{" "}
                    {college.district}
                  </div>

                  {college.email && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      <Mail className="h-4 w-4 shrink-0" />
                      <span className="truncate">
                        {college.email}
                      </span>
                    </div>
                  )}

                  <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-500">
                    {college.description}
                  </p>

                  {college.courses &&
                    college.courses.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {college.courses
                          .slice(0, 3)
                          .map((course) => (
                            <span
                              key={course}
                              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium"
                            >
                              {course}
                            </span>
                          ))}
                      </div>
                    )}

                  <div className="mt-6 flex gap-2">
                    <Link
                      to={`/colleges/${college.id}`}
                      className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-center text-sm font-semibold hover:border-black"
                    >
                      View
                    </Link>

                    <button
                      onClick={() =>
                        openEditForm(college)
                      }
                      className="rounded-xl border border-gray-200 p-2.5 hover:border-black"
                      title="Edit"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() =>
                        toggleVerification(college)
                      }
                      className="rounded-xl border border-gray-200 p-2.5 hover:border-black"
                      title="Toggle verification"
                    >
                      <BadgeCheck className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(college)
                      }
                      className="rounded-xl border border-gray-200 p-2.5 text-red-600 hover:border-red-300"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) => {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="mt-2 h-13 w-full rounded-xl border border-gray-200 px-4 outline-none focus:border-black"
      />
    </div>
  );
};

export default AdminColleges;