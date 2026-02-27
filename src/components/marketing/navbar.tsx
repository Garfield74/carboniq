"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
            <Leaf className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg">CarbonIQ</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <Link href="/features/cbam" className="hover:text-zinc-900 transition-colors dark:hover:text-white">CBAM</Link>
          <Link href="/features/ghg" className="hover:text-zinc-900 transition-colors dark:hover:text-white">GHG Reporting</Link>
          <Link href="/features/ifrs" className="hover:text-zinc-900 transition-colors dark:hover:text-white">IFRS S1/S2</Link>
          <Link href="/pricing" className="hover:text-zinc-900 transition-colors dark:hover:text-white">Pricing</Link>
          <Link href="/cbam-calculator" className="hover:text-emerald-600 transition-colors font-semibold">
            Free CBAM Calculator
          </Link>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link href="/auth/signup">
            <Button size="sm">Start free trial</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-zinc-600"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-4 space-y-3">
          {[
            { href: "/features/cbam", label: "CBAM" },
            { href: "/features/ghg", label: "GHG Reporting" },
            { href: "/features/ifrs", label: "IFRS S1/S2" },
            { href: "/pricing", label: "Pricing" },
            { href: "/cbam-calculator", label: "Free CBAM Calculator" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-sm font-medium text-zinc-700 hover:text-emerald-600 dark:text-zinc-300"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 flex flex-col gap-2 border-t border-zinc-100 dark:border-zinc-800">
            <Link href="/auth/login"><Button variant="outline" className="w-full">Sign in</Button></Link>
            <Link href="/auth/signup"><Button className="w-full">Start free trial</Button></Link>
          </div>
        </div>
      )}
    </header>
  );
}
