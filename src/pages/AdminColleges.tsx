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
  overview: "",
  university: "",
  collegeType: "Government",
  tneaCode: "",
  eligibility: "",
  admission: "",
  tuitionFees: "",
  hostel: "",
  facilities: "",
  placement: "",
  recruiters: "",
  accreditation: "",
  rankings: "",
  location: "",
  district: "",
  state: "Tamil Nadu",
  phone: "",
  email: "",
  website: "",
  courses: "",
  verified: false,
};

const AdminColleges = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
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
      overview: college.overview || college.description || "",
      university: college.university || "",
      collegeType: college.collegeType || "Government",
      tneaCode: college.tneaCode || "",
      eligibility: college.eligibility || "",
      admission: college.admission || college.admissionNotes || "",
      tuitionFees: college.tuitionFees || college.fees?.tuition || college.feeRange || "",
      hostel: college.hostelInfo || college.hostel?.details || "",
      facilities: Array.isArray(college.facilities)
        ? college.facilities.join(", ")
        : college.facilities || "",
      placement:
        typeof college.placement === "string"
          ? college.placement
          : [
              college.placements?.rate && `Rate: ${college.placements.rate}`,
              college.placements?.averagePackage && `Avg: ${college.placements.averagePackage}`,
            ]
              .filter(Boolean)
              .join(", "),
      recruiters: Array.isArray(college.recruiters)
        ? college.recruiters.join(", ")
        : college.recruiters || "",
      accreditation: college.accreditation || college.naacGrade || "",
      rankings: college.rankings || college.nirfRank || "",
      location: college.location || "",
      district: college.district || "",
      state: college.state || "Tamil Nadu",
      phone: college.phone || college.contact?.phone || "",
      email: college.email || college.contact?.email || "",
      website: college.website || college.contact?.website || "",
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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    // Validate 15 Required/Key Fields
    if (!form.name.trim()) {
      setError("1. College Name is required.");
      return;
    }
    if (!form.overview.trim()) {
      setError("2. Overview is required.");
      return;
    }
    if (!form.university.trim()) {
      setError("3. University is required.");
      return;
    }
    if (!form.collegeType.trim()) {
      setError("4. College Type is required.");
      return;
    }
    if (!form.eligibility.trim()) {
      setError("6. Eligibility is required.");
      return;
    }
    if (!form.admission.trim()) {
      setError("7. Admission details are required.");
      return;
    }
    if (!form.tuitionFees.trim()) {
      setError("8. Tuition Fees are required.");
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

    try {
      setSaving(true);

      const coursesArr = form.courses
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);

      const facilitiesArr = form.facilities
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean);

      const recruitersArr = form.recruiters
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean);

      const slug = form.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const collegeData = {
        name: form.name.trim(),
        slug,
        overview: form.overview.trim(),
        description: form.overview.trim(),
        university: form.university.trim(),
        collegeType: form.collegeType.trim(),
        tneaCode: form.tneaCode.trim(),
        eligibility: form.eligibility.trim(),
        admission: form.admission.trim(),
        admissionNotes: form.admission.trim(),
        tuitionFees: form.tuitionFees.trim(),
        hostelInfo: form.hostel.trim(),
        hostel: {
          available: !!form.hostel.trim(),
          details: form.hostel.trim(),
        },
        facilities: facilitiesArr,
        placement: form.placement.trim(),
        recruiters: recruitersArr,
        accreditation: form.accreditation.trim(),
        rankings: form.rankings.trim(),
        contactInfo: [form.phone.trim(), form.email.trim(), form.website.trim()].filter(Boolean).join(" | "),
        contact: {
          phone: form.phone.trim(),
          email: form.email.trim(),
          website: form.website.trim(),
          address: `${form.location.trim()}, ${form.district.trim()}, ${form.state.trim()}`,
        },
        location: form.location.trim(),
        district: form.district.trim(),
        state: form.state.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        website: form.website.trim(),
        courses: coursesArr,
        verified: form.verified,
      };

      if (editingId) {
        await updateCollege(editingId, collegeData);
      } else {
        await createCollege(collegeData);
      }

      await loadColleges();
      resetForm();
    } catch (error) {
      console.error(error);
      setError("Something went wrong while saving the college.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (college: College) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${college.name}"?`
    );

    if (!confirmed) return;

    try {
      await deleteCollege(college.id);
      setColleges((current) => current.filter((item) => item.id !== college.id));
    } catch (error) {
      console.error(error);
      setError("Failed to delete the college.");
    }
  };

  const toggleVerification = async (college: College) => {
    try {
      await updateCollege(college.id, {
        verified: !college.verified,
      });

      setColleges((current) =>
        current.map((item) =>
          item.id === college.id
            ? { ...item, verified: !item.verified }
            : item
        )
      );
    } catch (error) {
      console.error(error);
      setError("Failed to update verification.");
    }
  };

  const filteredColleges = colleges.filter((college) => {
    const term = search.trim().toLowerCase();
    if (!term) return true;

    return (
      college.name?.toLowerCase().includes(term) ||
      college.location?.toLowerCase().includes(term) ||
      college.district?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-[#F5F9FC] font-sans text-[#142e23]">
      <Navbar />

      <main>
        {/* Header */}
        <section className="border-b border-[#cdddc9] bg-[#dce8da]">
          <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#465f51] hover:text-[#143527]"
            >
              <ArrowLeft className="h-4 w-4" />
              Admin Dashboard
            </Link>

            <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-4 py-1.5 text-xs font-semibold text-[#143527]">
                  <Building2 className="h-4 w-4 text-[#143527]" />
                  College Management
                </div>

                <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-[#142e23]">
                  Manage Colleges
                </h1>

                <p className="mt-2 text-[#465f51]">
                  Add, edit, verify and manage complete college profiles with all 15 required fields.
                </p>
              </div>

              <button
                type="button"
                onClick={openCreateForm}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#143527] px-6 py-3 font-semibold text-white transition hover:bg-[#0b2017]"
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
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 rounded-3xl border border-[#cdddc9] bg-white p-7 shadow-xs sm:p-9"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-[#142e23]">
                    {editingId ? "Edit College Details" : "Add New College (15 Required Fields)"}
                  </h2>

                  <p className="mt-1 text-sm text-[#465f51]">
                    Enter complete college information for all 15 core parameters below.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-[#cdddc9] p-2 text-[#465f51] hover:text-[#143527]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {error && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <h3 className="font-heading text-lg font-bold text-[#143527] border-b border-[#cdddc9] pb-2">
                  1. Core College Identification
                </h3>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <Input
                    label="1. College Name *"
                    value={form.name}
                    onChange={(val) => handleChange("name", val)}
                    placeholder="e.g. PSG College of Technology"
                  />

                  <Input
                    label="3. University *"
                    value={form.university}
                    onChange={(val) => handleChange("university", val)}
                    placeholder="e.g. Anna University"
                  />

                  <div>
                    <label className="text-sm font-semibold text-[#143527]">
                      4. College Type *
                    </label>
                    <select
                      value={form.collegeType}
                      onChange={(e) => handleChange("collegeType", e.target.value)}
                      className="mt-2 h-12 w-full rounded-2xl border border-[#cdddc9] px-4 text-sm text-[#142e23] outline-none focus:border-[#143527] focus:ring-1 focus:ring-[#143527]"
                    >
                      <option value="Government">Government</option>
                      <option value="Government Aided">Government Aided</option>
                      <option value="Self Financing">Self Financing</option>
                      <option value="Deemed University">Deemed University</option>
                      <option value="Autonomous">Autonomous</option>
                      <option value="Private">Private</option>
                    </select>
                  </div>

                  <Input
                    label="5. TNEA Code"
                    value={form.tneaCode}
                    onChange={(val) => handleChange("tneaCode", val)}
                    placeholder="e.g. 2006"
                  />

                  <Input
                    label="Location / City *"
                    value={form.location}
                    onChange={(val) => handleChange("location", val)}
                    placeholder="e.g. Coimbatore"
                  />

                  <Input
                    label="District *"
                    value={form.district}
                    onChange={(val) => handleChange("district", val)}
                    placeholder="e.g. Coimbatore"
                  />
                </div>

                <h3 className="font-heading text-lg font-bold text-[#143527] border-b border-[#cdddc9] pb-2 pt-4">
                  2. Academics & Admission Requirements
                </h3>
                <div className="space-y-4">
                  <TextArea
                    label="2. Overview *"
                    value={form.overview}
                    onChange={(val) => handleChange("overview", val)}
                    placeholder="Comprehensive overview of the college, history, vision, and campus..."
                    rows={4}
                  />

                  <TextArea
                    label="6. Eligibility Criteria *"
                    value={form.eligibility}
                    onChange={(val) => handleChange("eligibility", val)}
                    placeholder="e.g. Minimum 50% aggregate in PCM in 10+2 / HSC..."
                    rows={3}
                  />

                  <TextArea
                    label="7. Admission Process *"
                    value={form.admission}
                    onChange={(val) => handleChange("admission", val)}
                    placeholder="e.g. Admissions conducted via TNEA single window counseling based on Cutoff marks..."
                    rows={3}
                  />
                </div>

                <h3 className="font-heading text-lg font-bold text-[#143527] border-b border-[#cdddc9] pb-2 pt-4">
                  3. Fees & Infrastructure
                </h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="8. Tuition Fees *"
                    value={form.tuitionFees}
                    onChange={(val) => handleChange("tuitionFees", val)}
                    placeholder="e.g. ₹55,000 - ₹1,20,000 per year"
                  />

                  <Input
                    label="Courses Offered"
                    value={form.courses}
                    onChange={(val) => handleChange("courses", val)}
                    placeholder="e.g. CSE, ECE, EEE, Mechanical, IT (comma separated)"
                  />
                </div>

                <div className="space-y-4">
                  <TextArea
                    label="9. Hostel Details"
                    value={form.hostel}
                    onChange={(val) => handleChange("hostel", val)}
                    placeholder="Hostel facilities, mess quality, room types, fees..."
                    rows={3}
                  />

                  <TextArea
                    label="10. Facilities"
                    value={form.facilities}
                    onChange={(val) => handleChange("facilities", val)}
                    placeholder="Library, Wi-Fi, Laboratories, Sports Complex, Auditorium (comma separated)"
                    rows={3}
                  />
                </div>

                <h3 className="font-heading text-lg font-bold text-[#143527] border-b border-[#cdddc9] pb-2 pt-4">
                  4. Placements, Accreditation & Contact
                </h3>
                <div className="space-y-4">
                  <TextArea
                    label="11. Placement Statistics"
                    value={form.placement}
                    onChange={(val) => handleChange("placement", val)}
                    placeholder="e.g. 95% placement rate. Highest package ₹35 LPA, Average package ₹7.5 LPA..."
                    rows={3}
                  />

                  <TextArea
                    label="12. Top Recruiters"
                    value={form.recruiters}
                    onChange={(val) => handleChange("recruiters", val)}
                    placeholder="Amazon, TCS, Infosys, Zoho, Cognizant (comma separated)"
                    rows={2}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="13. Accreditation"
                    value={form.accreditation}
                    onChange={(val) => handleChange("accreditation", val)}
                    placeholder="e.g. NAAC A++ Grade, NBA Accredited"
                  />

                  <Input
                    label="14. Rankings"
                    value={form.rankings}
                    onChange={(val) => handleChange("rankings", val)}
                    placeholder="e.g. NIRF Rank 63 Engineering"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-3">
                  <Input
                    label="15. Contact Phone"
                    value={form.phone}
                    onChange={(val) => handleChange("phone", val)}
                    placeholder="+91 422 2572177"
                  />

                  <Input
                    label="15. Contact Email"
                    type="email"
                    value={form.email}
                    onChange={(val) => handleChange("email", val)}
                    placeholder="principal@psgtech.edu"
                  />

                  <Input
                    label="15. Website URL"
                    value={form.website}
                    onChange={(val) => handleChange("website", val)}
                    placeholder="https://www.psgtech.edu"
                  />
                </div>

                <label className="flex items-center gap-3 cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    checked={form.verified}
                    onChange={(e) => handleChange("verified", e.target.checked)}
                    className="h-5 w-5 rounded-md border-[#cdddc9] text-[#143527] focus:ring-[#143527]"
                  />

                  <span className="text-sm font-semibold text-[#142e23]">
                    Mark as Verified College Listing
                  </span>
                </label>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-full border border-[#cdddc9] px-6 py-2.5 font-semibold text-[#143527] hover:bg-[#e6f0e4]"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#143527] px-7 py-2.5 font-semibold text-white transition hover:bg-[#0b2017] disabled:opacity-50"
                  >
                    {saving ? (
                      "Saving College..."
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        {editingId ? "Update College" : "Create College"}
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
              <p className="text-xs font-semibold uppercase tracking-wider text-[#5A6E78]">
                {colleges.length} total colleges
              </p>

              <h2 className="font-heading text-2xl font-bold text-[#075B63]">
                College Directory
              </h2>
            </div>

            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#5A6E78]" />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search colleges..."
                className="h-11 w-full rounded-full border border-[#E2ECF3] bg-white pl-12 pr-4 text-sm text-[#075B63] outline-none focus:border-[#075B63]"
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
                    className="h-72 animate-pulse rounded-3xl bg-[#E2ECF3]/40"
                  />
                )
              )}
            </div>
          ) : filteredColleges.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#E2ECF3] bg-white px-6 py-20 text-center">
              <Building2 className="mx-auto h-12 w-12 text-[#5A6E78]" />

              <h3 className="mt-5 font-heading text-xl font-bold text-[#075B63]">
                No colleges found
              </h3>

              <p className="mt-2 text-sm text-[#5A6E78]">
                Add your first college to get started.
              </p>

              <button
                type="button"
                onClick={openCreateForm}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#075B63] px-6 py-3 font-semibold text-white hover:bg-[#05434A]"
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
                  className="rounded-3xl border border-[#E2ECF3] bg-white p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F0F8FD] text-[#075B63]">
                        <Building2 className="h-6 w-6" />
                      </div>

                      {college.verified && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-[#E2ECF3] bg-[#F0F8FD] px-3 py-1 text-xs font-semibold text-[#075B63]">
                          <BadgeCheck className="h-4 w-4" />
                          Verified
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 line-clamp-2 font-heading text-xl font-bold text-[#075B63]">
                      {college.name}
                    </h3>

                    <div className="mt-3 flex items-center gap-2 text-sm text-[#5A6E78]">
                      <MapPin className="h-4 w-4 shrink-0 text-[#075B63]" />
                      {college.location},{" "}
                      {college.district}
                    </div>

                    {college.email && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-[#5A6E78]">
                        <Mail className="h-4 w-4 shrink-0 text-[#075B63]" />
                        <span className="truncate">
                          {college.email}
                        </span>
                      </div>
                    )}

                    <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#5A6E78]">
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
                                className="rounded-full border border-[#E2ECF3] bg-[#F0F8FD] px-3 py-1 text-xs font-medium text-[#075B63]"
                              >
                                {course}
                              </span>
                            ))}
                        </div>
                      )}
                  </div>

                  <div className="mt-6 flex gap-2 pt-4 border-t border-[#E2ECF3]/40">
                    <Link
                      to={`/colleges/${college.id}`}
                      className="flex-1 rounded-full border border-[#E2ECF3] px-4 py-2 text-center text-xs font-semibold text-[#075B63] hover:bg-[#F0F8FD]"
                    >
                      View
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        openEditForm(college)
                      }
                      className="rounded-full border border-[#E2ECF3] p-2 text-[#075B63] hover:bg-[#F0F8FD]"
                      title="Edit"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        toggleVerification(college)
                      }
                      className="rounded-full border border-[#E2ECF3] p-2 text-[#075B63] hover:bg-[#F0F8FD]"
                      title="Toggle verification"
                    >
                      <BadgeCheck className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(college)
                      }
                      className="rounded-full border border-red-200 p-2 text-red-600 hover:bg-red-50"
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
      <label className="text-sm font-semibold text-[#143527]">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-2xl border border-[#cdddc9] px-4 text-sm text-[#142e23] outline-none transition focus:border-[#143527] focus:ring-1 focus:ring-[#143527]"
      />
    </div>
  );
};

const TextArea = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) => {
  return (
    <div>
      <label className="text-sm font-semibold text-[#143527]">
        {label}
      </label>

      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-[#cdddc9] p-4 text-sm text-[#142e23] outline-none transition focus:border-[#143527] focus:ring-1 focus:ring-[#143527]"
      />
    </div>
  );
};

export default AdminColleges;