import Link from "next/link";
import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
                <Leaf className="h-4 w-4 text-white" />
              </div>
              <span>CarbonIQ</span>
            </Link>
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
              Carbon accounting & CBAM compliance for EU businesses.
            </p>
            <p className="mt-2 text-xs text-zinc-400">
              GDPR compliant · EU data residency
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Product</h3>
            <ul className="mt-4 space-y-2">
              {[
                { href: "/features/cbam", label: "CBAM Module" },
                { href: "/features/ghg", label: "GHG Reporting" },
                { href: "/features/ifrs", label: "IFRS S1/S2" },
                { href: "/cbam-calculator", label: "Free Calculator" },
                { href: "/pricing", label: "Pricing" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Compliance</h3>
            <ul className="mt-4 space-y-2">
              {[
                { href: "/blog/cbam-guide", label: "CBAM Guide" },
                { href: "/blog/ghg-protocol", label: "GHG Protocol" },
                { href: "/blog/ifrs-s2", label: "IFRS S2 Explained" },
                { href: "/blog/csrd", label: "CSRD Overview" },
                { href: "/blog/eu-ets", label: "EU ETS" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Company</h3>
            <ul className="mt-4 space-y-2">
              {[
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
                { href: "/blog", label: "Blog" },
                { href: "/careers", label: "Careers" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Legal</h3>
            <ul className="mt-4 space-y-2">
              {[
                { href: "/legal/privacy", label: "Privacy Policy" },
                { href: "/legal/terms", label: "Terms of Service" },
                { href: "/legal/dpa", label: "Data Processing" },
                { href: "/legal/cookies", label: "Cookie Policy" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-200 pt-8 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-400">
            © {new Date().getFullYear()} CarbonIQ SRL. All rights reserved. Bucharest, Romania · EU
          </p>
          <p className="text-xs text-zinc-400">
            Emission factors: UK DEFRA, US EPA, EU EEA, IPCC. Data updated annually.
          </p>
        </div>
      </div>
    </footer>
  );
}
