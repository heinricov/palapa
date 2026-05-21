import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@workspace/ui/components/pagination"

interface MdxPaginationProps {
  prevHref?: string
  nextHref?: string
}

export function MdxPagination({ prevHref, nextHref }: MdxPaginationProps) {
  return (
    <Pagination className="mx-0 w-full max-w-5xl justify-between">
      <PaginationContent className="w-full justify-between">
        <PaginationItem>
          {prevHref ? (
            <PaginationPrevious href={prevHref} />
          ) : (
            <PaginationPrevious
              aria-disabled
              className="pointer-events-none opacity-50"
            />
          )}
        </PaginationItem>
        <PaginationItem>
          {nextHref ? (
            <PaginationNext href={nextHref} />
          ) : (
            <PaginationNext
              aria-disabled
              className="pointer-events-none opacity-50"
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

interface MdxPaginationPageProps {
  current: number
  total: number
  basePath: string
}

export function MdxPaginationPage({
  current,
  total,
  basePath,
}: MdxPaginationPageProps) {
  if (total <= 1) return null

  return (
    <Pagination className="mx-0 ml-auto w-auto items-center justify-end gap-2">
      <span className="text-sm text-muted-foreground">page</span>
      <PaginationContent>
        {Array.from({ length: total }, (_, index) => {
          const page = index + 1
          const href = page <= 1 ? basePath : `${basePath}?page=${page}`

          return (
            <PaginationItem key={page}>
              <PaginationLink href={href} isActive={page === current}>
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}
      </PaginationContent>
    </Pagination>
  )
}
