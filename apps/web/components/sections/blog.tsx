"use client"

import {
  AlignLeft,
  BadgeDollarSign,
  Bike,
  BookHeart,
  BriefcaseBusiness,
  Cpu,
  FlaskRound,
  HeartPulse,
  Scale,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"
import BlogsSection from "./blogs"

interface Content1Props {
  className?: string
}

const categories = [
  {
    name: "Technology",
    totalPosts: 10,
    icon: Cpu,
  },
  {
    name: "Business",
    totalPosts: 5,
    icon: BriefcaseBusiness,
  },
  {
    name: "Finance",
    totalPosts: 8,
    icon: BadgeDollarSign,
  },
  {
    name: "Health",
    totalPosts: 12,
    icon: HeartPulse,
  },
  {
    name: "Lifestyle",
    totalPosts: 15,
    icon: BookHeart,
  },
  {
    name: "Politics",
    totalPosts: 20,
    icon: Scale,
  },
  {
    name: "Science",
    totalPosts: 25,
    icon: FlaskRound,
  },
  {
    name: "Sports",
    totalPosts: 30,
    icon: Bike,
  },
]

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

  const addSectionRef = (id: string, ref: HTMLElement | null) => {
    if (ref) {
      sectionRefs.current[id] = ref
    }
  }

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
          <BlogsSection />
        </div>
        <aside className="sticky top-32 w-full shrink-0 lg:max-w-sm">
          <h3 className="text-xl font-medium tracking-tight">Categories</h3>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1">
            {categories.map((category) => (
              <div
                className="bg-opacity-15 dark:bg-opacity-25 flex items-center justify-between gap-2 rounded-lg bg-muted p-3 ps-4 dark:bg-muted/70"
                key={category.name}
              >
                <div className="flex items-center gap-3">
                  <category.icon className="h-5 w-5" />
                  <span className="font-medium">{category.name}</span>
                </div>
                <Badge className="rounded-full bg-foreground/7 px-1.5 text-foreground">
                  {category.totalPosts}
                </Badge>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}
