import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowLeft,
  Building2,
  Save,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useAuth } from "../hooks/AuthContext";

import {
  getCollegeById,
} from "../services/collegeService";

import {
  updateCollegeProfile,
} from "../services/collegePortalService";

import type { College } from "../types";

const CollegeProfile = () => {
  const { profile } = useAuth();

  const [college, setCollege] =
    useState<College | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    location: "",
    district: "",
    state: "",
    description: "",
    logo: "",
    website: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const load = async () => {
      if (!profile?.collegeId) return;

      const data =
        await getCollegeById(
          profile.collegeId
        );

      setCollege(data);

      if (data) {
        setForm({
          name: data.name,
          location: data.location,
          district: data.district,
          state: data.state,
          description:
            data.description,
          logo: data.logo ?? "",
          website:
            data.website ?? "",
          phone:
            data.phone ?? "",
          email:
            data.email ?? "",
        });
      }

      setLoading(false);
    };

    load();
  }, [profile]);

  const save = async () => {
    if (!college) return;

    setSaving(true);

    try {
      await updateCollegeProfile(
        college.id,
        form
      );

      setCollege({
        ...college,
        ...form,
      });

      alert("College profile updated.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading profile...
      </div>
    );
  }

  if (!college) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        College profile not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#edf4ec] font-sans text-[#142e23]">
      <Navbar />

      <header className="border-b border-[#cdddc9] bg-[#dce8da]">
        <div className="mx-auto max-w-5xl px-5 py-8 sm:px-6 lg:px-8">
          <Link
            to="/college"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#577063] hover:text-[#143527]"
          >
            <ArrowLeft className="h-4 w-4" />
            College Dashboard
          </Link>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#143527] text-white">
              <Building2 size={22} />
            </div>

            <div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight text-[#143527]">
                College Profile
              </h1>

              <p className="mt-1 text-sm text-[#577063]">
                Manage the information students see.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border bg-white p-7">
          <div className="mb-8">
            <h2 className="text-xl font-bold">
              Basic Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Keep your college information accurate and
              up to date.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label="College Name"
              value={form.name}
              onChange={(value) =>
                setForm({
                  ...form,
                  name: value,
                })
              }
            />

            <Field
              label="Logo URL"
              value={form.logo}
              onChange={(value) =>
                setForm({
                  ...form,
                  logo: value,
                })
              }
            />

            <Field
              label="Location"
              value={form.location}
              onChange={(value) =>
                setForm({
                  ...form,
                  location: value,
                })
              }
            />

            <Field
              label="District"
              value={form.district}
              onChange={(value) =>
                setForm({
                  ...form,
                  district: value,
                })
              }
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
            />

            <Field
              label="Phone"
              value={form.phone}
              onChange={(value) =>
                setForm({
                  ...form,
                  phone: value,
                })
              }
            />

            <Field
              label="Email"
              value={form.email}
              onChange={(value) =>
                setForm({
                  ...form,
                  email: value,
                })
              }
            />

            <Field
              label="Website"
              value={form.website}
              onChange={(value) =>
                setForm({
                  ...form,
                  website: value,
                })
              }
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold">
              Description
            </label>

            <textarea
              rows={7}
              value={form.description}
              onChange={(event) =>
                setForm({
                  ...form,
                  description:
                    event.target.value,
                })
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div className="mt-7 flex justify-end">
            <button
              onClick={save}
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-black px-6 py-3 font-semibold text-white disabled:opacity-50"
            >
              <Save size={18} />

              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </div>

        {college.logo && (
          <div className="mt-6 rounded-3xl border bg-white p-7">
            <h2 className="text-xl font-bold">
              Logo Preview
            </h2>

            <div className="mt-5 flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border bg-gray-50">
              <img
                src={college.logo}
                alt={college.name}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

const Field = ({
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

    <div className="relative">
      <input
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
      />
    </div>
  </div>
);

export default CollegeProfile;