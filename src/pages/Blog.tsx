import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { EmptyState } from "../components/ui/States";
import { getPublishedBlogs } from "../services/blogService";
import type { BlogPost } from "../types";
import { BookOpen, ArrowRight } from "lucide-react";

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    getPublishedBlogs().then(setPosts).catch(() => setPosts([]));
  }, []);

  return (
    <main className="bg-[#F5F9FC] py-12">
      <Seo title="Education Blog" description="Guides on TNEA choice filling, college selection and fees in Tamil Nadu." path="/blog" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E2ECF3] bg-[#F0F8FD] px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#075B63]">
          <BookOpen className="h-3.5 w-3.5 text-[#075B63]" />
          Articles & Insights
        </div>

        <h1 className="mt-4 font-heading text-4xl font-extrabold text-[#075B63] sm:text-5xl">
          Education <span className="font-serif-italic font-normal italic text-[#075B63]">blog</span>
        </h1>
        <p className="mt-2 text-base text-[#5A6E78]">
          In-depth guides on TNEA admissions, engineering branch selection, cutoff analysis, and college comparisons.
        </p>

        {posts.length === 0 ? (
          <div className="mt-8">
            <EmptyState title="No articles yet" description="Published guides from the editorial team will appear here." />
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group flex flex-col justify-between rounded-3xl border border-[#E2ECF3] bg-white p-6 sm:p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-[#075B63]/40 hover:shadow-md"
              >
                <div>
                  <div className="inline-flex items-center rounded-full border border-[#E2ECF3] bg-[#F0F8FD] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#075B63]">
                    {post.category}
                  </div>
                  <h2 className="mt-4 font-heading text-2xl font-bold text-[#075B63] transition group-hover:text-[#075B63]">
                    {post.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-sm text-[#5A6E78] leading-relaxed">
                    {post.excerpt || post.metaDescription}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-[#075B63]">
                  <span>Read article</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Blog;
