import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  MapPin,
  MessageCircle,
  Building2,
} from "lucide-react";
import { useAuth } from "../hooks/AuthContext";
import { getCollegeById } from "../services/collegeService";
import { isCollegeSaved, removeSavedCollege, saveCollege } from "../services/savedCollegeService";
import { trackEvent } from "../services/analytics";
import { displayValue } from "../utils/display";
import { Disclaimer } from "../components/Disclaimer";
import { Seo } from "../components/Seo";
import { LoadingSkeleton, EmptyState } from "../components/ui/States";
import { WhatsAppButton } from "../components/WhatsAppButton";
import type { College } from "../types";

const CollegeDetails = () => {
  const { collegeId } = useParams();
  const { user } = useAuth();
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!collegeId) return;
      setLoading(true);
      try {
        const data = await getCollegeById(collegeId);
        setCollege(data);
        if (data) trackEvent("college_view", { collegeId: data.id });
        if (user && data) {
          setSaved(await isCollegeSaved(user.uid, data.id));
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [collegeId, user]);

  if (loading) return <LoadingSkeleton label="Loading college profile" />;
  if (!college) {
    return (
      <div className="bg-[#edf4ec] py-16">
        <div className="mx-auto max-w-3xl px-4">
          <EmptyState
            title="College not found"
            description="This college profile is unavailable. Return to discovery and try another listing."
          />
        </div>
      </div>
    );
  }

  const toggleSave = async () => {
    if (!user) return;
    if (saved) {
      await removeSavedCollege(user.uid, college.id);
      setSaved(false);
    } else {
      await saveCollege(user.uid, college);
      setSaved(true);
      trackEvent("college_saved", { collegeId: college.id });
    }
  };

  const sections: { title: string; body: string }[] = [
    { title: "Overview", body: college.description || displayValue() },
    { title: "University", body: displayValue(college.university) },
    { title: "College type", body: displayValue(college.collegeType) },
    { title: "TNEA code", body: displayValue(college.tneaCode) },
    { title: "Eligibility", body: displayValue(college.eligibility) },
    { title: "Admission", body: displayValue(college.admissionNotes) },
    { title: "Tuition fees", body: displayValue(college.fees?.tuition || college.feeRange) },
    { title: "Hostel", body: displayValue(college.hostel?.details || (college.hostelAvailable ? "Available" : undefined)) },
    { title: "Facilities", body: college.facilities?.join(", ") || displayValue() },
    {
      title: "Placement",
      body: [
        college.placements?.rate && `Rate: ${college.placements.rate}`,
        college.placements?.averagePackage && `Average: ${college.placements.averagePackage}`,
        college.placements?.highestPackage && `Highest: ${college.placements.highestPackage}`,
      ]
        .filter(Boolean)
        .join(" · ") || displayValue(),
    },
    { title: "Recruiters", body: college.recruiters?.join(", ") || displayValue() },
    { title: "Accreditation", body: displayValue(college.accreditation || college.naacGrade) },
    { title: "Rankings", body: displayValue(college.nirfRank) },
    { title: "Contact", body: displayValue(college.phone || college.email || college.contact?.phone) },
  ];

  return (
    <main className="min-h-screen bg-[#edf4ec] py-10">
      <Seo
        title={college.name}
        description={college.description?.slice(0, 150) || `Explore ${college.name} in ${college.location}.`}
        path={`/colleges/${college.id}`}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link to="/colleges" className="inline-flex items-center gap-2 text-sm font-bold text-[#143527] hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to colleges
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="overflow-hidden rounded-3xl border border-[#cdddc9] bg-white shadow-md">
              {college.logo || college.images?.[0] ? (
                <img
                  src={college.images?.[0] || college.logo}
                  alt=""
                  className="h-56 w-full object-cover"
                />
              ) : (
                <div className="flex h-44 items-center justify-center bg-[#dce8da] font-heading text-5xl font-black text-[#143527]/40">
                  <Building2 className="h-16 w-16 text-[#143527]" />
                </div>
              )}
              <div className="p-6 sm:p-8">
                <span className="inline-flex items-center gap-1 rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#143527]">
                  {college.collegeType || "Accredited College"}
                </span>
                <h1 className="mt-3 font-heading text-3xl font-extrabold text-[#142e23] sm:text-4xl">{college.name}</h1>
                <p className="mt-2 flex items-center gap-2 text-sm text-[#577063]">
                  <MapPin className="h-4 w-4 text-[#143527]" /> {displayValue(college.location)}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(college.courses ?? []).slice(0, 8).map((course) => (
                    <span key={course} className="rounded-full border border-[#cdddc9] bg-[#e6f0e4]/60 px-3 py-1 text-xs font-medium text-[#143527]">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {sections.map((section) => (
                <section key={section.title} className="rounded-3xl border border-[#cdddc9] bg-white p-6 shadow-xs">
                  <h2 className="font-heading text-lg font-bold text-[#142e23]">{section.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#465f51]">{section.body}</p>
                </section>
              ))}
              {college.faqs && college.faqs.length > 0 && (
                <section className="rounded-3xl border border-[#cdddc9] bg-white p-6 shadow-xs">
                  <h2 className="font-heading text-lg font-bold text-[#142e23]">Frequently asked questions</h2>
                  <dl className="mt-4 space-y-4">
                    {college.faqs.map((faq) => (
                      <div key={faq.question} className="border-b border-[#cdddc9]/60 pb-3 last:border-0">
                        <dt className="font-semibold text-[#142e23]">{faq.question}</dt>
                        <dd className="mt-1 text-sm text-[#465f51]">{faq.answer}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}
              <Disclaimer kind="college" />
              {college.placements && <Disclaimer kind="placement" />}
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 h-fit">
            <div className="rounded-3xl border border-[#cdddc9] bg-white p-6 shadow-md">
              <button
                type="button"
                onClick={toggleSave}
                className="mb-3 flex w-full items-center justify-center gap-2 rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-4 py-3 text-sm font-bold text-[#143527] transition hover:bg-[#dce8da]"
              >
                <Heart className={`h-4 w-4 ${saved ? "fill-[#143527] text-[#143527]" : "text-[#143527]"}`} />
                {saved ? "Saved to profile" : "Save college"}
              </button>
              <Link
                to={`/compare?ids=${college.id}`}
                className="mb-3 flex w-full items-center justify-center rounded-full border border-[#143527] bg-transparent px-4 py-3 text-sm font-bold text-[#143527] transition hover:bg-[#143527]/10"
              >
                Add to compare
              </Link>
              <Link
                to={`/tnea/predictor?college=${college.id}`}
                className="mb-3 flex w-full items-center justify-center rounded-full bg-[#143527] px-4 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-[#0b2017]"
              >
                Check admission chance
              </Link>
              <Link
                to={`/counselling?college=${encodeURIComponent(college.name)}`}
                className="mb-3 flex w-full items-center justify-center rounded-full border border-[#cdddc9] bg-[#edf4ec] px-4 py-3 text-sm font-bold text-[#142e23] transition hover:bg-[#dce8da]"
              >
                Request counselling
              </Link>
              <WhatsAppButton
                source="college-page"
                message={`I want to know if ${college.name} suits my rank.`}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#143527] px-4 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-[#0b2017]"
              >
                <MessageCircle className="h-4 w-4" /> Talk to an expert
              </WhatsAppButton>
              <p className="mt-4 text-center text-xs font-medium text-[#577063]">
                Want to know if this college suits your cutoff?
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default CollegeDetails;
