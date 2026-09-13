import { uploadFile } from "../firebase/storage";

export type ApplicationDocumentType =
  | "photo"
  | "marksheet"
  | "idProof";

export const uploadApplicationDocument =
  async (
    userId: string,
    applicationId: string,
    type: ApplicationDocumentType,
    file: File
  ) => {
    if (!file) {
      throw new Error(
        "No file selected."
      );
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {
      throw new Error(
        "Only JPG, PNG, WEBP and PDF files are allowed."
      );
    }

    const maxSize =
      type === "photo"
        ? 2 * 1024 * 1024
        : 5 * 1024 * 1024;

    if (file.size > maxSize) {
      throw new Error(
        type === "photo"
          ? "Photo must be smaller than 2MB."
          : "Document must be smaller than 5MB."
      );
    }

    const safeName = file.name
      .replace(
        /[^a-zA-Z0-9.-]/g,
        "_"
      );

    const path =
      `applications/${userId}/${applicationId}/` +
      `${type}-${Date.now()}-${safeName}`;

    return await uploadFile(
      file,
      path
    );
  };