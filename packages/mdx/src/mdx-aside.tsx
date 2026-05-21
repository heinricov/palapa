"use client"

import { AlignLeft } from "lucide-react"
import { useEffect, useState } from "react"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@workspace/ui/components/drawer"

import { cn } from "@workspace/ui/lib/utils"

import type { MdxHeading } from "@workspace/mdx/lib/types"
import { Button } from "@workspace/ui/components/button"

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
        <AsideNavList activeSection={activeSection} headings={headings} />
      </nav>
    </aside>
  )
}

function AsideNavList({
  headings,
  activeSection,
  onNavigate,
}: MdxAsideProps & {
  activeSection: string | null
  onNavigate?: () => void
}) {
  if (headings.length === 0) {
    return (
      <p className="py-2 text-sm text-muted-foreground">
        Tidak ada daftar isi untuk halaman ini.
      </p>
    )
  }

  return (
    <ul>
      {headings.map((heading, index) => (
        <li key={`${heading.id}-${index}`}>
          <a
            href={`#${heading.id}`}
            onClick={onNavigate}
            className={cn(
              "block py-2 transition-colors duration-200",
              heading.level === 2 && "pl-3",
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
  )
}

export function MdxAsideMobile({ headings }: MdxAsideProps) {
  const [open, setOpen] = useState(false)
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

  return (
    <div className="lg:hidden">
      <Button
        aria-label="On this page"
        className="fixed right-4 bottom-6 z-50 flex size-10 items-center justify-center rounded-full"
        onClick={() => setOpen(true)}
        variant="ghost"
      >
        <AlignLeft className="size-6" />
      </Button>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm px-4 pb-8">
            <DrawerHeader>
              <DrawerTitle className="flex items-center gap-2">
                <AlignLeft className="h-4 w-4" />
                On this page
              </DrawerTitle>
            </DrawerHeader>
            <nav className="text-sm">
              <AsideNavList
                activeSection={activeSection}
                headings={headings}
                onNavigate={() => setOpen(false)}
              />
            </nav>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
