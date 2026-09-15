import {
  createDocument,
  deleteDocument,
  getCollection,
  getDocument,
  updateDocument,
  where,
} from "../firebase/firestore";
import type { AdmissionUpdate } from "../types";

export const getPublishedUpdates = async () => {
  return await getCollection<AdmissionUpdate>("admission_updates", [
    where("published", "==", true),
  ]);
};

export const getAllUpdates = async () => {
  return await getCollection<AdmissionUpdate>("admission_updates");
};

export const getUpdateById = async (id: string) =>
  getDocument<AdmissionUpdate>("admission_updates", id);

export const createUpdate = async (
  data: Omit<AdmissionUpdate, "id" | "createdAt" | "updatedAt">
) => createDocument("admission_updates", data);

export const updateAdmissionPost = async (id: string, data: Partial<AdmissionUpdate>) =>
  updateDocument("admission_updates", id, data);

export const deleteUpdate = async (id: string) =>
  deleteDocument("admission_updates", id);
