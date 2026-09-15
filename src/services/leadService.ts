import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import { createDocument, getCollection, updateDocument } from "../firebase/firestore";
import type { Lead, LeadStatus } from "../types";

export const createLead = async (
  data: Omit<Lead, "id" | "createdAt" | "updatedAt" | "status"> & {
    status?: LeadStatus;
  }
) => {
  return await createDocument("leads", {
    status: "new",
    ...data,
  });
};

export const getLeads = async () => {
  return await getCollection<Lead>("leads", [orderBy("createdAt", "desc")]);
};

export const updateLeadStatus = async (id: string, status: LeadStatus) => {
  await updateDocument("leads", id, { status });
};

export const getUserLeads = async (email: string) => {
  const q = query(collection(db, "leads"), where("email", "==", email));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() })) as Lead[];
};
