import {
  BadgeDollarSign,
  Bike,
  BookHeart,
  BriefcaseBusiness,
  Calendar,
  ClockIcon,
  Cpu,
  FlaskRound,
  HeartPulse,
  Scale,
} from "lucide-react"
import Image from "next/image"
import { Badge } from "@workspace/ui/components/badge"
import { Card, CardContent } from "@workspace/ui/components/card"

const blogPosts = [
  {
    category: "Technology",
    title: "A beginner's guide to blockchain for engineers",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa consequatur minus dicta accusantium quos, ratione suscipit id adipisci voluptatibus. Nulla sint repudiandae fugiat tenetur dolores.",
    readTime: "5 min read",
    date: "Nov 20, 2024",
    image:
      "https://cdn.pixabay.com/photo/2021/08/27/18/50/water-6579313_1280.jpg",
  },
  {
    category: "Business",
    title: "Understanding React Server Components",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa consequatur minus dicta accusantium quos, ratione suscipit id adipisci voluptatibus. Nulla sint repudiandae fugiat tenetur dolores.",
    readTime: "8 min read",
    date: "Nov 18, 2024",
    image:
      "https://cdn.pixabay.com/photo/2020/02/13/06/49/seascape-4844697_1280.jpg",
  },
  {
    category: "Finance",
    title: "10 Useful Shadcn UI Components You Should Know",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa consequatur minus dicta accusantium quos, ratione suscipit id adipisci voluptatibus. Nulla sint repudiandae fugiat tenetur dolores.",
    readTime: "6 min read",
    date: "Nov 15, 2024",
    image:
      "https://cdn.pixabay.com/photo/2021/08/13/12/51/sea-6543041_1280.jpg",
  },
  {
    category: "Health",
    title: "Building a Personal Blog with Next.js",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa consequatur minus dicta accusantium quos, ratione suscipit id adipisci voluptatibus. Nulla sint repudiandae fugiat tenetur dolores.",
    readTime: "10 min read",
    date: "Nov 12, 2024",
    image:
      "https://cdn.pixabay.com/photo/2017/06/22/20/24/dewdrops-2432391_1280.jpg",
  },
  {
    category: "Lifestyle",
    title: "The Complete Guide to TypeScript for Beginners",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa consequatur minus dicta accusantium quos, ratione suscipit id adipisci voluptatibus. Nulla sint repudiandae fugiat tenetur dolores.",
    readTime: "12 min read",
    date: "Nov 10, 2024",
    image:
      "https://cdn.pixabay.com/photo/2013/07/21/13/00/rose-165819_1280.jpg",
  },
  {
    category: "Politics",
    title: "Optimizing Web Performance with Next.js",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa consequatur minus dicta accusantium quos, ratione suscipit id adipisci voluptatibus. Nulla sint repudiandae fugiat tenetur dolores.",
    readTime: "7 min read",
    date: "Nov 8, 2024",
    image:
      "https://cdn.pixabay.com/photo/2021/08/12/10/38/mountains-6540497_1280.jpg",
  },
  {
    category: "Science",
    title: "Deploying Full-Stack Apps on Vercel",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa consequatur minus dicta accusantium quos, ratione suscipit id adipisci voluptatibus. Nulla sint repudiandae fugiat tenetur dolores.",
    readTime: "9 min read",
    date: "Nov 5, 2024",
    image:
      "https://cdn.pixabay.com/photo/2016/03/27/18/54/technology-1283624_1280.jpg",
  },
  {
    category: "Sports",
    title: "Getting Started with Modern Web Development",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa consequatur minus dicta accusantium quos, ratione suscipit id adipisci voluptatibus. Nulla sint repudiandae fugiat tenetur dolores.",
    readTime: "11 min read",
    date: "Nov 2, 2024",
    image:
      "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",
  },
]

export default function BlogsItems() {
  return (
    <div className="mx-auto flex max-w-(--breakpoint-xl) flex-col items-start gap-12 px-6 py-10 lg:flex-row lg:py-16 xl:px-0">
      <div>
        <div className="space-y-12">
          {blogPosts.map((post) => (
            <Card
              className="flex flex-col overflow-hidden rounded-md border-none bg-background py-0 shadow-none sm:flex-row sm:items-center"
              key={post.title}
            >
              <div className="relative aspect-video shrink-0 grow overflow-hidden rounded-lg sm:aspect-square sm:w-56">
                <Image
                  alt={post.title}
                  className="object-cover"
                  fill
                  sizes="(max-width: 640px) 100vw, 224px"
                  src={post.image}
                />
              </div>
              <CardContent className="flex flex-col px-0 py-0 sm:px-6">
                <div className="flex items-center gap-6">
                  <Badge className="bg-primary/5 text-primary shadow-none hover:bg-primary/5">
                    {post.category}
                  </Badge>
                </div>

                <h3 className="mt-4 text-[1.5rem] font-medium tracking-tight">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-ellipsis text-muted-foreground">
                  {post.description}
                </p>
                <div className="mt-4 flex items-center gap-6 text-sm font-medium text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4" /> {post.readTime}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> {post.date}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
