"use client"

import { useEffect, useRef, useState } from "react"

import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"
import BlogsItems from "./blogs-items"
import BlogCategory from "./blog-category"

interface Content1Props {
  className?: string
}

export default function BlogHero({ className }: Content1Props) {
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
    <section className={cn("mx-auto w-full max-w-7xl px-6 py-32", className)}>
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-20 lg:flex-row lg:items-start lg:justify-center">
        <div className="w-full max-w-3xl min-w-0">
          <div>
            <Badge variant="outline">Kingdom Tales</Badge>
            <h1 className="mt-3 text-3xl font-extrabold">The Great Joke Tax</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              In a kingdom far away, where laughter once flowed freely, a
              peculiar tale unfolded about a king who decided to tax the very
              essence of joy itself - jokes and jest.
            </p>
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
              alt="placeholder"
              className="my-8 aspect-video w-full rounded-md object-cover"
            />
          </div>
          <BlogsItems />
        </div>
        <BlogCategory />
      </div>
    </section>
  )
}
