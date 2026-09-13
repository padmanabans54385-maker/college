import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  type DocumentData,
  type QueryConstraint,
} from "firebase/firestore";

import { db } from "./config";

export const getCollection = async <T = DocumentData>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<T[]> => {
  const collectionRef = collection(db, collectionName);

  const firestoreQuery =
    constraints.length > 0
      ? query(collectionRef, ...constraints)
      : query(collectionRef);

  const snapshot = await getDocs(firestoreQuery);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as T[];
};

export const getDocument = async <T = DocumentData>(
  collectionName: string,
  documentId: string
): Promise<T | null> => {
  const documentRef = doc(
    db,
    collectionName,
    documentId
  );

  const snapshot = await getDoc(documentRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as T;
};

export const createDocument = async (
  collectionName: string,
  data: DocumentData
) => {
  return await addDoc(
    collection(db, collectionName),
    {
      ...data,
      createdAt: serverTimestamp(),
    }
  );
};

export const setDocument = async (
  collectionName: string,
  documentId: string,
  data: DocumentData
) => {
  await setDoc(
    doc(db, collectionName, documentId),
    {
      ...data,
      createdAt: serverTimestamp(),
    }
  );
};

export const updateDocument = async (
  collectionName: string,
  documentId: string,
  data: DocumentData
) => {
  await updateDoc(
    doc(db, collectionName, documentId),
    {
      ...data,
      updatedAt: serverTimestamp(),
    }
  );
};

export const deleteDocument = async (
  collectionName: string,
  documentId: string
) => {
  await deleteDoc(
    doc(db, collectionName, documentId)
  );
};

export {
  orderBy,
  where,
};