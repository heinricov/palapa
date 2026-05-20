import Link from "next/link"

import { GoLaw } from "react-icons/go"
import { FaIndustry, FaLaptopCode, FaMusic } from "react-icons/fa"
import { GiMoneyStack } from "react-icons/gi"
import { BiHealth } from "react-icons/bi"

const categories = [
  {
    title: "Law",
    description:
      "Easily uncover untapped areas to explore and expand your reach.",
    icon: GoLaw,
  },
  {
    title: "Industry",
    description: "Create valuable content that resonates and inspires trust.",
    icon: FaIndustry,
  },
  {
    title: "Technology",
    description: "Gain immediate, actionable insights with a quick glance.",
    icon: FaLaptopCode,
  },
  {
    title: "Economy",
    description: "Boost audience engagement with interactive features.",
    icon: GiMoneyStack,
  },
  {
    title: "Health",
    description: "Streamline your processes by automating repetitive tasks.",
    icon: BiHealth,
  },
  {
    title: "Music",
    description: "Discover the latest music trends and artists.",
    icon: FaMusic,
  },
]

export default function BlogCategorySection() {
  return (
    <div className="px-6 py-20">
      <div className="mx-auto w-full max-w-7xl text-center">
        <h2 className="text-4xl font-medium tracking-[-0.04em] text-pretty sm:mx-auto sm:max-w-xl sm:text-center md:text-[2.75rem] md:leading-[1.2]">
          Categories you might like
        </h2>
        <p className="mt-3 text-xl tracking-[-0.01em] text-pretty text-muted-foreground sm:text-center md:text-2xl">
          Find articles in your favorite categories.
        </p>
        <div className="mt-12 grid gap-6 sm:mt-18 sm:gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Link href="#" key={index}>
              <div className="-mx-2 flex max-w-lg items-center gap-6 rounded-lg sm:mx-0">
                <div className="flex aspect-square h-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border/20 bg-muted">
                  <category.icon className="h-16 w-16" />
                </div>
                <div className="">
                  <span className="text-lg font-medium tracking-[-0.015em]">
                    {category.title}
                  </span>
                  <p className="mt-1 text-pretty text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
