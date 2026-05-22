import { cn } from "@workspace/ui/lib/utils"

import {
  compileMdxContent,
  extractHeadings,
  getAdjacentPosts,
  getMdxPost,
  getMdxPosts,
} from "@workspace/mdx/lib/mdx-loader"
import type { MdxPostMeta } from "@workspace/mdx/lib/types"
import { MdxAside, MdxAsideMobile } from "@workspace/mdx/mdx-aside"
import { MdxBreadcrumb } from "@workspace/mdx/mdx-breadcrumb"
import { MdxHeader } from "@workspace/mdx/mdx-header"
import { MdxPagination, MdxPaginationPage } from "@workspace/mdx/mdx-pagination"
import { MdxRelatedContent } from "@workspace/mdx/mdx-related-content"

interface MdxReadingProps {
  targetDir: string
  slug: string
  page?: number
  className?: string
}

export async function MdxReading({
  targetDir,
  slug,
  page = 1,
  className,
}: MdxReadingProps) {
  const post = getMdxPost(targetDir, slug)
  const posts = getMdxPosts(targetDir)
  const { prev, next } = getAdjacentPosts(posts, slug)
  const totalPages = post.pages.length
  const currentPage = Math.min(Math.max(page, 1), totalPages)
  const pageContent = post.pages[currentPage - 1] ?? post.pages[0] ?? ""
  const headings = extractHeadings(pageContent)
  const mdxContent = await compileMdxContent(pageContent)
  const currentIndex = posts.findIndex(
    (item: MdxPostMeta) => item.slug === slug
  )
  const basePath = post.link

  const prevPageHref =
    currentPage > 1
      ? currentPage === 2
        ? basePath
        : `${basePath}?page=${currentPage - 1}`
      : undefined
  const nextPageHref =
    currentPage < totalPages ? `${basePath}?page=${currentPage + 1}` : undefined

  return (
    <section className={cn("mx-auto w-full max-w-7xl px-6 py-18", className)}>
      <MdxBreadcrumb targetDir={targetDir} title={post.frontmatter.title} />
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-32 lg:flex-row lg:items-start">
        <article className="w-full max-w-5xl min-w-0">
          <MdxHeader frontmatter={post.frontmatter} />
          <div className="prose dark:prose-invert max-w-none">{mdxContent}</div>
          <div className="mt-8 flex w-full flex-col justify-end gap-4">
            <MdxPaginationPage
              basePath={basePath}
              current={currentPage}
              total={totalPages}
            />
            <MdxPagination
              nextHref={nextPageHref ?? next?.link}
              prevHref={prevPageHref ?? prev?.link}
            />
          </div>
        </article>
        <MdxAside headings={headings} />
      </div>
      <MdxRelatedContent slugs={post.frontmatter.relatedContent ?? []} />
      <MdxAsideMobile headings={headings} />
    </section>
  )
}
