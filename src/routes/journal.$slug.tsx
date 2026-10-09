import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { articles, imageOf } from "@/content/site";
import { Closing } from "@/components/site/Closing";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const i = articles.findIndex((a) => a.slug === params.slug);
    if (i < 0) throw notFound();
    return { article: articles[i], next: articles[(i + 1) % articles.length] };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.article.title} — D’Dezignz Journal` },
          { name: "description", content: `${loaderData.article.title}: notes from the D’Dezignz Interiors journal.` },
          { property: "og:title", content: `${loaderData.article.title} — D’Dezignz Journal` },
          { property: "og:description", content: `A ${loaderData.article.category.toLowerCase()} article from D’Dezignz Interiors.` },
        ]
      : [],
  }),
  component: Article,
});

function Article() {
  const { article, next } = Route.useLoaderData();
  return (
    <>
      <article>
        <header className="bg-graphite px-5 pb-16 pt-36 text-paper md:px-10 md:pt-48">
          <Link to="/journal" className="label inline-flex items-center gap-2 text-paper/60 hover:text-teal"><ArrowLeft className="size-4" /> Journal</Link>
          <p className="label mt-12 text-teal">{article.category}</p>
          <h1 className="display-lg mt-4 max-w-[16ch]">{article.title}</h1>
        </header>
        <img src={imageOf(article.cover)} alt="" className="aspect-[21/9] w-full object-cover" />
        <div className="mx-auto max-w-2xl px-5 py-20">
          {article.body ? (
            <div className="lead whitespace-pre-line">{article.body}</div>
          ) : (
            <div className="border border-dashed border-brick/50 p-8">
              <p className="label text-brick">Content pending migration</p>
              <p className="mt-4 text-muted-foreground">The full text of this article is being moved from the previous website and will appear here soon.</p>
            </div>
          )}
        </div>
      </article>
      <Link to="/journal/$slug" params={{ slug: next.slug }} className="group block border-t border-border bg-paper px-5 py-16 md:px-10">
        <p className="label text-teal">Next article</p>
        <p className="display-md mt-3 flex items-center gap-4 group-hover:text-teal">{next.title} <ArrowRight className="size-[0.7em] transition-transform group-hover:translate-x-3" /></p>
      </Link>
      <Closing />
    </>
  );
}
