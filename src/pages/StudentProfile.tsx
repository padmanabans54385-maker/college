import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  Check,
  Loader2,
  Save,
  UserRound,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useAuth } from "../hooks/AuthContext";

import { getCourseCategories } from "../services/courseService";

import {
  updateStudentProfile,
} from "../services/studentProfileService";

import { uploadFile } from "../firebase/storage";

import type {
  CourseCategory,
} from "../types";

const states = [
  "Tamil Nadu",
  "Kerala",
  "Karnataka",
  "Andhra Pradesh",
  "Telangana",
  "Maharashtra",
  "Delhi",
  "West Bengal",
  "Other",
];

const districts = [
  "Ariyalur",
  "Chengalpattu",
  "Chennai",
  "Coimbatore",
  "Cuddalore",
  "Dharmapuri",
  "Dindigul",
  "Erode",
  "Kallakurichi",
  "Kancheepuram",
  "Karur",
  "Krishnagiri",
  "Madurai",
  "Mayiladuthurai",
  "Nagapattinam",
  "Namakkal",
  "Nilgiris",
  "Perambalur",
  "Pudukkottai",
  "Ramanathapuram",
  "Ranipet",
  "Salem",
  "Sivaganga",
  "Tenkasi",
  "Thanjavur",
  "Theni",
  "Thoothukudi",
  "Tiruchirappalli",
  "Tirunelveli",
  "Tirupathur",
  "Tiruppur",
  "Tiruvallur",
  "Tiruvannamalai",
  "Tiruvarur",
  "Vellore",
  "Viluppuram",
  "Virudhunagar",
];

const StudentProfile = () => {
  const { user, profile } = useAuth();

  const [categories, setCategories] = useState<
    CourseCategory[]
  >([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [preferredState, setPreferredState] =
    useState("");

  const [preferredDistrict, setPreferredDistrict] =
    useState("");

  const [preferredCourseIds, setPreferredCourseIds] =
    useState<string[]>([]);

  const [dateOfBirth, setDateOfBirth] =
    useState("");

  const [gender, setGender] = useState("");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const [schoolName, setSchoolName] =
    useState("");

  const [board, setBoard] = useState("");

  const [passingYear, setPassingYear] =
    useState("");

  const [percentage, setPercentage] =
    useState("");
  const [academicLevel, setAcademicLevel] = useState("");
  const [tneaRank, setTneaRank] = useState("");
  const [cutoff, setCutoff] = useState("");
  const [community, setCommunity] = useState("");
  const [preferredCourse, setPreferredCourse] = useState("");
  const [budget, setBudget] = useState("");

  const [profileImage, setProfileImage] =
    useState("");

  const [uploadingImage, setUploadingImage] =
    useState(false);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!profile) return;

    (async () => {
      setName(profile.name ?? "");
      setPhone(profile.phone ?? "");

      setPreferredState(
        profile.preferredState ?? ""
      );

      setPreferredDistrict(
        profile.preferredDistrict ?? ""
      );

      setPreferredCourseIds(
        profile.preferredCourseIds ?? []
      );

      setDateOfBirth(
        profile.dateOfBirth ?? ""
      );

      setGender(profile.gender ?? "");

      setAddress(profile.address ?? "");
      setCity(profile.city ?? "");
      setPincode(profile.pincode ?? "");

      setSchoolName(
        profile.schoolName ?? ""
      );

      setBoard(profile.board ?? "");

      setPassingYear(
        profile.passingYear ?? ""
      );

      setPercentage(
        profile.percentage ?? ""
      );
      setAcademicLevel(profile.academicLevel ?? "");
      setTneaRank(profile.tneaRank ?? "");
      setCutoff(profile.cutoff ?? "");
      setCommunity(profile.community ?? "");
      setPreferredCourse(profile.preferredCourse ?? "");
      setBudget(profile.budget ?? "");

      setProfileImage(
        profile.profileImage ?? ""
      );
    })();
  }, [profile]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data =
          await getCourseCategories();

        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadCategories();
  }, []);

  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file || !user) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5MB.");
      return;
    }

    setUploadingImage(true);

    try {
      const url = await uploadFile(
        file,
        `students/${user.uid}/profile-${Date.now()}`
      );

      setProfileImage(url);

      await updateStudentProfile(
        user.uid,
        {
          profileImage: url,
        }
      );
    } catch (error) {
      console.error(error);
      alert(
        "Unable to upload profile image."
      );
    } finally {
      setUploadingImage(false);
    }
  };

  const toggleCourse = (
    courseId: string
  ) => {
    setPreferredCourseIds((current) =>
      current.includes(courseId)
        ? current.filter(
            (id) => id !== courseId
          )
        : [...current, courseId]
    );
  };

  const handleSubmit = async (
    event: FormEvent
  ) => {
    event.preventDefault();

    if (!user) return;

    setSaving(true);
    setSaved(false);

    try {
      await updateStudentProfile(
        user.uid,
        {
          name,
          phone,
          profileImage,

          preferredState,
          preferredDistrict,
          preferredCourseIds,

          dateOfBirth,
          gender,

          address,
          city,
          pincode,

          schoolName,
          board,
          passingYear,
          percentage,
          academicLevel,
          tneaRank,
          cutoff,
          community,
          preferredCourse,
          budget,
        }
      );

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      alert(
        "Unable to save your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>

            <h1 className="mt-6 text-3xl font-black text-gray-950">
              My Profile
            </h1>

            <p className="mt-2 text-gray-500">
              Keep your information updated to get
              better college recommendations.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Profile photo */}
            <section className="rounded-3xl border border-gray-200 bg-white p-6">
              <SectionTitle
                title="Profile Photo"
                description="Add a photo to personalize your student profile."
              />

              <div className="mt-6 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserRound className="h-12 w-12 text-gray-400" />
                  )}

                  {uploadingImage && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <Loader2 className="h-7 w-7 animate-spin text-white" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800">
                    <Camera className="h-4 w-4" />
                    Upload Photo

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={
                        handleImageChange
                      }
                    />
                  </label>

                  <p className="mt-2 text-xs text-gray-400">
                    JPG, PNG or WEBP. Maximum 5MB.
                  </p>
                </div>
              </div>
            </section>

            {/* Basic details */}
            <section className="rounded-3xl border border-gray-200 bg-white p-6">
              <SectionTitle
                title="Basic Information"
                description="Your basic personal information."
              />

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <Input
                  label="Full Name"
                  value={name}
                  onChange={setName}
                  required
                />

                <Input
                  label="Email"
                  value={profile?.email ?? ""}
                  onChange={() => {}}
                  disabled
                />

                <Input
                  label="Phone Number"
                  value={phone}
                  onChange={setPhone}
                />

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(event) =>
                      setDateOfBirth(
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                  />
                </div>

                <Select
                  label="Gender"
                  value={gender}
                  onChange={setGender}
                  options={[
                    "Male",
                    "Female",
                    "Other",
                    "Prefer not to say",
                  ]}
                />
              </div>
            </section>

            {/* Preferences */}
            <section className="rounded-3xl border border-gray-200 bg-white p-6">
              <SectionTitle
                title="Admission Preferences"
                description="Tell us what you're looking for so we can recommend better colleges."
              />

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <Select
                  label="Preferred State"
                  value={preferredState}
                  onChange={setPreferredState}
                  options={states}
                />

                <Select
                  label="Preferred District"
                  value={preferredDistrict}
                  onChange={setPreferredDistrict}
                  options={districts}
                />
              </div>

              <div className="mt-7">
                <label className="mb-3 block text-sm font-semibold text-gray-700">
                  Preferred Course Categories
                </label>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {categories.map(
                    (category) => {
                      const selected =
                        preferredCourseIds.includes(
                          category.id
                        );

                      return (
                        <button
                          type="button"
                          key={category.id}
                          onClick={() =>
                            toggleCourse(
                              category.id
                            )
                          }
                          className={`flex items-center justify-between rounded-2xl border p-4 text-left transition ${
                            selected
                              ? "border-black bg-black text-white"
                              : "border-gray-200 bg-white text-gray-800 hover:border-gray-400"
                          }`}
                        >
                          <span className="text-sm font-semibold">
                            {category.name}
                          </span>

                          {selected && (
                            <Check className="h-4 w-4" />
                          )}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            </section>

            {/* Address */}
            <section className="rounded-3xl border border-gray-200 bg-white p-6">
              <SectionTitle
                title="Address"
                description="Your current contact address."
              />

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Address
                  </label>

                  <textarea
                    value={address}
                    onChange={(event) =>
                      setAddress(
                        event.target.value
                      )
                    }
                    rows={3}
                    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                  />
                </div>

                <Input
                  label="City"
                  value={city}
                  onChange={setCity}
                />

                <Input
                  label="Pincode"
                  value={pincode}
                  onChange={setPincode}
                />
              </div>
            </section>

            {/* Academic */}
            <section className="rounded-3xl border border-gray-200 bg-white p-6">
              <SectionTitle
                title="Academic Information"
                description="Academic details help colleges understand your background."
              />

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <Input
                  label="School / College"
                  value={schoolName}
                  onChange={setSchoolName}
                />

                <Input
                  label="Board / University"
                  value={board}
                  onChange={setBoard}
                />

                <Input
                  label="Passing Year"
                  value={passingYear}
                  onChange={setPassingYear}
                />

                <Input
                  label="Percentage / CGPA"
                  value={percentage}
                  onChange={setPercentage}
                />
                <Input label="Academic level" value={academicLevel} onChange={setAcademicLevel} />
                <Input label="TNEA rank" value={tneaRank} onChange={setTneaRank} />
                <Input label="Cutoff" value={cutoff} onChange={setCutoff} />
                <Input label="Community" value={community} onChange={setCommunity} />
                <Input label="Preferred course" value={preferredCourse} onChange={setPreferredCourse} />
                <Input label="Budget" value={budget} onChange={setBudget} />
              </div>
            </section>

            {/* Save */}
            <div className="sticky bottom-4 z-10">
              <div className="flex flex-col justify-between gap-4 rounded-2xl border border-gray-200 bg-white/95 p-4 shadow-xl backdrop-blur sm:flex-row sm:items-center">
                <div>
                  {saved ? (
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                      <Check className="h-4 w-4" />
                      Profile saved successfully
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Keep your profile updated for
                      better recommendations.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Profile
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
};

const SectionTitle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div>
    <h2 className="text-xl font-bold text-gray-950">
      {title}
    </h2>

    <p className="mt-1 text-sm text-gray-500">
      {description}
    </p>
  </div>
);

const Input = ({
  label,
  value,
  onChange,
  required = false,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
}) => (
  <div>
    <label className="mb-2 block text-sm font-semibold text-gray-700">
      {label}
    </label>

    <input
      value={value}
      required={required}
      disabled={disabled}
      onChange={(event) =>
        onChange(event.target.value)
      }
      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black disabled:bg-gray-100 disabled:text-gray-500"
    />
  </div>
);

const Select = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) => (
  <div>
    <label className="mb-2 block text-sm font-semibold text-gray-700">
      {label}
    </label>

    <select
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black"
    >
      <option value="">Select {label}</option>

      {options.map((option) => (
        <option
          key={option}
          value={option}
        >
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default StudentProfile;