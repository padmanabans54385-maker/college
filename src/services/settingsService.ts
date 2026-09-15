import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import type { SiteContactSettings, SiteSettings } from "../types";

export const defaultContact: SiteContactSettings = {
  phone: "",
  phoneSecondary: "",
  whatsapp: "",
  email: "hello@go2college.in",
  address: "Tamil Nadu, India",
  mapsUrl: "",
  workingHours: "Mon–Sat, 9:00 AM – 7:00 PM",
};

export const getSiteSettings = async (): Promise<SiteSettings> => {
  const snapshot = await getDoc(doc(db, "settings", "contact"));
  if (!snapshot.exists()) {
    return { contact: defaultContact };
  }
  return { contact: { ...defaultContact, ...(snapshot.data() as SiteContactSettings) } };
};

export const updateContactSettings = async (contact: SiteContactSettings) => {
  await setDoc(
    doc(db, "settings", "contact"),
    { ...contact, updatedAt: serverTimestamp() },
    { merge: true }
  );
};
