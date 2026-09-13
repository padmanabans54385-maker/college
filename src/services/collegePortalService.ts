import {
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";

export const updateCollegeProfile = async (
  collegeId: string,
  data: {
    name?: string;
    location?: string;
    district?: string;
    state?: string;
    description?: string;
    logo?: string;
    website?: string;
    phone?: string;
    email?: string;
  }
) => {
  await updateDoc(
    doc(db, "colleges", collegeId),
    {
      ...data,
      updatedAt: new Date(),
    }
  );
};