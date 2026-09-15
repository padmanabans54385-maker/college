import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { createDocument } from "../firebase/firestore";
import type { SavedComparison } from "../types";

export const saveComparison = async (userId: string, collegeIds: string[]) => {
  return createDocument("comparisons", { userId, collegeIds });
};

export const getUserComparisons = async (userId: string) => {
  const q = query(collection(db, "comparisons"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as SavedComparison[];
};
