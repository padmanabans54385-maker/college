import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import {
  createDocument,
  deleteDocument,
  getCollection,
  updateDocument,
} from "../firebase/firestore";
import type { CutoffRecord } from "../types";

export const getCutoffs = async () => {
  return await getCollection<CutoffRecord>("cutoffs");
};

export const queryCutoffs = async (filters: {
  year?: string;
  community?: string;
  branch?: string;
  collegeId?: string;
  district?: string;
}) => {
  const constraints = [];
  if (filters.year) constraints.push(where("year", "==", Number(filters.year) || filters.year));
  if (filters.community) constraints.push(where("community", "==", filters.community));
  if (filters.branch) constraints.push(where("branch", "==", filters.branch));
  if (filters.collegeId) constraints.push(where("collegeId", "==", filters.collegeId));
  if (filters.district) constraints.push(where("district", "==", filters.district));

  if (constraints.length === 0) {
    return getCutoffs();
  }

  try {
    const q = query(collection(db, "cutoffs"), ...constraints);
    const snapshot = await getDocs(q);
    return snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    })) as CutoffRecord[];
  } catch {
    const all = await getCutoffs();
    return all.filter((item) => {
      if (filters.year && String(item.year) !== String(filters.year)) return false;
      if (filters.community && item.community !== filters.community) return false;
      if (filters.branch && item.branch !== filters.branch) return false;
      if (filters.collegeId && item.collegeId !== filters.collegeId) return false;
      if (filters.district && item.district !== filters.district) return false;
      return true;
    });
  }
};

export const createCutoff = async (
  data: Omit<CutoffRecord, "id" | "createdAt" | "updatedAt">
) => createDocument("cutoffs", data);

export const updateCutoff = async (id: string, data: Partial<CutoffRecord>) =>
  updateDocument("cutoffs", id, data);

export const deleteCutoff = async (id: string) => deleteDocument("cutoffs", id);

export type Likelihood = "higher" | "moderate" | "lower";

export const getAdmissionLikelihood = (
  studentCutoff: number,
  historicalCutoff: number
): Likelihood => {
  const delta = studentCutoff - historicalCutoff;
  if (delta >= 3) return "higher";
  if (delta >= -2) return "moderate";
  return "lower";
};

export const likelihoodLabel = (value: Likelihood) => {
  if (value === "higher") return "Higher possibility";
  if (value === "moderate") return "Moderate possibility";
  return "Lower possibility";
};
