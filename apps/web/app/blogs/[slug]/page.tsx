import { MdxReading } from "mdx"
import { notFound } from "next/navigation"

import { getMdxPost, getMdxSlugs } from "@workspace/mdx/lib/mdx-loader"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export function generateStaticParams() {
  return getMdxSlugs("/blogs").map((slug) => ({ slug }))
}

export default async function BlogPostPage({
  params,
  searchParams,
}: BlogPostPageProps) {
  const { slug } = await params
  const { page: pageParam } = await searchParams
  const slugs = getMdxSlugs("/blogs")

  if (!slugs.includes(slug)) {
    notFound()
  }

  const post = getMdxPost("/blogs", slug)
  const page = pageParam ? Number.parseInt(pageParam, 10) : 1

  if (Number.isNaN(page) || page < 1 || page > post.pages.length) {
    notFound()
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl justify-center">
      <MdxReading
        className="w-full"
        page={page}
        slug={slug}
        targetDir="/blogs"
      />
    </main>
  )
}
