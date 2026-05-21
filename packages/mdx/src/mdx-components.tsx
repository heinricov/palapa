import type { ComponentType } from "react"

import { AlertSection } from "@workspace/mdx/components-mdx/alert-section"
import { MdxImage } from "@workspace/mdx/components-mdx/image-section"
import {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyH5,
  TypographyH6,
  TypographyLi,
  TypographyOl,
  TypographyP,
  TypographyUl,
} from "@workspace/mdx/components-mdx/typograhpy"

export const mdxComponents: Record<string, ComponentType<Record<string, unknown>>> = {
  h1: TypographyH1,
  h2: TypographyH2,
  h3: TypographyH3,
  h4: TypographyH4,
  h5: TypographyH5,
  h6: TypographyH6,
  p: TypographyP,
  ul: TypographyUl,
  ol: TypographyOl,
  li: TypographyLi,
  blockquote: TypographyBlockquote,
  img: MdxImage,
  AlertSection,
}
