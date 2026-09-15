import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";

import type {
  UserProfile,
  UserRole,
} from "../types";

export const createUserProfile = async (
  userId: string,
  data: {
    name: string;
    email: string;
    role?: UserRole;
    phone?: string;
  }
) => {
  const userRef = doc(db, "users", userId);

  const profile = {
    name: data.name,
    email: data.email,
    phone: data.phone ?? "",
    role: data.role ?? "student",
    profileImage: "",
    createdAt: serverTimestamp(),
  };

  await setDoc(userRef, profile);

  return profile;
};

export const getUserProfile = async (
  userId: string
): Promise<UserProfile | null> => {
  const userRef = doc(db, "users", userId);

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as UserProfile;
};

export const getAllUsers = async () => {
  const snapshot = await getDocs(collection(db, "users"));
  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as UserProfile[];
};
