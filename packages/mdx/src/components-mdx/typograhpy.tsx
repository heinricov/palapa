import type { ComponentPropsWithoutRef } from "react"

import { getUniqueHeadingId } from "@workspace/mdx/lib/slugify"

const headingIds = new Map<string, number>()

export function resetMdxHeadingIds() {
  headingIds.clear()
}

type TypographyProps<T extends keyof HTMLElementTagNameMap> = ComponentPropsWithoutRef<T>

export function TypographyH1({ children, className, ...props }: TypographyProps<"h1">) {
  const text =
    typeof children === "string" ? children : String(children ?? "")
  const id = getUniqueHeadingId(text, headingIds)

  return (
    <h1
      id={id}
      className={`mt-8 scroll-mt-24 text-3xl font-extrabold ${className ?? ""}`}
      {...props}
    >
      {children}
    </h1>
  )
}

export function TypographyH2({
  children,
  className,
  ...props
}: TypographyProps<"h2">) {
  const text =
    typeof children === "string" ? children : String(children ?? "")
  const id = getUniqueHeadingId(text, headingIds)

  return (
    <h2
      id={id}
      className={`mt-8 scroll-mt-24 text-2xl font-bold ${className ?? ""}`}
      {...props}
    >
      {children}
    </h2>
  )
}

export function TypographyH3({ children, className, ...props }: TypographyProps<"h3">) {
  return (
    <h3 className={`mt-6 text-xl font-semibold ${className ?? ""}`} {...props}>
      {children}
    </h3>
  )
}

export function TypographyH4({ children, className, ...props }: TypographyProps<"h4">) {
  return (
    <h4 className={`mt-4 text-lg font-semibold ${className ?? ""}`} {...props}>
      {children}
    </h4>
  )
}

export function TypographyH5({ children, className, ...props }: TypographyProps<"h5">) {
  return (
    <h5 className={`mt-4 text-base font-semibold ${className ?? ""}`} {...props}>
      {children}
    </h5>
  )
}

export function TypographyH6({ children, className, ...props }: TypographyProps<"h6">) {
  return (
    <h6 className={`mt-4 text-sm font-semibold ${className ?? ""}`} {...props}>
      {children}
    </h6>
  )
}

export function TypographyP({ children, className, ...props }: TypographyProps<"p">) {
  return (
    <p className={`my-4 leading-7 text-muted-foreground ${className ?? ""}`} {...props}>
      {children}
    </p>
  )
}

export function TypographyUl({ children, className, ...props }: TypographyProps<"ul">) {
  return (
    <ul className={`my-4 list-disc space-y-2 pl-6 ${className ?? ""}`} {...props}>
      {children}
    </ul>
  )
}

export function TypographyOl({ children, className, ...props }: TypographyProps<"ol">) {
  return (
    <ol className={`my-4 list-decimal space-y-2 pl-6 ${className ?? ""}`} {...props}>
      {children}
    </ol>
  )
}

export function TypographyLi({ children, className, ...props }: TypographyProps<"li">) {
  return <li className={`leading-7 ${className ?? ""}`} {...props}>{children}</li>
}

export function TypographyBlockquote({
  children,
  className,
  ...props
}: TypographyProps<"blockquote">) {
  return (
    <blockquote
      className={`my-6 border-l-4 border-border pl-4 italic text-muted-foreground ${className ?? ""}`}
      {...props}
    >
      {children}
    </blockquote>
  )
}
