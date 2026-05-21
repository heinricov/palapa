import { AlignLeft } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"
import { cn } from "@workspace/ui/lib/utils"

export const MdxAside = () => {
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
      observerCallback
    )

    sections.forEach((sectionId) => {
      const element = sectionRefs.current[sectionId]
      if (element) {
        observer?.observe(element)
      }
    })
  }, [])

  const addSectionRef = (id: string, ref: HTMLElement | null) => {
    if (ref) {
      sectionRefs.current[id] = ref
    }
  }

  return (
    <aside className="sticky top-32 hidden h-fit w-48 shrink-0 lg:block">
      <span className="flex items-center gap-2 text-sm">
        <AlignLeft className="h-4 w-4" />
        On this page
      </span>
      <nav className="mt-2 text-sm">
        <ul>
          <li>
            <a
              href="#section1"
              className={cn(
                "block py-1 transition-colors duration-200",
                activeSection === "section1"
                  ? "font-medium text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              How the Tax System Works
            </a>
          </li>
          <li>
            <a
              href="#section2"
              className={cn(
                "block py-1 transition-colors duration-200",
                activeSection === "section2"
                  ? "font-medium text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              The People&apos;s Rebellion
            </a>
          </li>
          <li>
            <a
              href="#section3"
              className={cn(
                "block py-1 transition-colors duration-200",
                activeSection === "section3"
                  ? "font-medium text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              The King&apos;s Plan
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
