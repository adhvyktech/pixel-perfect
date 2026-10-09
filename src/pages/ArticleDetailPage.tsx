import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { articles, imageOf } from "@/content/site";
import { Closing } from "@/components/site/Closing";
import { GalleryImage } from "@/components/lightbox/GalleryImage";

export function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const index = articles.findIndex((a) => a.slug === slug);

  if (index < 0) {
    return <Navigate to="/journal" replace />;
  }

  const article = articles[index]!;
  const next = articles[(index + 1) % articles.length]!;

  return (
    <>
      <article>
        <header className="bg-graphite px-5 pb-16 pt-36 text-paper md:px-10 md:pt-48">
          <Link
            to="/journal"
            className="label inline-flex items-center gap-2 text-paper/70 hover:text-teal transition-colors"
          >
            <ArrowLeft className="size-4" /> Journal
          </Link>
          <p className="label mt-12 text-teal">{article.category}</p>
          <h1 className="display-lg mt-4 max-w-[16ch]">{article.title}</h1>
        </header>

        <div className="relative aspect-[21/9] w-full overflow-hidden bg-graphite">
          <GalleryImage
            src={imageOf(article.cover)}
            alt={article.title}
            itemTitle={article.title}
            category={article.category}
            caption={`Editorial photography for ${article.title}.`}
            badgeLabel="Inspect Photo"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mx-auto max-w-2xl px-5 py-20">
          {article.body ? (
            <div className="lead whitespace-pre-line text-graphite leading-relaxed">{article.body}</div>
          ) : (
            <div className="border border-dashed border-teal/40 bg-snow p-8 shadow-xs">
              <p className="label text-teal font-semibold">Editorial Note</p>
              <h3 className="font-display text-xl font-semibold mt-3 text-graphite">
                {article.title}
              </h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                The full guide and notes for this article are currently being prepared for online publication. Check back soon for comprehensive checklists and design insights.
              </p>
            </div>
          )}
        </div>
      </article>

      <Link
        to={`/journal/${next.slug}`}
        className="group block border-t border-border bg-paper px-5 py-16 md:px-10 hover:bg-snow transition-colors"
      >
        <p className="label text-teal">Next article</p>
        <p className="display-md mt-3 flex items-center gap-4 text-graphite group-hover:text-teal transition-colors">
          {next.title}{" "}
          <ArrowRight className="size-[0.7em] transition-transform group-hover:translate-x-3" />
        </p>
      </Link>

      <Closing />
    </>
  );
}
