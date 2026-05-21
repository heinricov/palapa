import { Badge } from "@workspace/ui/components/badge"

import type { MdxPostFrontmatter } from "@workspace/mdx/lib/types"

interface MdxHeaderProps {
  frontmatter: Pick<MdxPostFrontmatter, "title" | "description" | "image" | "tags">
}

export function MdxHeader({ frontmatter }: MdxHeaderProps) {
  const { title, description, image, tags } = frontmatter

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {tags.map((tag: string, index: number) => (
          <Badge
            className="bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/15 dark:text-indigo-400"
            key={`${tag}-${index}`}
            variant="outline"
          >
            {tag}
          </Badge>
        ))}
      </div>
      <h1 className="mt-3 text-3xl font-extrabold">{title}</h1>
      <p className="mt-2 text-lg text-muted-foreground">{description}</p>
      <img
        alt={title}
        className="my-8 aspect-video w-full rounded-md object-cover"
        src={image}
      />
    </div>
  )
}
