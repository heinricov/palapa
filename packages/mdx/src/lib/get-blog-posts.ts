import { getMdxPosts } from "@workspace/mdx/lib/mdx-loader"

const BLOG_TARGET_DIR = "/blogs"

export interface BlogPost {
  slug: string
  author: string
  tags: string[]
  title: string
  description: string
  date: string
  image: string
  link: string
}

function mapPostToBlogPost(
  post: ReturnType<typeof getMdxPosts>[number]
): BlogPost {
  return {
    slug: post.slug,
    author: post.frontmatter.author,
    tags: post.frontmatter.tags,
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    date: post.frontmatter.date,
    image: post.frontmatter.image,
    link: post.link,
  }
}

export function getBlogPosts(): BlogPost[] {
  return getMdxPosts(BLOG_TARGET_DIR).map(mapPostToBlogPost)
}

/** Resolves related posts by MDX filename slug (without .mdx), preserving frontmatter order. */
export function getRelatedBlogPosts(slugs: string[]): BlogPost[] {
  if (slugs.length === 0) return []

  const bySlug = new Map(getBlogPosts().map((post) => [post.slug, post]))

  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((post): post is BlogPost => post !== undefined)
}
