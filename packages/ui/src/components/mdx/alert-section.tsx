import React from "react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert"
import { Lightbulb } from "lucide-react"

export const AlertSection = () => {
  return (
    <Alert>
      <Lightbulb className="h-4 w-4" />
      <AlertTitle>Royal Decree!</AlertTitle>
      <AlertDescription>
        Remember, all jokes must be registered at the Royal Jest Office before
        telling them
      </AlertDescription>
    </Alert>
  )
}
