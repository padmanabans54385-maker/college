import {
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";

export interface StudentProfileUpdate {
  name?: string;
  phone?: string;
  profileImage?: string;

  preferredState?: string;
  preferredDistrict?: string;
  preferredCourseIds?: string[];

  dateOfBirth?: string;
  gender?: string;

  address?: string;
  city?: string;
  pincode?: string;

  schoolName?: string;
  board?: string;
  passingYear?: string;
  percentage?: string;

  academicLevel?: string;
  tneaRank?: string;
  cutoff?: string;
  community?: string;
  preferredCourse?: string;
  preferredLocations?: string[];
  budget?: string;
}

export const updateStudentProfile = async (
  userId: string,
  data: StudentProfileUpdate
) => {
  await updateDoc(doc(db, "users", userId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
};