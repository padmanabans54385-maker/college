import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";
import { createDocument } from "../firebase/firestore";
import type { Course, CourseCategory } from "../types";

const coursesCollection = collection(db, "courses");
const categoriesCollection = collection(db, "courseCategories");

// -----------------------------
// CATEGORIES
// -----------------------------

export const getCourseCategories = async (): Promise<CourseCategory[]> => {
  const q = query(categoriesCollection, orderBy("name"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as CourseCategory[];
};

export const getCourseCategoryById = async (
  categoryId: string
): Promise<CourseCategory | null> => {
  const snapshot = await getDoc(
    doc(db, "courseCategories", categoryId)
  );

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as CourseCategory;
};

export const createCourseCategory = async (
  data: Omit<CourseCategory, "id" | "createdAt" | "updatedAt">
) => {
  return await createDocument("courseCategories", data);
};

export const updateCourseCategory = async (
  categoryId: string,
  data: Partial<CourseCategory>
) => {
  await updateDoc(doc(db, "courseCategories", categoryId), {
    ...data,
    updatedAt: new Date(),
  });
};

export const deleteCourseCategory = async (
  categoryId: string
) => {
  await deleteDoc(doc(db, "courseCategories", categoryId));
};

// -----------------------------
// COURSES
// -----------------------------

export const getCourses = async (): Promise<Course[]> => {
  const q = query(coursesCollection, orderBy("name"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as Course[];
};

export const getPublishedCourses = async (): Promise<Course[]> => {
  const q = query(
    coursesCollection,
    where("published", "==", true),
    orderBy("name")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as Course[];
};

export const getCourseById = async (
  courseId: string
): Promise<Course | null> => {
  const snapshot = await getDoc(
    doc(db, "courses", courseId)
  );

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Course;
};

export const getCoursesByCollege = async (
  collegeId: string
): Promise<Course[]> => {
  const q = query(
    coursesCollection,
    where("collegeIds", "array-contains", collegeId),
    where("published", "==", true),
    orderBy("name")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as Course[];
};

export const getCoursesByCategory = async (
  categoryId: string
): Promise<Course[]> => {
  const q = query(
    coursesCollection,
    where("categoryId", "==", categoryId),
    where("published", "==", true),
    orderBy("name")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as Course[];
};

export const createCourse = async (
  data: Omit<Course, "id" | "createdAt" | "updatedAt">
) => {
  return await createDocument("courses", data);
};

export const updateCourse = async (
  courseId: string,
  data: Partial<Course>
) => {
  await updateDoc(doc(db, "courses", courseId), {
    ...data,
    updatedAt: new Date(),
  });
};

export const deleteCourse = async (
  courseId: string
) => {
  await deleteDoc(doc(db, "courses", courseId));
};