import { getRelatedBlogPosts } from "@workspace/mdx/lib/get-blog-posts"
import { BlogsItems } from "@workspace/ui/blogs/blogs-items"

interface MdxRelatedContentProps {
  slugs: string[]
}

export function MdxRelatedContent({ slugs }: MdxRelatedContentProps) {
  const relatedPosts = getRelatedBlogPosts(slugs)

  if (relatedPosts.length === 0) return null

  return (
    <section className="mx-auto max-w-5xl py-16">
      <div className="mb-4 flex flex-col items-start justify-between gap-4 md:flex-row">
        <div>
          <h2 className="text-start text-2xl font-medium tracking-tight text-balance">
            Related Content
          </h2>
          <p className="mt-0.5 text-lg tracking-normal text-pretty text-muted-foreground">
            Find articles related to this topic.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <BlogsItems blogPosts={relatedPosts} description={false} />
      </div>
    </section>
  )
}
