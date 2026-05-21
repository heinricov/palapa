import type { ComponentPropsWithoutRef } from "react"

type MdxImageProps = ComponentPropsWithoutRef<"img">

export function MdxImage({ alt, className, src, ...props }: MdxImageProps) {
  return (
    <img
      alt={alt ?? ""}
      className={`my-8 aspect-video w-full rounded-md object-cover ${className ?? ""}`}
      src={src}
      {...props}
    />
  )
}
