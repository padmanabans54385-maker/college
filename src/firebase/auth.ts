import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";

import { auth } from "./config";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const credential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  await updateProfile(credential.user, {
    displayName: name,
  });

  return credential.user;
};

export const loginUser = async (
  email: string,
  password: string
) => {
  const credential =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  return credential.user;
};

export const logoutUser = async () => {
  await signOut(auth);
};

export const subscribeToAuth = (
  callback: (user: User | null) => void
) => {
  return onAuthStateChanged(auth, callback);
};