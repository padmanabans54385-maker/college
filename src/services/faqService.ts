import {
  createDocument,
  deleteDocument,
  getCollection,
  updateDocument,
  where,
} from "../firebase/firestore";
import type { FaqItem } from "../types";

export const getPublishedFaqs = async () => {
  return await getCollection<FaqItem>("faqs", [where("published", "==", true)]);
};

export const getAllFaqs = async () => getCollection<FaqItem>("faqs");

export const createFaq = async (data: Omit<FaqItem, "id" | "createdAt" | "updatedAt">) =>
  createDocument("faqs", data);

export const updateFaq = async (id: string, data: Partial<FaqItem>) =>
  updateDocument("faqs", id, data);

export const deleteFaq = async (id: string) => deleteDocument("faqs", id);
