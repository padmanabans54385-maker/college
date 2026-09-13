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
import type { SavedScholarship, Scholarship } from "../types";

const savedScholarshipsCollection = collection(
  db,
  "savedScholarships"
);

const getSavedScholarshipId = (
  userId: string,
  scholarshipId: string
) => `${userId}_${scholarshipId}`;

export const saveScholarship = async (
  userId: string,
  scholarship: Scholarship
) => {
  const id = getSavedScholarshipId(
    userId,
    scholarship.id
  );

  await setDoc(doc(db, "savedScholarships", id), {
    userId,
    scholarshipId: scholarship.id,
    scholarshipName: scholarship.name,
    provider: scholarship.provider,
    amount: scholarship.amount,
    createdAt: serverTimestamp(),
  });

  return id;
};

export const removeSavedScholarship = async (
  userId: string,
  scholarshipId: string
) => {
  const id = getSavedScholarshipId(
    userId,
    scholarshipId
  );

  await deleteDoc(
    doc(db, "savedScholarships", id)
  );
};

export const isScholarshipSaved = async (
  userId: string,
  scholarshipId: string
) => {
  const q = query(
    savedScholarshipsCollection,
    where("userId", "==", userId),
    where("scholarshipId", "==", scholarshipId)
  );

  const snapshot = await getDocs(q);

  return !snapshot.empty;
};

export const getSavedScholarships = async (
  userId: string
): Promise<SavedScholarship[]> => {
  const q = query(
    savedScholarshipsCollection,
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs
    .map((item) => ({
      id: item.id,
      ...item.data(),
    } as SavedScholarship))
    .sort((a, b) => {
      const aTime = (a.createdAt as { toMillis?: () => number })?.toMillis?.() ?? 0;
      const bTime = (b.createdAt as { toMillis?: () => number })?.toMillis?.() ?? 0;

      return bTime - aTime;
    });
};