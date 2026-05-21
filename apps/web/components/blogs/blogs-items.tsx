import { CalendarDays, Dot, User } from "lucide-react"
import Image from "next/image"
import { Badge } from "@workspace/ui/components/badge"
import Link from "next/link"

interface BlogPost {
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  image: string
  link: string
}

interface ItemCardProps {
  blogPosts: BlogPost[]
  description?: boolean
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function BlogsItems({ blogPosts, description = true }: ItemCardProps) {
  return (
    <>
      {blogPosts.map((post) => (
        <Link href={post.link} key={post.title}>
          <div className="flex flex-col gap-x-6 gap-y-4 rounded-xl bg-muted p-2.5 pb-4 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:pe-4 sm:pb-3">
            <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:aspect-square sm:h-40 sm:w-40">
              <Image
                alt={post.title}
                className="object-cover"
                fill
                sizes="(max-width: 640px) 100vw, 160px"
                src={post.image}
              />
            </div>
            <div className="px-1 sm:px-0">
              <h3 className="text-xl font-medium tracking-[-0.015em]">
                {post.title}
              </h3>
              {description && (
                <p className="mt-2 line-clamp-3 text-ellipsis text-muted-foreground">
                  {post.description}
                </p>
              )}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {post.tags.map((tag) => (
                  <Badge
                    className="bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/15 dark:text-indigo-400"
                    key={tag}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-1">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4" /> {formatDate(post.date)}
                </div>
                <Dot className="text-muted-foreground" />
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <User className="h-4 w-4" /> {post.author}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  )
}
