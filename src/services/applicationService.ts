import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../firebase/config";
import { createDocument } from "../firebase/firestore";

import type {
  Application,
  ApplicationStatus,
} from "../types";

export const createApplication = async (
  data: Omit<
    Application,
    "id" | "createdAt" | "updatedAt"
  >
) => {
  return await createDocument(
    "applications",
    {
      ...data,

      status: "submitted",

      statusHistory: [
        {
          status: "submitted",
          message:
            "Application submitted successfully.",
          changedBy: data.userId,
          changedAt: new Date(),
        },
      ],
    }
  );
};

export const getUserApplications = async (
  userId: string
): Promise<Application[]> => {
  const applicationsRef =
    collection(
      db,
      "applications"
    );

  const q = query(
    applicationsRef,
    where(
      "userId",
      "==",
      userId
    ),
    orderBy(
      "createdAt",
      "desc"
    )
  );

  const snapshot =
    await getDocs(q);

  return snapshot.docs.map(
    (item) => ({
      id: item.id,
      ...item.data(),
    })
  ) as Application[];
};

export const getCollegeApplications =
  async (
    collegeId: string
  ): Promise<Application[]> => {
    const applicationsRef =
      collection(
        db,
        "applications"
      );

    const q = query(
      applicationsRef,
      where(
        "collegeId",
        "==",
        collegeId
      ),
      orderBy(
        "createdAt",
        "desc"
      )
    );

    const snapshot =
      await getDocs(q);

    return snapshot.docs.map(
      (item) => ({
        id: item.id,
        ...item.data(),
      })
    ) as Application[];
  };

export const getApplicationById =
  async (
    applicationId: string
  ): Promise<Application | null> => {
    const applicationRef =
      doc(
        db,
        "applications",
        applicationId
      );

    const snapshot =
      await getDoc(
        applicationRef
      );

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    } as Application;
  };

export const updateApplicationStatus =
  async (
    applicationId: string,
    status: ApplicationStatus,
    message?: string,
    changedBy?: string
  ) => {
    const applicationRef =
      doc(
        db,
        "applications",
        applicationId
      );

    const updateData: Record<
      string,
      unknown
    > = {
      status,
      updatedAt:
        serverTimestamp(),

      statusHistory:
        arrayUnion({
          status,
          message:
            message ?? "",
          changedBy:
            changedBy ?? "",
          changedAt:
            new Date(),
        }),
    };

    if (message) {
      updateData.collegeRemarks =
        message;
    }

    await updateDoc(
      applicationRef,
      updateData
    );
  };