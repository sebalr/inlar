// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdoc from "@markdoc/markdoc";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export async function generateStaticParams() {
  const posts = await reader.collections.posts.all();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await reader.collections.posts.read(params.slug);
  if (!post) return { title: "Post no encontrado" };
  return {
    title: post.title,
    description: post.description || undefined,
    openGraph: {
      title: `${post.title} | INLAR`,
      description: post.description || undefined,
      type: "article",
      locale: "es_AR",
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | INLAR`,
      description: post.description || undefined,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await reader.collections.posts.read(params.slug);
  if (!post) notFound();

  const { node } = await post.content();
  const errors = Markdoc.validate(node);
  if (errors.length) {
    console.error(errors);
    throw new Error("Invalid content");
  }
  const renderable = Markdoc.transform(node);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/blog"
        className="font-lato text-sm text-inlar-accent hover:underline"
      >
        ← Volver al blog
      </Link>

      <h1 className="mt-4 font-fraunces text-4xl md:text-5xl text-inlar-primary">
        {post.title}
      </h1>

      {post.publishedAt ? (
        <time
          dateTime={post.publishedAt}
          className="mt-2 block font-lato text-sm text-inlar-ink/60"
        >
          {new Date(post.publishedAt).toLocaleDateString("es-AR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      ) : null}

      <article className="prose prose-lg mt-8 font-lato max-w-none prose-headings:font-fraunces prose-headings:text-inlar-primary prose-a:text-inlar-accent">
        {Markdoc.renderers.react(renderable, React)}
      </article>
    </main>
  );
}
