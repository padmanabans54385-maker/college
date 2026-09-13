import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase/config";
import { createDocument } from "../firebase/firestore";
import type { Enquiry } from "../types";

export const createEnquiry = async (data: {
  userId?: string;
  collegeId: string;
  collegeName: string;
  name: string;
  email: string;
  phone: string;
  course?: string;
  message?: string;
}) => {
  return await createDocument("enquiries", {
    ...data,
    status: "new",
  });
};

export const getUserEnquiries = async (
  userId: string
): Promise<Enquiry[]> => {
  const enquiriesRef = collection(db, "enquiries");

  const q = query(
    enquiriesRef,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as Enquiry[];
};

export const getCollegeEnquiries = async (
  collegeId: string
): Promise<Enquiry[]> => {
  const enquiriesRef = collection(db, "enquiries");

  const q = query(
    enquiriesRef,
    where("collegeId", "==", collegeId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as Enquiry[];
};