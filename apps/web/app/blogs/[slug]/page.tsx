import { MdxReading } from "mdx"
import { notFound } from "next/navigation"

import { getMdxSlugs } from "@workspace/mdx/lib/mdx-loader"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getMdxSlugs("/blogs").map((slug) => ({ slug }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const slugs = getMdxSlugs("/blogs")

  if (!slugs.includes(slug)) {
    notFound()
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl justify-center">
      <MdxReading className="w-full" slug={slug} targetDir="/blogs" />
    </main>
  )
}
