import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../firebase/config";
import type { CourseEnrollment, OnlineCourse } from "../types";

export const enrollInOnlineCourse = async (
  userId: string,
  courseId: string,
  courseTitle: string
) => {
  const enrollmentId = `${userId}_${courseId}`;

  const enrollmentRef = doc(
    db,
    "courseEnrollments",
    enrollmentId
  );

  const existing = await getDoc(enrollmentRef);

  if (existing.exists()) {
    return enrollmentId;
  }

  await setDoc(enrollmentRef, {
    userId,
    courseId,
    courseTitle,
    status: "active",
    progress: 0,
    enrolledAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return enrollmentId;
};

export const getOnlineCourses = async (): Promise<OnlineCourse[]> => {
  const querySnapshot = await getDocs(collection(db, "onlineCourses"));
  return querySnapshot.docs.map(
    (docSnap) => ({ id: docSnap.id, ...docSnap.data() } as OnlineCourse)
  );
};

export const getPublishedOnlineCourses = async (): Promise<OnlineCourse[]> => {
  const q = query(
    collection(db, "onlineCourses"),
    where("published", "==", true)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (docSnap) => ({ id: docSnap.id, ...docSnap.data() } as OnlineCourse)
  );
};

export const getOnlineCourseById = async (
  id: string
): Promise<OnlineCourse | null> => {
  const docRef = doc(db, "onlineCourses", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as OnlineCourse;
  }
  return null;
};

export const createOnlineCourse = async (
  courseData: Omit<OnlineCourse, "id" | "createdAt" | "updatedAt">
): Promise<string> => {
  const docRef = await addDoc(collection(db, "onlineCourses"), {
    ...courseData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

export const updateOnlineCourse = async (
  id: string,
  courseData: Partial<OnlineCourse>
): Promise<void> => {
  const docRef = doc(db, "onlineCourses", id);
  await updateDoc(docRef, {
    ...courseData,
    updatedAt: serverTimestamp(),
  });
};

export const deleteOnlineCourse = async (id: string): Promise<void> => {
  const docRef = doc(db, "onlineCourses", id);
  await deleteDoc(docRef);
};

export const getCourseEnrollment = async (
  userId: string,
  courseId: string
): Promise<CourseEnrollment | null> => {
  const enrollmentId = `${userId}_${courseId}`;
  const docRef = doc(db, "courseEnrollments", enrollmentId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as CourseEnrollment;
  }
  return null;
};

export const updateEnrollmentProgress = async (
  enrollmentId: string,
  progress: number
): Promise<void> => {
  const docRef = doc(db, "courseEnrollments", enrollmentId);
  await updateDoc(docRef, {
    progress,
    status: progress >= 100 ? "completed" : "active",
    updatedAt: serverTimestamp(),
  });
};