"use client"

import { AlignLeft } from "lucide-react"
import { useEffect, useState } from "react"

import { cn } from "@workspace/ui/lib/utils"

import type { MdxHeading } from "@workspace/mdx/lib/types"

interface MdxAsideProps {
  headings: MdxHeading[]
}

export function MdxAside({ headings }: MdxAsideProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    if (headings.length === 0) return

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    })

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <aside className="sticky top-32 hidden h-fit w-48 shrink-0 lg:block">
      <span className="flex items-center gap-2 text-sm">
        <AlignLeft className="h-4 w-4" />
        On this page
      </span>
      <nav className="mt-2 text-sm">
        <ul>
          {headings.map((heading, index) => (
            <li key={`${heading.id}-${index}`}>
              <a
                href={`#${heading.id}`}
                className={cn(
                  "block py-1 transition-colors duration-200",
                  activeSection === heading.id
                    ? "font-medium text-primary"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
