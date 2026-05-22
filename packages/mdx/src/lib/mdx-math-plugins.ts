import type { PluggableList } from "unified"
import rehypeKatex from "rehype-katex"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

export const mdxRemarkPlugins = [remarkGfm, remarkMath]
export const mdxRehypePlugins: PluggableList = [[rehypeKatex, { fleqn: true }]]

/** @deprecated Use mdxRemarkPlugins */
export const mdxMathRemarkPlugins = mdxRemarkPlugins

/** @deprecated Use mdxRehypePlugins */
export const mdxMathRehypePlugins = mdxRehypePlugins

/**
 * Converts blank-line-separated lines inside $$...$$ into multi-line KaTeX via `\\`.
 * Avoids `\begin{aligned}` so MDX does not parse `{...}` inside math as JSX.
 */
export function normalizeDisplayMathInMarkdown(markdown: string): string {
  return markdown.replace(/\$\$([\s\S]*?)\$\$/g, (match, math: string) => {
    const trimmed = math.trim()

    if (!trimmed || trimmed.includes("\\\\")) {
      return match
    }

    const lines = trimmed
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean)

    if (lines.length <= 1) return match

    return `<MdxMathMultiline>\n\n$$\n${lines.join(" \\\\\n")}\n$$\n\n</MdxMathMultiline>`
  })
}
