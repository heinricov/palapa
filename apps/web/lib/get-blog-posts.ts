import fs from "node:fs"
import path from "node:path"

import matter from "gray-matter"

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

interface BlogFrontmatter {
  title: string
  description: string
  tags: string[]
  date: string
  image: string
  author: string
}

const blogsDirectory = path.join(process.cwd(), "mdx-content/blogs")

export function getBlogPosts(): BlogPost[] {
  const filenames = fs
    .readdirSync(blogsDirectory)
    .filter((file) => file.endsWith(".mdx"))

  const posts = filenames.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "")
    const filePath = path.join(blogsDirectory, filename)
    const { data } = matter(fs.readFileSync(filePath, "utf8"))
    const frontmatter = data as BlogFrontmatter

    return {
      slug,
      author: frontmatter.author,
      tags: [...new Set(frontmatter.tags ?? [])],
      title: frontmatter.title,
      description: frontmatter.description,
      date: String(frontmatter.date),
      image: frontmatter.image,
      link: `/blogs/${slug}`,
    }
  })

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}
