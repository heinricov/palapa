import React from "react"
import { Badge } from "@workspace/ui/components/badge"

export const MdxHeader = () => {
  return (
    <div>
      <Badge variant="outline">Kingdom Tales</Badge>
      <h1 className="mt-3 text-3xl font-extrabold">The Great Joke Tax</h1>
      <p className="mt-2 text-lg text-muted-foreground">
        In a kingdom far away, where laughter once flowed freely, a peculiar
        tale unfolded about a king who decided to tax the very essence of joy
        itself - jokes and jest.
      </p>
    </div>
  )
}
