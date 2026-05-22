export interface BlogPostDateFilterable {
  date: string
}

function startOfDay(date: Date): Date {
  const value = new Date(date)
  value.setHours(0, 0, 0, 0)
  return value
}

function parsePostDate(date: string): Date {
  const isoMatch = date.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (isoMatch) {
    return new Date(
      Number(isoMatch[1]),
      Number(isoMatch[2]) - 1,
      Number(isoMatch[3])
    )
  }

  const parsed = new Date(date)
  if (!Number.isNaN(parsed.getTime())) {
    return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate())
  }

  return new Date(Number.NaN)
}

/** Posts from today and up to `daysBack` calendar day(s) before today (inclusive). */
export function filterRecentBlogPosts<T extends BlogPostDateFilterable>(
  posts: T[],
  daysBack = 1
): T[] {
  const today = startOfDay(new Date())
  const cutoff = new Date(today)
  cutoff.setDate(cutoff.getDate() - daysBack)

  return posts.filter((post) => {
    const postDay = startOfDay(parsePostDate(post.date))
    if (Number.isNaN(postDay.getTime())) return false
    return postDay >= cutoff && postDay <= today
  })
}
