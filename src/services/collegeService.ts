import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";
import { createDocument } from "../firebase/firestore";
import type { College } from "../types";

const collegesCollection = collection(db, "colleges");

export const getColleges = async (): Promise<College[]> => {
  const q = query(
    collegesCollection,
    orderBy("name")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as College[];
};

export const getCollegeById = async (
  collegeId: string
): Promise<College | null> => {
  const collegeRef = doc(db, "colleges", collegeId);

  const snapshot = await getDoc(collegeRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as College;
};

export const createCollege = async (
  data: Omit<
    College,
    "id" | "createdAt" | "updatedAt"
  >
) => {
  return await createDocument("colleges", data);
};

export const updateCollege = async (
  collegeId: string,
  data: Partial<College>
) => {
  const collegeRef = doc(
    db,
    "colleges",
    collegeId
  );

  await updateDoc(collegeRef, {
    ...data,
    updatedAt: new Date(),
  });
};

export const deleteCollege = async (
  collegeId: string
) => {
  await deleteDoc(
    doc(db, "colleges", collegeId)
  );
};