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

export function getBlogPosts(): BlogPost[] {
  return getMdxPosts(BLOG_TARGET_DIR).map((post) => ({
    slug: post.slug,
    author: post.frontmatter.author,
    tags: post.frontmatter.tags,
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    date: post.frontmatter.date,
    image: post.frontmatter.image,
    link: post.link,
  }))
}
