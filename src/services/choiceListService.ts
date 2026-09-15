import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { createDocument, deleteDocument, updateDocument } from "../firebase/firestore";
import type { ChoiceList } from "../types";

export const saveChoiceList = async (
  data: Omit<ChoiceList, "id" | "createdAt" | "updatedAt">
) => createDocument("choice_lists", data);

export const getUserChoiceLists = async (userId: string) => {
  const q = query(collection(db, "choice_lists"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as ChoiceList[];
};

export const updateChoiceList = async (id: string, data: Partial<ChoiceList>) =>
  updateDocument("choice_lists", id, data);

export const deleteChoiceList = async (id: string) =>
  deleteDocument("choice_lists", id);

export const getAllChoiceLists = async () => {
  const snapshot = await getDocs(collection(db, "choice_lists"));
  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as ChoiceList[];
};
