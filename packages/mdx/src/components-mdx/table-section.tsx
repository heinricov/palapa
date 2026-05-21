import type { ComponentPropsWithoutRef } from "react"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { cn } from "@workspace/ui/lib/utils"

const tableRowClassName = "last:border-r-0 [&>th]:border-r [&>td]:border-r"

export function MdxTable({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"table">) {
  return (
    <Table
      className={cn(
        "my-1 border [&_tbody_td:first-child]:font-medium",
        className
      )}
      {...props}
    >
      {children}
    </Table>
  )
}

export function MdxThead(props: ComponentPropsWithoutRef<"thead">) {
  return <TableHeader {...props} />
}

export function MdxTbody(props: ComponentPropsWithoutRef<"tbody">) {
  return <TableBody {...props} />
}

export function MdxTr({ className, ...props }: ComponentPropsWithoutRef<"tr">) {
  return <TableRow className={cn(tableRowClassName, className)} {...props} />
}

export function MdxTh({ className, ...props }: ComponentPropsWithoutRef<"th">) {
  return (
    <TableHead
      className={cn("bg-muted/50 font-semibold", className)}
      {...props}
    />
  )
}

export function MdxTd({ className, ...props }: ComponentPropsWithoutRef<"td">) {
  return <TableCell className={className} {...props} />
}

export function MdxCaption(props: ComponentPropsWithoutRef<"caption">) {
  return <TableCaption {...props} />
}
