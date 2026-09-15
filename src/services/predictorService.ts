import type { ChoiceListItem, College, CutoffRecord } from "../types";
import { getAdmissionLikelihood } from "./cutoffService";

export const buildChoiceBuckets = (
  cutoffs: CutoffRecord[],
  colleges: College[],
  studentCutoff: number,
  preferences: {
    branches?: string[];
    cities?: string[];
    collegeType?: string;
    hostelRequired?: boolean;
    budget?: string;
  }
) => {
  const collegeMap = new Map(colleges.map((college) => [college.id, college]));

  const scored = cutoffs
    .filter((row) => Number.isFinite(row.cutoff))
    .map((row) => {
      const college = collegeMap.get(row.collegeId);
      const likelihood = getAdmissionLikelihood(studentCutoff, row.cutoff);
      let score = 0;
      if (preferences.branches?.some((branch) =>
        row.branch.toLowerCase().includes(branch.toLowerCase())
      )) {
        score += 20;
      }
      if (preferences.cities?.some((city) =>
        (college?.city || college?.location || college?.district || "")
          .toLowerCase()
          .includes(city.toLowerCase())
      )) {
        score += 15;
      }
      if (
        preferences.collegeType &&
        college?.collegeType?.toLowerCase() === preferences.collegeType.toLowerCase()
      ) {
        score += 10;
      }
      if (preferences.hostelRequired && college?.hostelAvailable) score += 5;

      const item: ChoiceListItem = {
        collegeId: row.collegeId,
        collegeName: college?.name || row.collegeName || "College",
        branch: row.branch,
        location: college?.location || row.district,
        historicalCutoff: row.cutoff,
        competitiveness:
          likelihood === "lower" ? "dream" : likelihood === "moderate" ? "target" : "safe",
        estimatedCompetitiveness:
          likelihood === "lower"
            ? "Dream — historically more competitive"
            : likelihood === "moderate"
              ? "Target — reasonably close to previous cut-off"
              : "Safe — previous cut-off is at or below your mark",
        fees: college?.fees?.estimatedAnnual || college?.feeRange,
        placement: college?.placements?.averagePackage,
        reason: preferences.branches?.length
          ? `Matches preferred branch and historical ${row.community} cut-off of ${row.cutoff}.`
          : `Based on historical ${row.community} cut-off of ${row.cutoff} (year ${row.year}).`,
      };

      return { item, likelihood, score };
    })
    .sort((a, b) => b.score - a.score || b.item.historicalCutoff! - a.item.historicalCutoff!);

  const dream = scored.filter((row) => row.item.competitiveness === "dream").map((row) => row.item);
  const target = scored.filter((row) => row.item.competitiveness === "target").map((row) => row.item);
  const safe = scored.filter((row) => row.item.competitiveness === "safe").map((row) => row.item);

  return { dream, target, safe };
};
