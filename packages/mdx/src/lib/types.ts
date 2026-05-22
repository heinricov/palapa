export interface MdxPostFrontmatter {
  title: string
  description: string
  tags: string[]
  date: string
  image: string
  author: string
  relatedContent?: string[]
}

export interface MdxPostMeta {
  slug: string
  link: string
  frontmatter: MdxPostFrontmatter
}

export interface MdxHeading {
  id: string
  text: string
  level: 1 | 2
}
