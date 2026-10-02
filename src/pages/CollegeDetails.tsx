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
      <div className="bg-[#F5F9FC] py-16">
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

  const getSectionBody = (title: string): string | null => {
    switch (title) {
      case "Overview":
        return (college.overview || college.description || "").trim() || null;
      case "University":
        return (college.university || "").trim() || null;
      case "College Type":
        return (college.collegeType || "").trim() || null;
      case "TNEA Code":
        return (college.tneaCode || "").trim() || null;
      case "Eligibility":
        return (college.eligibility || "").trim() || null;
      case "Admission":
        return (college.admission || college.admissionNotes || "").trim() || null;
      case "Tuition Fees":
        return (college.tuitionFees || college.fees?.tuition || college.feeRange || "").trim() || null;
      case "Hostel":
        return (college.hostelInfo || college.hostel?.details || (college.hostelAvailable ? "Hostel Facilities Available" : "")).trim() || null;
      case "Facilities":
        return Array.isArray(college.facilities) ? college.facilities.join(", ").trim() || null : (college.facilities || "").trim() || null;
      case "Placement":
        if (typeof college.placement === "string" && college.placement.trim()) {
          return college.placement.trim();
        }
        const pl = [
          college.placements?.rate && `Placement Rate: ${college.placements.rate}`,
          college.placements?.averagePackage && `Average Package: ${college.placements.averagePackage}`,
          college.placements?.highestPackage && `Highest Package: ${college.placements.highestPackage}`,
        ].filter(Boolean).join(" · ");
        return pl.trim() || null;
      case "Recruiters":
        return Array.isArray(college.recruiters) ? college.recruiters.join(", ").trim() || null : (college.recruiters || "").trim() || null;
      case "Accreditation":
        return (college.accreditation || college.naacGrade || "").trim() || null;
      case "Rankings":
        return (college.rankings || college.nirfRank || "").trim() || null;
      case "Contact":
        return (college.contactInfo || [college.phone, college.email, college.website].filter(Boolean).join(" · ") || college.contact?.phone || "").trim() || null;
      default:
        return null;
    }
  };

  const allSectionTitles = [
    "Overview",
    "University",
    "College Type",
    "TNEA Code",
    "Eligibility",
    "Admission",
    "Tuition Fees",
    "Hostel",
    "Facilities",
    "Placement",
    "Recruiters",
    "Accreditation",
    "Rankings",
    "Contact",
  ];

  const validSections = allSectionTitles
    .map((title) => ({ title, body: getSectionBody(title) }))
    .filter((sec): sec is { title: string; body: string } => Boolean(sec.body));

  return (
    <main className="min-h-screen bg-[#F5F9FC] py-10">
      <Seo
        title={college.name}
        description={(college.overview || college.description)?.slice(0, 150) || `Explore ${college.name} in ${college.location}.`}
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
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#143527]">
                    {college.collegeType || "Accredited College"}
                  </span>
                  {college.tneaCode && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-[#cdddc9] bg-[#dce8da] px-3.5 py-1 text-xs font-bold text-[#143527]">
                      TNEA Code: {college.tneaCode}
                    </span>
                  )}
                </div>
                <h1 className="mt-3 font-heading text-3xl font-extrabold text-[#142e23] sm:text-4xl">{college.name}</h1>
                <p className="mt-2 flex items-center gap-2 text-sm text-[#465f51]">
                  <MapPin className="h-4 w-4 text-[#143527]" /> {displayValue(college.location)}{college.district ? `, ${college.district}` : ""}
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
              {validSections.map((section) => (
                <section key={section.title} className="rounded-3xl border border-[#cdddc9] bg-white p-6 shadow-xs">
                  <h2 className="font-heading text-lg font-bold text-[#143527]">{section.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#465f51] whitespace-pre-line">{section.body}</p>
                </section>
              ))}
              {college.faqs && college.faqs.length > 0 && (
                <section className="rounded-3xl border border-[#E2ECF3] bg-white p-6 shadow-xs">
                  <h2 className="font-heading text-lg font-bold text-[#075B63]">Frequently asked questions</h2>
                  <dl className="mt-4 space-y-4">
                    {college.faqs.map((faq) => (
                      <div key={faq.question} className="border-b border-[#E2ECF3]/60 pb-3 last:border-0">
                        <dt className="font-semibold text-[#075B63]">{faq.question}</dt>
                        <dd className="mt-1 text-sm text-[#5A6E78]">{faq.answer}</dd>
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
            <div className="rounded-3xl border border-[#E2ECF3] bg-white p-6 shadow-md">
              <button
                type="button"
                onClick={toggleSave}
                className="mb-3 flex w-full items-center justify-center gap-2 rounded-full border border-[#E2ECF3] bg-[#F0F8FD] px-4 py-3 text-sm font-bold text-[#075B63] transition hover:bg-[#E8F4FA]"
              >
                <Heart className={`h-4 w-4 ${saved ? "fill-[#075B63] text-[#075B63]" : "text-[#075B63]"}`} />
                {saved ? "Saved to profile" : "Save college"}
              </button>
              <Link
                to={`/compare?ids=${college.id}`}
                className="mb-3 flex w-full items-center justify-center rounded-full border border-[#075B63] bg-transparent px-4 py-3 text-sm font-bold text-[#075B63] transition hover:bg-[#075B63]/10"
              >
                Add to compare
              </Link>
              <Link
                to={`/tnea/predictor?college=${college.id}`}
                className="mb-3 flex w-full items-center justify-center rounded-full bg-[#075B63] px-4 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-[#05434A]"
              >
                Check admission chance
              </Link>
              <Link
                to={`/counselling?college=${encodeURIComponent(college.name)}`}
                className="mb-3 flex w-full items-center justify-center rounded-full border border-[#E2ECF3] bg-[#F5F9FC] px-4 py-3 text-sm font-bold text-[#075B63] transition hover:bg-[#E8F4FA]"
              >
                Request counselling
              </Link>
              <WhatsAppButton
                source="college-page"
                message={`I want to know if ${college.name} suits my rank.`}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#075B63] px-4 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-[#05434A]"
              >
                <MessageCircle className="h-4 w-4" /> Talk to an expert
              </WhatsAppButton>
              <p className="mt-4 text-center text-xs font-medium text-[#5A6E78]">
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
