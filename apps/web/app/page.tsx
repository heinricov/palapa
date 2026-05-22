import { InputSearch } from "@/components/input-search"
import { getBlogPosts } from "@workspace/mdx/lib/get-blog-posts"
import { Button } from "@workspace/ui/components/button"
import BlogHero from "@workspace/ui/blogs/blog-hero"
import { BlogsItems } from "@workspace/ui/blogs/blogs-items"

export default function Page() {
  const blogPosts = getBlogPosts()

  return (
    <>
      {/* <HeroSection /> */}
      <BlogHero blogPosts={blogPosts} />
      {/* <BlogCategorySection /> */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        {/* Header */}
        <div className="mb-4 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h2 className="text-2xl font-medium tracking-tight text-balance">
              Welcome to our blog!
            </h2>
            <p className="mt-0.5 text-lg tracking-normal text-pretty text-muted-foreground">
              Stay updated with the latest news and insights.
            </p>
          </div>
          <div className="w-full max-w-xs md:w-auto">
            <InputSearch />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <BlogsItems blogPosts={blogPosts} description={false} />
        </div>
        <Button className="mx-auto mt-16 flex" size="lg" variant="secondary">
          Load more articles
        </Button>
      </section>
    </>
  )
}
