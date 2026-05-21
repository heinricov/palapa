"use client"
import * as React from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@workspace/ui/components/card"
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@workspace/ui/components/carousel"

import { useEffect, useRef, useState } from "react"

import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"
import { BlogsItems } from "./blogs-items"
import BlogCategory from "./blog-category"
import type { BlogPost } from "./blogs-data"

const DESCRIPTION_MAX_LENGTH = 160

function truncateDescription(text: string, maxLength = DESCRIPTION_MAX_LENGTH) {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trimEnd()}…`
}

interface Content1Props {
  className?: string
  blogPosts: BlogPost[]
}

export default function BlogHero({ className, blogPosts }: Content1Props) {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const sectionRefs = useRef<Record<string, HTMLElement>>({})

  useEffect(() => {
    const sections = Object.keys(sectionRefs.current)

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    let observer: IntersectionObserver | null = new IntersectionObserver(
      observerCallback,
      {
        root: null,
        rootMargin: "0px",
        threshold: 1,
      }
    )

    sections.forEach((sectionId) => {
      const element = sectionRefs.current[sectionId]
      if (element) {
        observer?.observe(element)
      }
    })

    return () => {
      observer?.disconnect()
      observer = null
    }
  }, [])

  return (
    <section className={cn("mx-auto w-full max-w-7xl px-6 py-20", className)}>
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-20 lg:flex-row lg:items-start lg:justify-center">
        <div className="w-full max-w-3xl min-w-0">
          <CarouselSection blogPosts={blogPosts} />
          <div className="flex flex-col gap-8">
            <h2 className="text-start text-2xl font-medium tracking-[-0.04em] text-pretty sm:max-w-xl md:text-[2.75rem] md:leading-[1.2]">
              Latest Articles
            </h2>
            <BlogsItems blogPosts={blogPosts} />
          </div>
        </div>

        <BlogCategory />
      </div>
    </section>
  )
}

export function CarouselSection({ blogPosts }: { blogPosts: BlogPost[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(1)
  const [count, setCount] = React.useState(blogPosts.length)

  React.useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap() + 1)
    }

    onSelect()
    api.on("select", onSelect)
    api.on("reInit", onSelect)

    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api])

  return (
    <div className="mb-6 border-b pb-2">
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "start" }}
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {blogPosts.map((post) => (
            <CarouselItem key={post.title}>
              <div>
                {post.tags.map((tag, index) => (
                  <Badge
                    className="bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/15 dark:text-indigo-400"
                    key={`${post.slug}-${tag}-${index}`}
                  >
                    {tag}
                  </Badge>
                ))}
                <h1 className="mt-3 text-xl font-extrabold md:text-3xl">
                  {post.title}
                </h1>
                <p className="mt-2 line-clamp-3 text-lg text-muted-foreground">
                  {truncateDescription(post.description)}
                </p>
                <div className="relative my-8 aspect-video w-full overflow-hidden rounded-md">
                  <Image
                    alt={post.title}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    src={post.image}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:block" />
        <CarouselNext className="hidden md:block" />
      </Carousel>
      <div className="text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </div>
  )
}
