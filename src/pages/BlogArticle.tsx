import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Seo } from "../components/Seo";
import { EmptyState, LoadingSkeleton } from "../components/ui/States";
import { getBlogBySlug } from "../services/blogService";
import { trackEvent } from "../services/analytics";
import type { BlogPost } from "../types";

const BlogArticle = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    getBlogBySlug(slug)
      .then((item) => {
        setPost(item);
        if (item) trackEvent("blog_view", { slug });
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <LoadingSkeleton />;
  if (!post) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState title="Article not found" description="This blog post is unavailable." />
      </main>
    );
  }

  const copy = async () => {
    await navigator.clipboard.writeText(window.location.href);
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Seo title={post.seoTitle || post.title} description={post.metaDescription || post.excerpt || post.title} path={`/blog/${post.slug}`} />
      <p className="text-xs font-bold uppercase text-teal-700">{post.category}</p>
      <h1 className="mt-2 font-heading text-4xl font-extrabold">{post.title}</h1>
      <p className="mt-2 text-sm text-slate-500">{post.author}</p>
      <article className="prose mt-8 max-w-none whitespace-pre-wrap text-slate-700">{post.content}</article>
      <div className="mt-8 flex gap-3 text-sm">
        <a
          className="rounded-full border px-4 py-2 font-semibold"
          href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + window.location.href)}`}
          target="_blank"
          rel="noreferrer"
        >
          Share to WhatsApp
        </a>
        <button type="button" onClick={copy} className="rounded-full border px-4 py-2 font-semibold">
          Copy link
        </button>
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
    </main>
  );
};

export default BlogArticle;
