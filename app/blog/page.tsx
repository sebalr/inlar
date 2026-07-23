// app/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Novedades y artículos del estudio jurídico INLAR: análisis, guías prácticas y actualidad legal en Argentina.",
  openGraph: {
    title: "Blog | INLAR",
    description:
      "Novedades y artículos del estudio jurídico INLAR: análisis, guías prácticas y actualidad legal en Argentina.",
    type: "website",
    locale: "es_AR",
  },
};

const reader = createReader(process.cwd(), keystaticConfig);

export default async function BlogPage() {
  const posts = await reader.collections.posts.all();

  const sorted = [...posts].sort((a, b) => {
    const da = a.entry.publishedAt ? new Date(a.entry.publishedAt).getTime() : 0;
    const db = b.entry.publishedAt ? new Date(b.entry.publishedAt).getTime() : 0;
    return db - da;
  });

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-fraunces text-4xl md:text-5xl text-inlar-primary mb-8">
        Blog
      </h1>

      {sorted.length === 0 ? (
        <p className="font-lato text-inlar-ink/70">
          Todavía no hay publicaciones. Creá la primera desde{" "}
          <Link href="/keystatic" className="underline">
            /keystatic
          </Link>
          .
        </p>
      ) : (
        <ul className="space-y-6">
          {sorted.map((post) => (
            <li
              key={post.slug}
              className="border-b border-inlar-sand/60 pb-6"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="font-fraunces text-2xl text-inlar-primary hover:text-inlar-accent transition-colors"
              >
                {post.entry.title}
              </Link>
              {post.entry.description ? (
                <p className="mt-2 font-lato text-inlar-ink/80">
                  {post.entry.description}
                </p>
              ) : null}
              {post.entry.publishedAt ? (
                <time
                  dateTime={post.entry.publishedAt}
                  className="mt-2 block font-lato text-sm text-inlar-ink/60"
                >
                  {new Date(post.entry.publishedAt).toLocaleDateString("es-AR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
