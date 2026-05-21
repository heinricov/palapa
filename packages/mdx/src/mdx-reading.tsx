import { cn } from "@workspace/ui/lib/utils"

import {
  compileMdxContent,
  extractHeadings,
  getAdjacentPosts,
  getMdxPost,
  getMdxPosts,
} from "@workspace/mdx/lib/mdx-loader"
import type { MdxPostMeta } from "@workspace/mdx/lib/types"
import { MdxAside } from "@workspace/mdx/mdx-aside"
import { MdxBreadcrumb } from "@workspace/mdx/mdx-breadcrumb"
import { MdxHeader } from "@workspace/mdx/mdx-header"
import { MdxPagination, MdxPaginationPage } from "@workspace/mdx/mdx-pagination"

interface MdxReadingProps {
  targetDir: string
  slug: string
  className?: string
}

export async function MdxReading({
  targetDir,
  slug,
  className,
}: MdxReadingProps) {
  const post = getMdxPost(targetDir, slug)
  const posts = getMdxPosts(targetDir)
  const { prev, next } = getAdjacentPosts(posts, slug)
  const headings = extractHeadings(post.content)
  const mdxContent = await compileMdxContent(post.content)
  const currentIndex = posts.findIndex((item: MdxPostMeta) => item.slug === slug)

  return (
    <section className={cn("mx-auto w-full max-w-7xl px-6 py-18", className)}>
      <MdxBreadcrumb targetDir={targetDir} title={post.frontmatter.title} />
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-20 lg:flex-row lg:items-start lg:justify-center">
        <article className="w-full min-w-0 max-w-3xl">
          <MdxHeader frontmatter={post.frontmatter} />
          <div className="prose dark:prose-invert max-w-none">{mdxContent}</div>
          <div className="mt-8 flex w-full flex-col justify-end gap-4">
            <MdxPaginationPage
              current={currentIndex + 1}
              total={posts.length}
            />
            <MdxPagination
              nextHref={next?.link}
              prevHref={prev?.link}
            />
          </div>
        </article>
        <MdxAside headings={headings} />
      </div>
    </section>
  )
}
