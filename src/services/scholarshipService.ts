import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../firebase/config";
import { createDocument } from "../firebase/firestore";

import type { Scholarship } from "../types";

const scholarshipsCollection = collection(
  db,
  "scholarships"
);

export const getScholarships = async (): Promise<
  Scholarship[]
> => {
  const q = query(
    scholarshipsCollection,
    orderBy("name")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as Scholarship[];
};

export const getPublishedScholarships = async (): Promise<
  Scholarship[]
> => {
  const q = query(
    scholarshipsCollection,
    where("published", "==", true),
    orderBy("name")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as Scholarship[];
};

export const getScholarshipById = async (
  scholarshipId: string
): Promise<Scholarship | null> => {
  const scholarshipRef = doc(
    db,
    "scholarships",
    scholarshipId
  );

  const snapshot = await getDoc(scholarshipRef);

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Scholarship;
};

export const createScholarship = async (
  data: Omit<
    Scholarship,
    "id" | "createdAt" | "updatedAt"
  >
) => {
  return await createDocument(
    "scholarships",
    data
  );
};

export const updateScholarship = async (
  scholarshipId: string,
  data: Partial<Scholarship>
) => {
  await updateDoc(
    doc(db, "scholarships", scholarshipId),
    {
      ...data,
      updatedAt: new Date(),
    }
  );
};

export const deleteScholarship = async (
  scholarshipId: string
) => {
  await deleteDoc(
    doc(db, "scholarships", scholarshipId)
  );
};