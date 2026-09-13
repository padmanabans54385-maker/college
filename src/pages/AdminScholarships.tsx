import { useEffect, useMemo, useState } from "react";

import {
  CalendarDays,
  Edit3,
  GraduationCap,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

import {
  createScholarship,
  deleteScholarship,
  getScholarships,
  updateScholarship,
} from "../services/scholarshipService";

import type {
  Scholarship,
  ScholarshipType,
} from "../types";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const AdminScholarships = () => {
  const [scholarships, setScholarships] =
    useState<Scholarship[]>([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [showForm, setShowForm] =
    useState(false);

  const [editing, setEditing] =
    useState<Scholarship | null>(null);

  const emptyForm = {
    name: "",
    provider: "",
    type: "government" as ScholarshipType,
    description: "",
    amount: "",
    eligibility: "",
    incomeLimit: "",
    educationLevel: "",
    category: "",
    state: "",
    applicationStart: "",
    applicationDeadline: "",
    applicationUrl: "",
    published: true,
  };

  const [form, setForm] =
    useState(emptyForm);

  const loadScholarships = async () => {
    setLoading(true);

    try {
      const data =
        await getScholarships();

      setScholarships(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => { loadScholarships(); })();
  }, []);

  const filteredScholarships =
    useMemo(() => {
      const value =
        search.toLowerCase().trim();

      if (!value) return scholarships;

      return scholarships.filter(
        (item) =>
          item.name
            .toLowerCase()
            .includes(value) ||
          item.provider
            .toLowerCase()
            .includes(value)
      );
    }, [scholarships, search]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (
    scholarship: Scholarship
  ) => {
    setEditing(scholarship);

    setForm({
      name: scholarship.name,
      provider: scholarship.provider,
      type: scholarship.type,
      description: scholarship.description,
      amount: scholarship.amount,
      eligibility: scholarship.eligibility,
      incomeLimit:
        scholarship.incomeLimit ?? "",
      educationLevel:
        scholarship.educationLevel ?? "",
      category:
        scholarship.category ?? "",
      state:
        scholarship.state ?? "",
      applicationStart:
        scholarship.applicationStart ?? "",
      applicationDeadline:
        scholarship.applicationDeadline ?? "",
      applicationUrl:
        scholarship.applicationUrl ?? "",
      published: scholarship.published,
    });

    setShowForm(true);
  };

  const save = async () => {
    if (!form.name.trim()) {
      alert("Scholarship name is required.");
      return;
    }

    if (!form.provider.trim()) {
      alert("Provider is required.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      slug: slugify(form.name),
      provider: form.provider.trim(),
      type: form.type,
      description:
        form.description.trim(),
      amount: form.amount.trim(),
      eligibility:
        form.eligibility.trim(),
      incomeLimit:
        form.incomeLimit.trim(),
      educationLevel:
        form.educationLevel.trim(),
      category:
        form.category.trim(),
      state:
        form.state.trim(),
      applicationStart:
        form.applicationStart,
      applicationDeadline:
        form.applicationDeadline,
      applicationUrl:
        form.applicationUrl.trim(),
      published: form.published,
    };

    if (editing) {
      await updateScholarship(
        editing.id,
        payload
      );
    } else {
      await createScholarship(
        payload
      );
    }

    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);

    await loadScholarships();
  };

  const remove = async (
    scholarship: Scholarship
  ) => {
    const confirmed =
      window.confirm(
        `Delete "${scholarship.name}"?`
      );

    if (!confirmed) return;

    await deleteScholarship(
      scholarship.id
    );

    await loadScholarships();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
              <GraduationCap size={21} />
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                Scholarship Management
              </h1>

              <p className="text-sm text-gray-500">
                Manage student scholarship opportunities
              </p>
            </div>
          </div>

          <button
            onClick={openCreate}
            className="flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
          >
            <Plus size={18} />
            Add Scholarship
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-gray-500">
              Total
            </p>

            <p className="mt-2 text-3xl font-bold">
              {scholarships.length}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-gray-500">
              Published
            </p>

            <p className="mt-2 text-3xl font-bold">
              {
                scholarships.filter(
                  (item) =>
                    item.published
                ).length
              }
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-gray-500">
              Drafts
            </p>

            <p className="mt-2 text-3xl font-bold">
              {
                scholarships.filter(
                  (item) =>
                    !item.published
                ).length
              }
            </p>
          </div>
        </div>

        <div className="mb-6 flex items-center rounded-2xl border bg-white px-4">
          <Search
            size={19}
            className="text-gray-400"
          />

          <input
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search scholarships..."
            className="w-full bg-transparent px-3 py-4 outline-none"
          />
        </div>

        {loading ? (
          <div className="rounded-2xl border bg-white p-12 text-center text-gray-500">
            Loading scholarships...
          </div>
        ) : (
          <div className="space-y-4">
            {filteredScholarships.map(
              (scholarship) => (
                <div
                  key={scholarship.id}
                  className="rounded-2xl border bg-white p-6"
                >
                  <div className="flex flex-col justify-between gap-5 md:flex-row">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl font-bold">
                          {scholarship.name}
                        </h2>

                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold">
                          {
                            scholarship.type
                          }
                        </span>

                        {scholarship.published ? (
                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                            Published
                          </span>
                        ) : (
                          <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                            Draft
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-sm font-medium text-gray-500">
                        {scholarship.provider}
                      </p>

                      <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">
                        {
                          scholarship.description
                        }
                      </p>

                      <div className="mt-4 flex flex-wrap gap-5 text-sm text-gray-500">
                        <span>
                          Amount:{" "}
                          <strong className="text-gray-800">
                            {
                              scholarship.amount ||
                              "Varies"
                            }
                          </strong>
                        </span>

                        <span className="flex items-center gap-1">
                          <CalendarDays
                            size={15}
                          />

                          {
                            scholarship.applicationDeadline ||
                            "No deadline"
                          }
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <button
                        onClick={() =>
                          openEdit(
                            scholarship
                          )
                        }
                        className="rounded-xl border p-3 hover:bg-gray-50"
                      >
                        <Edit3 size={18} />
                      </button>

                      <button
                        onClick={() =>
                          remove(
                            scholarship
                          )
                        }
                        className="rounded-xl border border-red-200 p-3 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </main>

      {/* FORM */}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-7">
            <div className="mb-7 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {editing
                    ? "Edit Scholarship"
                    : "Add Scholarship"}
                </h2>

                <p className="text-sm text-gray-500">
                  Enter complete scholarship information.
                </p>
              </div>

              <button
                onClick={() =>
                  setShowForm(false)
                }
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X />
              </button>
            </div>

            <div className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Scholarship Name"
                  value={form.name}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      name: value,
                    })
                  }
                />

                <Field
                  label="Provider"
                  value={form.provider}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      provider: value,
                    })
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Type
                </label>

                <select
                  value={form.type}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      type: event.target
                        .value as ScholarshipType,
                    })
                  }
                  className="w-full rounded-xl border px-4 py-3 outline-none"
                >
                  <option value="government">
                    Government
                  </option>

                  <option value="private">
                    Private
                  </option>

                  <option value="college">
                    College
                  </option>

                  <option value="ngo">
                    NGO
                  </option>
                </select>
              </div>

              <TextArea
                label="Description"
                value={form.description}
                onChange={(value) =>
                  setForm({
                    ...form,
                    description: value,
                  })
                }
              />

              <TextArea
                label="Eligibility"
                value={form.eligibility}
                onChange={(value) =>
                  setForm({
                    ...form,
                    eligibility: value,
                  })
                }
              />

              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Amount"
                  value={form.amount}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      amount: value,
                    })
                  }
                  placeholder="₹50,000 per year"
                />

                <Field
                  label="Income Limit"
                  value={form.incomeLimit}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      incomeLimit: value,
                    })
                  }
                  placeholder="Family income below ₹2.5 lakh"
                />

                <Field
                  label="Education Level"
                  value={form.educationLevel}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      educationLevel:
                        value,
                    })
                  }
                  placeholder="UG / PG"
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
                  placeholder="SC / ST / OBC / General"
                />

                <Field
                  label="State"
                  value={form.state}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      state: value,
                    })
                  }
                  placeholder="Tamil Nadu"
                />

                <Field
                  label="Application URL"
                  value={form.applicationUrl}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      applicationUrl:
                        value,
                    })
                  }
                  placeholder="https://..."
                />

                <Field
                  label="Application Start"
                  value={form.applicationStart}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      applicationStart:
                        value,
                    })
                  }
                  placeholder="01-06-2026"
                />

                <Field
                  label="Application Deadline"
                  value={
                    form.applicationDeadline
                  }
                  onChange={(value) =>
                    setForm({
                      ...form,
                      applicationDeadline:
                        value,
                    })
                  }
                  placeholder="31-10-2026"
                />
              </div>

              <label className="flex items-center gap-3">
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
                  className="h-4 w-4"
                />

                <span className="text-sm font-semibold">
                  Publish scholarship
                </span>
              </label>

              <div className="flex justify-end gap-3 pt-3">
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
                    ? "Update Scholarship"
                    : "Create Scholarship"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
    <label className="mb-2 block text-sm font-semibold">
      {label}
    </label>

    <input
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
      placeholder={placeholder}
      className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
    />
  </div>
);

const TextArea = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => (
  <div>
    <label className="mb-2 block text-sm font-semibold">
      {label}
    </label>

    <textarea
      rows={4}
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
      className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
    />
  </div>
);

export default AdminScholarships;