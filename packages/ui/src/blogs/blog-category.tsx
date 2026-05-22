import { Badge } from "@workspace/ui/components/badge"
import {
  BadgeDollarSign,
  Bike,
  BookHeart,
  BriefcaseBusiness,
  Cpu,
  FlaskRound,
  HeartPulse,
  Scale,
} from "lucide-react"

const categories = [
  {
    name: "Technology",
    totalPosts: 10,
    icon: Cpu,
  },
  {
    name: "Business",
    totalPosts: 5,
    icon: BriefcaseBusiness,
  },
  {
    name: "Finance",
    totalPosts: 8,
    icon: BadgeDollarSign,
  },
  {
    name: "Health",
    totalPosts: 12,
    icon: HeartPulse,
  },
  {
    name: "Lifestyle",
    totalPosts: 15,
    icon: BookHeart,
  },
  {
    name: "Politics",
    totalPosts: 20,
    icon: Scale,
  },
  {
    name: "Science",
    totalPosts: 25,
    icon: FlaskRound,
  },
  {
    name: "Sports",
    totalPosts: 30,
    icon: Bike,
  },
]

export default function BlogCategory() {
  return (
    <>
      <aside className="sticky top-32 w-full shrink-0 lg:max-w-sm">
        <h3 className="mb-2 text-xl font-medium tracking-tight">Categories</h3>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1">
          {categories.map((category) => (
            <div
              className="bg-opacity-15 dark:bg-opacity-25 flex items-center justify-between gap-2 rounded-lg bg-muted p-3 ps-4 dark:bg-muted/70"
              key={category.name}
            >
              <div className="flex items-center gap-3">
                <category.icon className="h-5 w-5" />
                <span className="font-medium">{category.name}</span>
              </div>
              <Badge className="rounded-full bg-foreground/7 px-1.5 text-foreground">
                {category.totalPosts}
              </Badge>
            </div>
          ))}
        </div>
      </aside>
    </>
  )
}
