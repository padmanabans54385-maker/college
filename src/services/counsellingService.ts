import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { createDocument, getCollection, updateDocument } from "../firebase/firestore";
import type { CounsellingRequest } from "../types";

export const createCounsellingRequest = async (
  data: Omit<CounsellingRequest, "id" | "createdAt" | "updatedAt" | "status">
) => {
  return await createDocument("counselling_requests", {
    ...data,
    status: "new",
  });
};

export const getCounsellingRequests = async () => {
  return await getCollection<CounsellingRequest>("counselling_requests", [
    orderBy("createdAt", "desc"),
  ]);
};

export const getUserCounsellingRequests = async (userId: string) => {
  const q = query(
    collection(db, "counselling_requests"),
    where("userId", "==", userId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as CounsellingRequest[];
};

export const updateCounsellingStatus = async (
  id: string,
  status: CounsellingRequest["status"]
) => {
  await updateDocument("counselling_requests", id, { status });
};
