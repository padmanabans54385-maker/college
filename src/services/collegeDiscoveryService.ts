import type { College, UserProfile } from "../types";

export interface CollegeFilters {
  search: string;
  state: string;
  district: string;
  course: string;
  verifiedOnly: boolean;
  collegeType: string;
  autonomous: string;
  tnea: string;
  hostel: string;
  scholarship: string;
  sort:
    | "name-asc"
    | "name-desc"
    | "location"
    | "relevance"
    | "fees"
    | "placement";
}

export const filterColleges = (
  colleges: College[],
  filters: CollegeFilters
) => {
  const search = filters.search.trim().toLowerCase();

  return colleges
    .filter((college) => {
      if (search) {
        const searchableText = [
          college.name,
          college.location,
          college.district,
          college.state,
          college.city,
          college.university,
          college.description,
          college.tneaCode,
          ...(college.courses ?? []),
        ]
          .join(" ")
          .toLowerCase();

        if (!searchableText.includes(search)) return false;
      }

      if (filters.state && college.state !== filters.state) return false;
      if (
        filters.district &&
        college.district !== filters.district &&
        college.city !== filters.district
      ) {
        return false;
      }
      if (filters.course) {
        const matchesCourse = (college.courses ?? []).some((course) =>
          course.toLowerCase().includes(filters.course.toLowerCase())
        );
        if (!matchesCourse) return false;
      }
      if (filters.verifiedOnly && !college.verified) return false;
      if (
        filters.collegeType &&
        college.collegeType?.toLowerCase() !== filters.collegeType.toLowerCase()
      ) {
        return false;
      }
      if (filters.autonomous === "yes" && !college.autonomous) return false;
      if (filters.autonomous === "no" && college.autonomous) return false;
      if (filters.tnea === "yes" && !college.tneaParticipant) return false;
      if (filters.hostel === "yes" && !college.hostelAvailable) return false;
      if (filters.scholarship === "yes" && !college.scholarshipAvailable) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (filters.sort === "name-desc") return b.name.localeCompare(a.name);
      if (filters.sort === "location") {
        return (a.location || "").localeCompare(b.location || "");
      }
      if (filters.sort === "fees") {
        return (a.feeRange || "").localeCompare(b.feeRange || "");
      }
      if (filters.sort === "placement") {
        return (b.placements?.averagePackage || "").localeCompare(
          a.placements?.averagePackage || ""
        );
      }
      return a.name.localeCompare(b.name);
    });
};

export const getCollegeRecommendationScore = (
  college: College,
  profile: UserProfile | null
) => {
  if (!profile) return 0;
  let score = 0;
  if (
    profile.preferredState &&
    college.state?.toLowerCase() === profile.preferredState.toLowerCase()
  ) {
    score += 30;
  }
  if (
    profile.preferredDistrict &&
    (college.district?.toLowerCase() === profile.preferredDistrict.toLowerCase() ||
      college.city?.toLowerCase() === profile.preferredDistrict.toLowerCase())
  ) {
    score += 50;
  }
  if (
    profile.preferredCourse &&
    (college.courses ?? []).some((course) =>
      course.toLowerCase().includes(profile.preferredCourse!.toLowerCase())
    )
  ) {
    score += 25;
  }
  if (college.verified) score += 10;
  return score;
};
