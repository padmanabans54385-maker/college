import { useEffect, useState, type FormEvent } from "react";
import Navbar from "../components/Navbar";
import { createBlog, deleteBlog, getAllBlogs } from "../services/blogService";
import { slugify } from "../utils/display";
import type { BlogPost } from "../types";

const AdminBlog = () => {
  const [items, setItems] = useState<BlogPost[]>([]);
  const reload = () => getAllBlogs().then(setItems).catch(() => setItems([]));
  useEffect(() => { reload(); }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title"));
    await createBlog({
      title,
      slug: slugify(title),
      seoTitle: String(form.get("seoTitle") || title),
      metaDescription: String(form.get("metaDescription")),
      excerpt: String(form.get("excerpt")),
      content: String(form.get("content")),
      author: String(form.get("author")),
      category: String(form.get("category")),
      published: true,
    });
    event.currentTarget.reset();
    reload();
  };

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="font-heading text-3xl font-bold">Blog</h1>
        <form onSubmit={onSubmit} className="mt-6 grid gap-2 rounded-3xl border bg-white p-5">
          <input name="title" required placeholder="Title" className="rounded-xl border px-3 py-2" />
          <input name="seoTitle" placeholder="SEO title" className="rounded-xl border px-3 py-2" />
          <input name="metaDescription" placeholder="Meta description" className="rounded-xl border px-3 py-2" />
          <input name="author" placeholder="Author" className="rounded-xl border px-3 py-2" />
          <input name="category" placeholder="Category" className="rounded-xl border px-3 py-2" />
          <textarea name="excerpt" placeholder="Excerpt" className="rounded-xl border px-3 py-2" />
          <textarea name="content" required placeholder="Content" rows={8} className="rounded-xl border px-3 py-2" />
          <button className="rounded-xl bg-teal-700 py-2 font-semibold text-white">Publish</button>
        </form>
        <ul className="mt-6 space-y-2">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between rounded-xl border bg-white p-3 text-sm">
              <span>{item.title}</span>
              <button type="button" className="text-rose-600" onClick={() => deleteBlog(item.id).then(reload)}>Delete</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default AdminBlog;
