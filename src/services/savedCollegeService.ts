import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

import { db } from "../firebase/config";
import type { College, SavedCollege } from "../types";

const savedCollegesCollection = collection(db, "savedColleges");

const getSavedCollegeId = (userId: string, collegeId: string) =>
  `${userId}_${collegeId}`;

export const saveCollege = async (
  userId: string,
  college: College
) => {
  const id = getSavedCollegeId(userId, college.id);

  await setDoc(doc(db, "savedColleges", id), {
    userId,
    collegeId: college.id,
    collegeName: college.name,
    collegeLogo: college.logo ?? "",
    location: college.location,
    district: college.district,
    createdAt: serverTimestamp(),
  });

  return id;
};

export const removeSavedCollege = async (
  userId: string,
  collegeId: string
) => {
  const id = getSavedCollegeId(userId, collegeId);

  await deleteDoc(doc(db, "savedColleges", id));
};

export const isCollegeSaved = async (
  userId: string,
  collegeId: string
) => {
  const snapshot = await getDocs(
    query(
      savedCollegesCollection,
      where("userId", "==", userId),
      where("collegeId", "==", collegeId)
    )
  );

  return !snapshot.empty;
};

export const getSavedColleges = async (
  userId: string
): Promise<SavedCollege[]> => {
  const q = query(
    savedCollegesCollection,
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs
    .map((item) => ({
      id: item.id,
      ...item.data(),
    } as SavedCollege))
    .sort((a, b) => {
      const aTime = (a.createdAt as { toMillis?: () => number })?.toMillis?.() ?? 0;
      const bTime = (b.createdAt as { toMillis?: () => number })?.toMillis?.() ?? 0;

      return bTime - aTime;
    });
};