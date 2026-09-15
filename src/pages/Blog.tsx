import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { EmptyState } from "../components/ui/States";
import { getPublishedBlogs } from "../services/blogService";
import type { BlogPost } from "../types";

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    getPublishedBlogs().then(setPosts).catch(() => setPosts([]));
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <Seo title="Education Blog" description="Guides on TNEA choice filling, college selection and fees in Tamil Nadu." path="/blog" />
      <h1 className="font-heading text-4xl font-extrabold">Education blog</h1>
      {posts.length === 0 ? (
        <div className="mt-8">
          <EmptyState title="No articles yet" description="Admin can publish SEO-friendly guides from the blog CMS." />
        </div>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="rounded-3xl border bg-white p-6">
              <p className="text-xs font-bold uppercase text-teal-700">{post.category}</p>
              <h2 className="mt-2 font-heading text-xl font-bold">{post.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{post.excerpt || post.metaDescription}</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};

export default Blog;
