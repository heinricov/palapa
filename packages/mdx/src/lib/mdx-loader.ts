import fs from "node:fs"
import path from "node:path"

import matter from "gray-matter"
import { compileMDX } from "next-mdx-remote/rsc"

import { resetMdxHeadingIds } from "@workspace/mdx/components-mdx/typograhpy"
import {
  mdxRehypePlugins,
  mdxRemarkPlugins,
} from "@workspace/mdx/lib/mdx-math-plugins"
import { mdxComponents } from "@workspace/mdx/mdx-components"
import type { MdxHeading, MdxPostFrontmatter, MdxPostMeta } from "@workspace/mdx/lib/types"
import { getUniqueHeadingId } from "@workspace/mdx/lib/slugify"

const PAGE_DELIMITER = /^====\s*$/m

export function splitMdxPages(content: string): string[] {
  const pages = content
    .split(PAGE_DELIMITER)
    .map((page) => page.trim())
    .filter(Boolean)

  return pages.length > 0 ? pages : [content]
}

function resolveContentDir(targetDir: string) {
  const normalized = targetDir.replace(/^\/+/, "")
  return path.join(process.cwd(), "mdx-content", normalized)
}

/** Maps `images/foo.jpeg` (apps/web/images) to `/images/foo.jpeg` served from public/. */
function resolveMdxImage(image: string): string {
  if (!image || /^https?:\/\//i.test(image)) return image

  const relative = image.replace(/^\/+/, "")
  const publicPath = path.join(process.cwd(), "public", relative)
  const sourcePath = path.join(process.cwd(), relative)

  if (fs.existsSync(sourcePath) && !fs.existsSync(publicPath)) {
    fs.mkdirSync(path.dirname(publicPath), { recursive: true })
    fs.copyFileSync(sourcePath, publicPath)
  }

  if (fs.existsSync(publicPath)) {
    return `/${relative}`
  }

  return image.startsWith("/") ? image : `/${relative}`
}

function normalizeRelatedContent(
  relatedContent: MdxPostFrontmatter["relatedContent"]
): string[] {
  if (!relatedContent) return []
  if (Array.isArray(relatedContent)) {
    return relatedContent.filter(
      (slug): slug is string => typeof slug === "string" && slug.length > 0
    )
  }
  return []
}

function normalizeFrontmatter(frontmatter: MdxPostFrontmatter): MdxPostFrontmatter {
  return {
    ...frontmatter,
    tags: [...new Set(frontmatter.tags ?? [])],
    date: String(frontmatter.date),
    image: resolveMdxImage(frontmatter.image),
    relatedContent: normalizeRelatedContent(frontmatter.relatedContent),
  }
}

export function getMdxSlugs(targetDir: string) {
  const dir = resolveContentDir(targetDir)
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
}

export function getMdxPosts(targetDir: string): MdxPostMeta[] {
  const routeBase = targetDir.startsWith("/") ? targetDir : `/${targetDir}`
  const slugs = getMdxSlugs(targetDir)

  const posts = slugs.map((slug) => {
    const filePath = path.join(resolveContentDir(targetDir), `${slug}.mdx`)
    const { data } = matter(fs.readFileSync(filePath, "utf8"))
    const frontmatter = data as MdxPostFrontmatter

    return {
      slug,
      link: `${routeBase}/${slug}`,
      frontmatter: normalizeFrontmatter(frontmatter),
    }
  })

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  )
}

export function getMdxPost(targetDir: string, slug: string) {
  const filePath = path.join(resolveContentDir(targetDir), `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(raw)
  const frontmatter = data as MdxPostFrontmatter
  const routeBase = targetDir.startsWith("/") ? targetDir : `/${targetDir}`

  return {
    slug,
    link: `${routeBase}/${slug}`,
    raw,
    content,
    pages: splitMdxPages(content),
    frontmatter: normalizeFrontmatter(frontmatter),
  }
}

export function getMdxPageHref(basePath: string, page: number) {
  return page <= 1 ? basePath : `${basePath}?page=${page}`
}

export function extractHeadings(markdown: string): MdxHeading[] {
  const headings: MdxHeading[] = []
  const usedIds = new Map<string, number>()
  const regex = /^(#{1,2})\s+(.+)$/gm
  let match = regex.exec(markdown)

  while (match) {
    const level = match[1]?.length === 1 ? 1 : 2
    const text = match[2]?.trim() ?? ""
    headings.push({
      text,
      id: getUniqueHeadingId(text, usedIds),
      level,
    })
    match = regex.exec(markdown)
  }

  return headings
}

export function getAdjacentPosts(posts: MdxPostMeta[], slug: string) {
  const index = posts.findIndex((post) => post.slug === slug)

  return {
    prev: index > 0 ? posts[index - 1] : null,
    next: index >= 0 && index < posts.length - 1 ? posts[index + 1] : null,
  }
}

export async function compileMdxContent(markdown: string) {
  resetMdxHeadingIds()

  const { content } = await compileMDX({
    source: markdown,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: mdxRemarkPlugins,
        rehypePlugins: mdxRehypePlugins,
      },
    },
  })

  return content
}
