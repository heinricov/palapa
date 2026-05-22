import type { ReactNode } from "react"

export function MdxMathMultiline({
  children,
}: {
  children?: ReactNode
}) {
  return <div className="mdx-math-multiline">{children}</div>
}
