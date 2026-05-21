import { redirect } from "next/navigation"

import { getMdxPosts } from "@workspace/mdx/lib/mdx-loader"

export default function BlogsPage() {
  const posts = getMdxPosts("/blogs")

  if (posts[0]) {
    redirect(posts[0].link)
  }

  return null
}
