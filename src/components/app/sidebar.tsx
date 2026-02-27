"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Wind, Flame, Zap, Globe, FileText,
  ClipboardList, Package, Building2, Calculator, BookOpen,
  Shield, Thermometer, Download, Settings, Building, Users,
  CreditCard, Leaf, LogOut, ChevronDown, ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard, Wind, Flame, Zap, Globe, FileText,
  ClipboardList, Package, Building2, Calculator, BookOpen,
  Shield, Thermometer, Download, Settings, Building, Users, CreditCard,
};

const NAV_ITEMS = [
  { label: "Dashboard", href: "/app/dashboard", icon: "LayoutDashboard" },
  {
    label: "GHG Emissions", icon: "Wind",
    children: [
      { label: "Scope 1 — Direct", href: "/app/ghg/scope1", icon: "Flame" },
      { label: "Scope 2 — Energy", href: "/app/ghg/scope2", icon: "Zap" },
      { label: "Scope 3 — Value Chain", href: "/app/ghg/scope3", icon: "Globe" },
    ],
  },
  {
    label: "CBAM", icon: "FileText",
    children: [
      { label: "Declarations", href: "/app/cbam/declarations", icon: "ClipboardList" },
      { label: "Goods & HS Codes", href: "/app/cbam/goods", icon: "Package" },
      { label: "Suppliers", href: "/app/cbam/suppliers", icon: "Building2" },
      { label: "Cost Simulator", href: "/app/cbam/simulator", icon: "Calculator" },
    ],
  },
  {
    label: "IFRS S1 & S2", icon: "BookOpen",
    children: [
      { label: "IFRS S1 — General", href: "/app/ifrs/s1", icon: "Shield" },
      { label: "IFRS S2 — Climate", href: "/app/ifrs/s2", icon: "Thermometer" },
    ],
  },
  { label: "Reports", href: "/app/reports", icon: "Download" },
  {
    label: "Settings", icon: "Settings",
    children: [
      { label: "Company", href: "/app/settings/company", icon: "Building" },
      { label: "Users", href: "/app/settings/users", icon: "Users" },
      { label: "Billing", href: "/app/settings/billing", icon: "CreditCard" },
    ],
  },
];

function NavItem({ item, depth = 0 }: { item: (typeof NAV_ITEMS)[0] & { href?: string; children?: { label: string; href: string; icon: string }[] }, depth?: number }) {
  const pathname = usePathname();
  const Icon = ICON_MAP[item.icon] ?? LayoutDashboard;
  const hasChildren = "children" in item && item.children;
  const isActiveParent = hasChildren && item.children!.some(c => pathname.startsWith(c.href));
  const [open, setOpen] = useState(isActiveParent || false);

  if (!hasChildren && item.href) {
    const isActive = pathname === item.href;
    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
          depth > 0 ? "pl-9" : "",
          isActive
            ? "bg-emerald-50 text-emerald-700 font-medium dark:bg-emerald-950 dark:text-emerald-300"
            : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
        )}
      >
        <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-emerald-600" : "text-zinc-400")} />
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
          isActiveParent
            ? "text-zinc-900 font-medium dark:text-zinc-100"
            : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
        )}
      >
        <span className="flex items-center gap-2.5">
          <Icon className="h-4 w-4 shrink-0 text-zinc-400" />
          {item.label}
        </span>
        {open ? <ChevronDown className="h-3.5 w-3.5 text-zinc-400" /> : <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />}
      </button>
      {open && hasChildren && (
        <div className="mt-0.5 space-y-0.5">
          {item.children!.map(child => (
            <NavItem key={child.href} item={child} depth={1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2.5 border-b border-zinc-200 dark:border-zinc-800 px-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600">
          <Leaf className="h-3.5 w-3.5 text-white" />
        </div>
        <span className="font-bold text-zinc-900 dark:text-white">CarbonIQ</span>
        <span className="ml-auto rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
          BETA
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {NAV_ITEMS.map(item => (
          <NavItem key={item.label} item={item as Parameters<typeof NavItem>[0]["item"]} />
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 p-3">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="h-7 w-7 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-xs font-bold text-emerald-700 dark:text-emerald-300">
            U
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-zinc-900 dark:text-white truncate">User Name</p>
            <p className="text-xs text-zinc-500 truncate">Growth Plan</p>
          </div>
          <button className="text-zinc-400 hover:text-zinc-600" title="Sign out">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
