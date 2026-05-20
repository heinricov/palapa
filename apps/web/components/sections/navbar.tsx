"use client"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import React from "react"
import Image from "next/image"
import microvLogo from "@/app/Microv.png"
import { InputSearch } from "../input-search"
import ButtonTheme from "../button-theme"

import {
  FaInstagram,
  FaXTwitter,
  FaSquareFacebook,
  FaLinkedin,
} from "react-icons/fa6"

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blogs" },
  { name: "About", href: "/about" },
]

export default function Navbar() {
  const [menuState, setMenuState] = React.useState(false)
  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="fixed z-20 w-full border-b bg-background/50 backdrop-blur-3xl"
      >
        <div className="mx-auto max-w-7xl px-6 transition-all duration-300">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full items-center justify-between gap-4 lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center gap-2"
              >
                <Image src={microvLogo} alt="Palapa" width={28} height={28} />
                <span className="font-mono text-2xl font-medium tracking-tight uppercase">
                  Palapa
                </span>
              </Link>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 md:hidden">
                  <FaInstagram />
                  <FaXTwitter />
                  <FaSquareFacebook />
                  <FaLinkedin />
                </div>
                <div className="lg:hidden">
                  <ButtonTheme />
                </div>
                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                  className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                >
                  <Menu className="m-auto size-6 duration-200 in-data-[state=active]:scale-0 in-data-[state=active]:rotate-180 in-data-[state=active]:opacity-0" />
                  <X className="absolute inset-0 m-auto size-6 scale-0 -rotate-180 opacity-0 duration-200 in-data-[state=active]:scale-100 in-data-[state=active]:rotate-0 in-data-[state=active]:opacity-100" />
                </button>
              </div>

              <div className="hidden lg:block">
                <ul className="flex gap-8 text-sm">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="block text-muted-foreground duration-150 hover:text-accent-foreground"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border bg-background p-6 shadow-2xl shadow-zinc-300/20 in-data-[state=active]:block md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none lg:in-data-[state=active]:flex dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="block text-muted-foreground duration-150 hover:text-accent-foreground"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <div className="hidden lg:block">
                  <InputSearch />
                </div>
                <div className="flex items-center gap-2">
                  <FaInstagram />
                  <FaXTwitter />
                  <FaSquareFacebook />
                  <FaLinkedin />
                </div>
                <div className="hidden lg:block">
                  <ButtonTheme />
                </div>
                <Button asChild variant="default" size="sm">
                  <Link href="#">
                    <span>Login</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
