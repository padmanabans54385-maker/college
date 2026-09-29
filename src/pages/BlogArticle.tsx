import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { EmptyState, LoadingSkeleton } from "../components/ui/States";
import { getBlogBySlug } from "../services/blogService";
import { trackEvent } from "../services/analytics";
import type { BlogPost } from "../types";
import { ArrowLeft, Share2, Copy, BookOpen } from "lucide-react";

const BlogArticle = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;
    getBlogBySlug(slug)
      .then((item) => {
        setPost(item);
        if (item) trackEvent("blog_view", { slug });
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <LoadingSkeleton label="Loading article" />;
  if (!post) {
    return (
      <main className="bg-[#F5F9FC] py-16">
        <div className="mx-auto max-w-3xl px-4">
          <EmptyState title="Article not found" description="This blog post is unavailable or may have been moved." />
        </div>
      </main>
    );
  }

  const copy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="bg-[#F5F9FC] py-12">
      <Seo title={post.seoTitle || post.title} description={post.metaDescription || post.excerpt || post.title} path={`/blog/${post.slug}`} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-[#075B63] hover:underline mb-6">
          <ArrowLeft size={16} /> Back to blog
        </Link>

        <div className="rounded-3xl border border-[#E2ECF3] bg-white p-8 sm:p-12 shadow-md">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E2ECF3] bg-[#F0F8FD] px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#075B63]">
            <BookOpen className="h-3.5 w-3.5" />
            {post.category}
          </div>

          <h1 className="mt-4 font-heading text-3xl sm:text-4xl font-extrabold text-[#075B63] leading-tight">
            {post.title}
          </h1>

          {post.author && (
            <p className="mt-3 text-sm font-semibold text-[#5A6E78]">
              By {post.author}
            </p>
          )}

          <article className="mt-8 whitespace-pre-wrap text-base text-[#075B63] leading-relaxed border-t border-[#E2ECF3]/60 pt-8">
            {post.content}
          </article>

          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-[#E2ECF3]/60 pt-6">
            <a
              className="inline-flex items-center gap-2 rounded-full bg-[#075B63] px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-[#05434A]"
              href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + window.location.href)}`}
              target="_blank"
              rel="noreferrer"
            >
              <Share2 size={16} /> Share to WhatsApp
            </a>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-2 rounded-full border border-[#E2ECF3] bg-[#F0F8FD] px-5 py-2.5 text-sm font-semibold text-[#075B63] transition hover:bg-[#E8F4FA]"
            >
              <Copy size={16} /> {copied ? "Copied!" : "Copy link"}
            </button>
          </div>
        </div>

        {post.faqs && post.faqs.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: post.faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: { "@type": "Answer", text: faq.answer },
                })),
              }),
            }}
          />
        )}
      </div>
    </main>
  );
};

export default BlogArticle;
