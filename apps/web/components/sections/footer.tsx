import Link from "next/link"
import microvLogo from "@/app/Microv.png"
import Image from "next/image"

import {
  FaInstagram,
  FaXTwitter,
  FaSquareFacebook,
  FaLinkedin,
} from "react-icons/fa6"

const links = [
  {
    title: "Features",
    href: "#",
  },
  {
    title: "Solution",
    href: "#",
  },
  {
    title: "Customers",
    href: "#",
  },
  {
    title: "Pricing",
    href: "#",
  },
  {
    title: "Help",
    href: "#",
  },
  {
    title: "About",
    href: "#",
  },
]

export default function Footer() {
  return (
    <footer className="mb-0 border-t border-b bg-background py-6">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap justify-between gap-12">
          <div className="order-last flex flex-col items-start gap-4 md:order-first">
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
            <span className="block text-center text-sm text-muted-foreground">
              © {2026} Tailark Mist, All rights reserved
            </span>
          </div>

          <div className="flex flex-col items-end gap-6">
            <div className="mx-auto flex gap-7 md:mx-0">
              <FaInstagram />
              <FaXTwitter />
              <FaSquareFacebook />
              <FaLinkedin />
            </div>
            <div className="order-first flex flex-wrap gap-x-6 gap-y-4 md:order-last">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="block text-muted-foreground duration-150 hover:text-primary"
                >
                  <span>{link.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
