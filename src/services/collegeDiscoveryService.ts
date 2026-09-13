import type { College, UserProfile } from "../types";

export interface CollegeFilters {
  search: string;
  state: string;
  district: string;
  course: string;
  verifiedOnly: boolean;
  sort: "name-asc" | "name-desc" | "location";
}

export const filterColleges = (
  colleges: College[],
  filters: CollegeFilters
) => {
  const search = filters.search
    .trim()
    .toLowerCase();

  return colleges
    .filter((college) => {
      if (search) {
        const searchableText = [
          college.name,
          college.location,
          college.district,
          college.state,
          college.description,
        ]
          .join(" ")
          .toLowerCase();

        if (!searchableText.includes(search)) {
          return false;
        }
      }

      if (
        filters.state &&
        college.state !== filters.state
      ) {
        return false;
      }

      if (
        filters.district &&
        college.district !== filters.district
      ) {
        return false;
      }

      if (filters.course) {
        const courses =
          college.courses ?? [];

        const matchesCourse = courses.some(
          (course) =>
            course
              .toLowerCase()
              .includes(
                filters.course.toLowerCase()
              )
        );

        if (!matchesCourse) {
          return false;
        }
      }

      if (
        filters.verifiedOnly &&
        !college.verified
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (filters.sort === "name-desc") {
        return b.name.localeCompare(a.name);
      }

      if (filters.sort === "location") {
        return a.location.localeCompare(
          b.location
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
    college.state?.toLowerCase() ===
      profile.preferredState.toLowerCase()
  ) {
    score += 30;
  }

  if (
    profile.preferredDistrict &&
    college.district?.toLowerCase() ===
      profile.preferredDistrict.toLowerCase()
  ) {
    score += 50;
  }

  if (college.verified) {
    score += 10;
  }

  return score;
};