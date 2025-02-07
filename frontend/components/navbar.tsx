"use client";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import { usePathname } from "next/navigation";

export default function Navbar() {
  const currPath = usePathname();
  const isLanding = currPath === "/"
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">Devrel</span>
        </Link>
        {isLanding? <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link href="" className="transition-colors hover:text-primary">
            Features
          </Link>
          <Link href="" className="transition-colors hover:text-primary">
            About Us
          </Link>
        </nav>:<nav className="flex flex-1 items-center space-x-6 text-sm font-medium"></nav>}
        <div className="flex items-center space-x-4">
          <Link href="https://github.com/agarwalvivek29" target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <Button variant="ghost" size="sm">
            Contact
          </Button>
          {isLanding&&<Link href="/auth">
          <Button size="sm">Sign In</Button>
          </Link>}
        </div>
      </div>
    </header>
  )
}

