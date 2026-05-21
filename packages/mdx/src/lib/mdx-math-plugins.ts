import rehypeKatex from "rehype-katex"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

export const mdxRemarkPlugins = [remarkGfm, remarkMath]
export const mdxRehypePlugins = [rehypeKatex]

/** @deprecated Use mdxRemarkPlugins */
export const mdxMathRemarkPlugins = mdxRemarkPlugins

/** @deprecated Use mdxRehypePlugins */
export const mdxMathRehypePlugins = mdxRehypePlugins
