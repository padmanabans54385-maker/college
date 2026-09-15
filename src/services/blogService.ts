import {
  createDocument,
  deleteDocument,
  getCollection,
  getDocument,
  updateDocument,
  where,
} from "../firebase/firestore";
import type { BlogPost } from "../types";

export const getPublishedBlogs = async () => {
  return await getCollection<BlogPost>("blogs", [where("published", "==", true)]);
};

export const getAllBlogs = async () => getCollection<BlogPost>("blogs");

export const getBlogById = async (id: string) => getDocument<BlogPost>("blogs", id);

export const getBlogBySlug = async (slug: string) => {
  const posts = await getCollection<BlogPost>("blogs", [where("slug", "==", slug)]);
  return posts[0] ?? null;
};

export const createBlog = async (data: Omit<BlogPost, "id" | "createdAt" | "updatedAt">) =>
  createDocument("blogs", data);

export const updateBlog = async (id: string, data: Partial<BlogPost>) =>
  updateDocument("blogs", id, data);

export const deleteBlog = async (id: string) => deleteDocument("blogs", id);
