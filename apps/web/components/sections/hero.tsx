import React from "react"
import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import { ChevronRight } from "lucide-react"
import Image from "next/image"

import {
  FaInstagram,
  FaXTwitter,
  FaSquareFacebook,
  FaLinkedin,
} from "react-icons/fa6"

export default function HeroSection() {
  return (
    <>
      <main className="overflow-hidden">
        <section className="bg-background">
          <div className="relative pt-16 pb-16 md:pb-32">
            <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
              <div className="pointer-events-none relative mx-auto aspect-3/2 max-w-xl mask-radial-from-35% mask-radial-to-75% opacity-75 mix-blend-darken">
                <div className="absolute inset-0 bg-background mix-blend-overlay"></div>
                <Image
                  src="https://images.unsplash.com/photo-1634595947394-87012e7b12ba?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="watch in dark"
                  className="not-dark:invert dark:mix-blend-lighten"
                  width={1340}
                  height={560}
                />
              </div>
              <div className="mx-auto mt-6 max-w-md text-center">
                <h1 className="font-mono text-4xl font-medium text-balance sm:text-5xl">
                  light articles for you to read.
                </h1>
                <p className="mt-4 text-balance text-muted-foreground">
                  find knowledge that broadens your insight here.
                </p>

                <Button asChild className="mt-6 pr-1.5">
                  <Link href="#link">
                    <span className="text-nowrap">Start Building</span>
                    <ChevronRight className="opacity-50" />
                  </Link>
                </Button>
                <div className="mt-6 flex items-center justify-center gap-2">
                  <FaInstagram className="text-4xl" />
                  <FaXTwitter className="text-4xl" />
                  <FaSquareFacebook className="text-4xl" />
                  <FaLinkedin className="text-4xl" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
